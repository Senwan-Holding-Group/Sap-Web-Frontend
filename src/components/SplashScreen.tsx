import { useEffect, useState } from "react";
import second from "/loginLogo.svg"; 
import first from "/splashLogoName.svg"; 
// import third from "/loginForm.svg"; 
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";
import { User } from "@/lib/hooks/UsePermissions";

interface ImageConfig {
  src: string;
  alt: string;
  message: string;
}

const SplashScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const images: ImageConfig[] = [
    {
      src:first,
      alt: "Welcome",
      message: "Welcome to GeantSap",
    },
    {
      src: second,
      alt: "Loading",
      message: "Loading resources...",
    },
    // {
    //   src: third,
    //   alt: "Starting",
    //   message: "Starting application...",
    // },
  ];

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedToken = secureLocalStorage.getItem("token");

        if (storedToken) {
          const decodedToken = jwtDecode(storedToken.toString()) as User;
          const expirationTime = decodedToken.exp * 1000;

          if (expirationTime > Date.now()) {
            // Token is valid
            setRedirectTo("/sap/dashboard");
          } else {
            // Token is expired
            secureLocalStorage.clear();
            setRedirectTo("/login");
          }
        } else {
          // No token found
          setRedirectTo("/login");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        secureLocalStorage.clear();
        setRedirectTo("/login");
      }
    };

    const transitionToNextImage = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => {
          if (prev === images.length - 1) {
            checkAuth();
            return prev;
          }
          return prev + 1;
        });
        setIsTransitioning(false);
      }, 500);
    };

    const interval = setInterval(transitionToNextImage, 1000);
    return () => clearInterval(interval);
  });

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="flex flex-col justify-between items-center">
        {/* Image Container */}
        <div className="relative w-full h-full ">
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className={`w-full h-full transition-all duration-500
            ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          />
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;
