import { useEffect, useState } from "react";
import second from "/loginLogo.svg"; 
import first from "/splashLogoName.svg"; 
import third from "/loginForm.svg"; 
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
    {
      src: third,
      alt: "Starting",
      message: "Starting application...",
    },
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

    const interval = setInterval(transitionToNextImage, 1500);
    return () => clearInterval(interval);
  }, []);

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

        {/* Loading Message */}
        {/* <div className="mt-4 text-geantSap-primary-500 text-lg font-medium">
          {images[currentImageIndex].message}
        </div> */}

        {/* Progress Dots */}
        {/* <div className="mt-4 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 
              ${
                index === currentImageIndex
                  ? "bg-geantSap-primary-500 scale-125"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div> */}

        {/* Progress Bar */}
        {/* <div className="mt-4 h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-geantSap-primary-500 transition-all duration-300"
            style={{
              width: `${((currentImageIndex + 1) / images.length) * 100}%`,
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default SplashScreen;
