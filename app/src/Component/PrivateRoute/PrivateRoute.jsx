import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiClient.get("/auth/check", { withCredentials: true });
        if (res.data.isAuth) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          toast.warning("Oops! You need admin superpowers to enter this secret lair! 🦸‍♂️");
          toast.warning("You are already under my Genjutsu.");
        }
      } catch (err) {
        console.error(err);
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-white z-[100]">
        <div className="w-12 h-12 border-4 border-[orange] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ✅ use Outlet instead of children
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
