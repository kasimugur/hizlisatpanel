"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserType } from "@/types/auth";

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  login: (values: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (values: { name: string; email: string; password: string }) => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Oturum bilgisini kontrol et
  const refresh = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/me", { withCredentials: true });
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  // Giriş
  const login = async (values: { email: string; password: string }) => {
    try {
      const { data } = await axios.post("/api/login", values, { withCredentials: true });
      setUser(data.user);
      toast.success("Giriş başarılı!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Giriş başarısız!");
    }
  };

  // Kayıt
  const register = async (values: { name: string; email: string; password: string }) => {
    try {
      await axios.post("/api/register", values, { withCredentials: true });
      toast.success("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Kayıt başarısız!");
    }
  };

  // Çıkış
  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Çıkış yapıldı.");
      router.push("/login");
    } catch {
      toast.error("Çıkış sırasında hata oluştu.");
    }
  };
console.log(user)
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, refresh }}>
      {loading ? <div className="flex justify-center items-center min-h-screen">Yükleniyor...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
