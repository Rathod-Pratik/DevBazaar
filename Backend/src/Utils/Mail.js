import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email transporter ready:', success);
  }
});

export const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #333; margin: 0;">Password Reset Request</h2>
          </div>
          
          <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
            Hello,
          </p>
          
          <p style="color: #666; font-size: 16px; margin-bottom: 30px;">
            We received a request to reset your password. Please use the OTP below to proceed with resetting your password.
          </p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
            <p style="color: #333; font-size: 14px; margin: 0 0 10px 0;">Your One-Time Password (OTP)</p>
            <p style="color: #d32f2f; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 0; font-family: 'Courier New', monospace;">${otp}</p>
            <p style="color: #999; font-size: 14px; margin: 10px 0 0 0;">Valid for 10 minutes</p>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
            If you didn't request this password reset, please ignore this email or contact our support team.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
            DevBazaar Team<br>
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export default transporter;
