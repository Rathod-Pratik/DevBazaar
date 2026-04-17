import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../lib/api-Client";
import { FORGOT_PASSWORD_ROUTES } from "../../Utils/Constant";
import { useAppStore } from "../../Store";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { setProgress } = useAppStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    setProgress(30);
    if (!email) {
      toast.error("Email is required");
      return false;
    }

    try {
      setIsLoading(true);
      setProgress(50);
      
      // Call API to send OTP to email
      const response = await apiClient.post(
        FORGOT_PASSWORD_ROUTES,
        { email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("OTP sent to your email");
        // Store email in sessionStorage for next step
        sessionStorage.setItem("resetEmail", email);
        navigate("/otp");
      }
    } catch (error) {
      const backendError = error.response?.data;

      if (backendError?.NotFound) {
        toast.error("Account not found. Please check your email");
      } else {
        toast.error("Failed to send OTP. Please try again later");
        console.error("Forgot password error:", error);
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
          <h2 className="text-2xl md:text-2xl font-semibold">Reset Password</h2>
          <span className="text-gray-600">Enter your email to receive OTP</span>
        </div>
        <form className="flex flex-col gap-4">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            aria-label="Email"
            className="border-b border-gray-400 outline-none focus:border-red-600 transition duration-300 px-2 py-2"
          />
        </form>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleForgotPassword}
            disabled={isLoading}
            className="bg-red-600 text-white py-2 w-full h-[45px] rounded-md transition duration-300 hover:bg-red-700 active:bg-red-800 disabled:bg-gray-400"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <span className="text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="text-red-600 hover:underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
