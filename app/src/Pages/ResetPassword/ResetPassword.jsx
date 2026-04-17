import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../lib/api-Client";
import { RESET_PASSWORD_ROUTES } from "../../Utils/Constant";
import { useAppStore } from "../../Store";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const { setProgress } = useAppStore();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Verify OTP was verified
    const otpVerified = sessionStorage.getItem("otpVerified");
    const storedEmail = sessionStorage.getItem("resetEmail");

    if (!otpVerified || !storedEmail) {
      toast.error("Please complete the verification process");
      navigate("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleResetPassword = async () => {
    setProgress(30);

    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    try {
      setIsLoading(true);
      setProgress(50);

      const response = await apiClient.post(
        RESET_PASSWORD_ROUTES,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully");
        // Clear session storage
        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("otpVerified");
        navigate("/login");
      }
    } catch (error) {
      const backendError = error.response?.data;

      if (backendError?.InvalidEmail) {
        toast.error("Invalid email. Please try again");
      } else {
        toast.error("Failed to reset password. Please try again");
        console.error("Reset password error:", error);
      }
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-12 md:py-16">
      {/* Form Section */}
      <div data-aos="fade-up" className="flex flex-col gap-7 w-full md:w-1/3 border border-gray-300 rounded-lg p-8 shadow-lg max-w-md">
        <div>
          <h2 className="text-2xl md:text-2xl font-semibold">Set New Password</h2>
          <span className="text-gray-600">Enter your new password below</span>
        </div>
        <form className="flex flex-col gap-4">
          <div className="relative">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              aria-label="New Password"
              className="border-b border-gray-400 outline-none focus:border-red-600 transition duration-300 px-2 py-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-600 hover:text-red-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              className="border-b border-gray-400 outline-none focus:border-red-600 transition duration-300 px-2 py-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-gray-600 hover:text-red-600"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleResetPassword}
            disabled={isLoading}
            className="bg-red-600 text-white py-2 w-full h-[45px] rounded-md transition duration-300 hover:bg-red-700 active:bg-red-800 disabled:bg-gray-400"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
