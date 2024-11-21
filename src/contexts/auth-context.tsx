"use client";
import { authService } from "@/service/auth-service";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Auth {
  _id: string;
  username: string;
}

interface AuthContextType {
  auth: Auth | null;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  logout: () => void;
  loading: boolean;
}

const initialState: AuthContextType = {
  auth: null,
  login: () => {},
  logout: () => {},
  loading: false,
};

export const AuthContext = createContext<AuthContextType>(initialState);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await authService.checkAuth();
        setAuth(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const data = await authService.login({ username, password });
      setAuth(data);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      setAuth(null);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
