import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../lib/api-Client";
import {
  FORGOT_PASSWORD_ROUTES,
  VERIFY_OTP_ROUTES,
} from "../../Utils/Constant";
import { useAppStore } from "../../Store";
import { toast } from "react-toastify";

const OTP = () => {
  const { setProgress } = useAppStore();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      toast.error("Please start from Forgot Password page");
      navigate("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOTP = async () => {
    setProgress(30);
    if (!otp) {
      toast.error("OTP is required");
      return false;
    }

    try {
      setIsLoading(true);
      setProgress(50);

      const response = await apiClient.post(
        VERIFY_OTP_ROUTES,
        { email, otp },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("OTP verified successfully");
        // Store verified status and email for reset password
        sessionStorage.setItem("otpVerified", "true");
        navigate("/reset-password");
      }
    } catch (error) {
      const backendError = error.response?.data;

      if (backendError?.InvalidOTP) {
        toast.error("Invalid OTP. Please try again");
      } else if (backendError?.ExpiredOTP) {
        toast.error("OTP has expired. Please request a new one");
      } else {
        toast.error("Failed to verify OTP. Please try again");
        console.error("OTP verification error:", error);
      }
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  const handleResendOTP = async () => {
    try {
      setProgress(50);
      const response = await apiClient.post(
        FORGOT_PASSWORD_ROUTES,
        { email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("OTP resent to your email");
        setTimer(300); // Reset timer
        setOtp("");
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
      console.error("Resend OTP error:", error);
    } finally {
      setProgress(100);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-12 md:py-16">
      {/* Form Section */}
      <div data-aos="fade-up" className="flex flex-col gap-7 w-full md:w-1/3 border border-gray-300 rounded-lg p-8 shadow-lg max-w-md">
        <div>
          <h2 className="text-2xl md:text-2xl font-semibold">Verify OTP</h2>
          <span className="text-gray-600">We&apos;ve sent an OTP to {email}</span>
        </div>
        <form className="flex flex-col gap-4">
          <input
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            type="text"
            placeholder="Enter OTP"
            aria-label="OTP"
            maxLength="6"
            className="border-b border-gray-400 outline-none focus:border-red-600 transition duration-300 px-2 py-2 text-center text-2xl tracking-widest"
          />
          <div className="flex justify-between items-center text-sm">
            <span className={timer < 60 ? "text-red-600 font-bold" : "text-gray-600"}>
              Code expires in: {formatTime(timer)}
            </span>
            {timer > 0 && (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-red-600 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleVerifyOTP}
            disabled={isLoading}
            className="bg-red-600 text-white py-2 w-full h-[45px] rounded-md transition duration-300 hover:bg-red-700 active:bg-red-800 disabled:bg-gray-400"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <span className="text-gray-600">
            <Link to="/login" className="text-red-600 hover:underline">
              Back to Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default OTP;
