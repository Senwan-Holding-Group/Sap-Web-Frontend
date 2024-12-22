import { User } from "@/lib/hooks/UsePermissions";
import { createContext } from "react";

export type AuthContextType = {
  token: string | null | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  user: User;
  isLoading: boolean;
  logout: () => void; // Add this
};

export const AuthContext = createContext<AuthContextType | undefined>({
  token: undefined,
  setToken: () => {},
  user: {} as User,
  isLoading: true,
  logout: () => {}, // Add this
});
