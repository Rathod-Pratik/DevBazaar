import multer from "multer";
const storage=multer.memoryStorage();

const upload=multer({storage})

export const uploadFiles = upload.fields([
    { name: 'file', maxCount: 1 },   
    { name: 'image', maxCount: 1 },   
  ]);

export default upload;