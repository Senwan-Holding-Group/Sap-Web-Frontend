/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import api from "..";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./authContext";
import { User } from "@/lib/hooks/UsePermissions";
import Loader from "@/components/ui/Loader";

type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    console.log("Logout function called");

    setToken(null);
    setUser(null);
    secureLocalStorage.clear();
    delete api.defaults.headers.common["Authorization"];
  }, []);
  const validateAndSetToken =useCallback((storedToken: string) => { 
    try {
      const now = Date.now();
      const decodedUser = jwtDecode(storedToken) as User;
      const expirationTime = decodedUser.exp * 1000;
      const BUFFER_TIME = 30 * 1000;
      console.log("Current time:", new Date(now).toISOString());
      console.log("Expiration time:", new Date(expirationTime).toISOString());

      if (expirationTime > now + BUFFER_TIME) {
        setToken(storedToken);
        setUser(decodedUser);

        const timeToExpire = expirationTime - now;
        console.log(
          "Token valid for:",
          Math.floor(timeToExpire / 1000),
          "seconds"
        );

        const timeoutId = setTimeout(() => {
          console.log("Token expiration timeout triggered");
          logout();
        }, timeToExpire);

        return () => clearTimeout(timeoutId);
      } else {
        console.log("Token expired or too close to expiration");
        logout();
      }
    } catch (error) {
      console.error("Error validating token:", error);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = secureLocalStorage.getItem("token");
        if (storedToken) {
          return validateAndSetToken(storedToken.toString());
        } else {
          setToken(null);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [ token,validateAndSetToken]);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config: any) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);
  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [logout]);
  const authContextValue = useMemo(
    () => ({
      token,
      setToken,
      user: user!,
      isLoading,
      logout,
    }),
    [token, user, isLoading, logout]
  );
  // if (isLoading) {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center">
  //       <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
  //     </div>
  //   );
  // }
  <Loader enable={isLoading} />;

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
