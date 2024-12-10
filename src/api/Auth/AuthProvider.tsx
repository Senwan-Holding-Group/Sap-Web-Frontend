/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import api from "..";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./authContext";
import { User } from "@/lib/hooks/UsePermissions";

type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // console.log("token");
    if (token) {
      // console.log("if");
      try {
        const decodedUser = jwtDecode(token) as User;
        setUser(decodedUser);
        const BUFFER_TIME = 30 * 1000; // 30 seconds in milliseconds
        const expirationTime = decodedUser.exp * 1000;
        const timeToExpire = expirationTime - Date.now() - BUFFER_TIME;
        if (timeToExpire > 0) {
          // console.log(timeToExpire, expirationTime, BUFFER_TIME, Date.now());
          const timeoutId = setTimeout(() => {
            setToken(null);
            secureLocalStorage.clear();
          }, timeToExpire);
          return () => clearTimeout(timeoutId);
        }
      } catch {
        // console.log("error parsing token");
        secureLocalStorage.clear();
        setToken(null);
      }
    }else{
      // console.log("user");
      // console.log(token);
      setUser(null)
    }
  }, [token]);

  useEffect(() => {
    if (secureLocalStorage.getItem("token") != null) {
      // console.log("token in ls");

      setToken(secureLocalStorage.getItem("token")?.toString());
    } else {
      // console.log("no token in ls");
      
      setToken(null);
    }
  }, []);

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
      (response :any) => response,
      async (error :any) => {
        if (error.response?.status === 403) {
          setToken(null);     
          secureLocalStorage.clear();
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user: user! }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
