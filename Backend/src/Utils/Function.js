import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import redis from "./Redis.js";

import dotenv from "dotenv";
dotenv.config();

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.AWS_REGION;
const awsBucket = process.env.S3_BUCKET_NAME;

if (!awsAccessKeyId || !awsSecretAccessKey || !awsRegion || !awsBucket) {
    throw new Error("Missing required AWS configuration environment variables");
}

const awsConfig = {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    region: awsRegion,
    bucket: awsBucket,
};

const s3 = new S3Client({
    region: awsConfig.region,
    credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
    },
});

const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
];

const isSafeS3Key = (key) => {
    return Boolean(key) && !key.includes("..") && !key.startsWith("/") && !key.startsWith("\\");
};

export const deleteFile = async (fileUrl) => {
    if (!fileUrl) {
        console.warn("No file URL provided for deletion");
        return;
    }

    const bucket = process.env.S3_BUCKET_NAME;
    const key = extractKeyFromUrl(fileUrl);

    if (!bucket) {
        console.warn("S3 bucket is not configured, skipping S3 delete.");
        return;
    }

    if (key) {
        await s3.send(
            new DeleteObjectCommand({
                Bucket: bucket,
                Key: key,
            }),
        );
    } else {
        console.warn("Invalid file key extracted, skipping S3 delete.");
    }
};

export const extractKeyFromUrl = (url) => {
    if (!url || typeof url !== "string") {
        console.error("Invalid URL passed to extractKeyFromUrl:", url);
        return null;
    }

    if (!url.includes(".com/")) {
        return url;
    }

    const parts = url.split(".com/");
    return parts.length > 1 ? parts[1] : null;
};

export function sanitizeInput(folderType, fileName, fileType) {
    // Normalize folder path
    folderType = folderType.replace(/\\/g, '/').trim();

    // Remove invalid characters from folderType
    folderType = folderType.replace(/[^a-zA-Z0-9/_-]/g, '');

    // Remove invalid characters from fileName
    fileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '').trim();

    // Infer fileType if empty
    if (!fileType && fileName.includes('.')) {
        fileType = fileName.split('.').pop() || '';
    }

    if (!fileType) {
        fileType = 'application/octet-stream';
    }

    return { folderType, fileName, fileType };
}

export const uploadFileToS3 = async ({
    buffer,
    fileName,
    fileType,
    folderType,
}) => {
    if (!buffer || !fileName || !fileType || !folderType) {
        throw new Error("buffer, fileName, fileType and folderType are required");
    }

    const sanitized = sanitizeInput(folderType, fileName, fileType);
    const normalizedFolderType = sanitized.folderType;
    const normalizedFileName = sanitized.fileName;
    const normalizedFileType = sanitized.fileType;
    const ext = normalizedFileName.includes(".") ? normalizedFileName.split(".").pop() || "bin" : "bin";
    const safeName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const key = `${normalizedFolderType.replace(/\s+/g, "_")}/${safeName}`;

    await s3.send(
        new PutObjectCommand({
            Bucket: awsConfig.bucket,
            Key: key,
            Body: buffer,
            ContentType: normalizedFileType,
            ACL: "private",
        }),
    );

    const uploadedFileUrl = `https://${awsConfig.bucket}.s3.${awsConfig.region}.amazonaws.com/${key}`;

    return {
        url: uploadedFileUrl,
        key,
        fileName: normalizedFileName,
        fileType: normalizedFileType,
    };
};

export const create_sign_url = async ({
    fileName,
    fileType,
    folderType,
}) => {
    if (!fileName || !folderType || !fileType) {
        throw new Error("fileName, fileType and folderType are required");
    }

    if (!allowedTypes.includes(fileType)) {
        throw new Error("Invalid file type");
    }

    const sanitized = sanitizeInput(folderType, fileName, fileType);
    const normalizedFolderType = sanitized.folderType;
    const normalizedFileName = sanitized.fileName;
    const normalizedFileType = sanitized.fileType;

    const ext = normalizedFileName.includes(".") ? normalizedFileName.split(".").pop() || "bin" : "bin";
    const safeName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const key = `${normalizedFolderType.replace(/\s+/g, "_")}/${safeName}`;

    const presignedUrl = await getSignedUrl(
        s3,
        new PutObjectCommand({
            Bucket: awsConfig.bucket,
            Key: key,
            ContentType: normalizedFileType,
            ACL: "private",
        }),
        {
            expiresIn: 3600,
        },
    );

    return {
        url: presignedUrl,
        fields: {},
        key,
    };
};

export const Get_Signed_Url = async ({ key }) => {
    if (!key) {
        throw new Error("key is required");
    }

    if (!isSafeS3Key(key)) {
        throw new Error("Invalid key format");
    }

    const signedUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({
            Bucket: awsConfig.bucket,
            Key: key,
        }),
        {
            expiresIn: 3600,
        },
    );

    return { url: signedUrl };
};

export const getSignedUrlS3 = async (fileUrl) => {
    if (!fileUrl) {
        return fileUrl;
    }

    const key = extractKeyFromUrl(fileUrl);
    if (!key) {
        return fileUrl;
    }

    try {
        const result = await Get_Signed_Url({ key });
        return result.url;
    } catch (error) {
        console.error("Error generating signed URL:", error.message);
        return fileUrl;
    }
};

export const setCache = async (key, data, expiry = 86400) => {
        try {
                await redis.set(key, JSON.stringify(data), "EX", expiry);
                return true;
        } catch (error) {
                return false;
        }
};

export const getCache = async (key) => {
        try {
                const data = await redis.get(key);
                if (!data) return null;
                return JSON.parse(data);
        } catch (error) {
                return null;
        }
};

export const deleteCache = async (key) => {
        try {
                await redis.del(key);
                return true;
        } catch (error) {
                return false;
        }
};
