import { useAuth } from "@/api/Auth/useAuth";
import LoginForm from "@/components/forms/LoginForm";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [navigate, from, token]);
  return (
    <div className="bg-geantSap-bg flex items-center justify-center w-screen h-screen">
      {token === null && <LoginForm />}{" "}
    </div>
  );
};

export default LoginPage;
