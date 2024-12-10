import { User } from "@/lib/hooks/UsePermissions";
import { createContext } from "react";

export type AuthContextType = {
  token: string | null | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  user: User;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
