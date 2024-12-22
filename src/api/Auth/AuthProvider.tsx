/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
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
    setToken(null);
    setUser(null);
    secureLocalStorage.clear();
    delete api.defaults.headers.common['Authorization'];
  }, []);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = secureLocalStorage.getItem("token");
        if (storedToken) {
          try {
            const decodedUser = jwtDecode(storedToken.toString()) as User;
            const BUFFER_TIME = 30 * 1000;
            const expirationTime = decodedUser.exp * 1000;
            const timeToExpire = expirationTime - Date.now() - BUFFER_TIME;
            console.log(decodedUser);
            
            if (timeToExpire > 0) {
              setToken(storedToken.toString());
              setUser(decodedUser);
              const timeoutId = setTimeout(() => {
                logout();
              }, timeToExpire);

              return () => clearTimeout(timeoutId);
            } else {
              logout();
            }
          } catch {
            logout();
          }
        } else {
          setToken(null);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [logout]);

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
        if (error.response?.status === 403) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [logout]);
  const authContextValue = useMemo(() => ({
    token,
    setToken,
    user: user!,
    isLoading,
    logout
  }), [token, user, isLoading, logout]);
  // if (isLoading) {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center">
  //       <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
  //     </div>
  //   );
  // }
  <Loader enable={isLoading}/>

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
