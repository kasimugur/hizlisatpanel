// components/Login.tsx
'use client';

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Geçerli e-posta girin"),
  password: z.string().min(1, "Şifre gerekli"),
  remember: z.boolean().optional(),
});

export function Login() {
  const { login } = useAuth()
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
    mode: "onTouched",
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      login(values)
      toast.success("Giriş başarılı")

    } catch (err) {
      toast.error("E-posta veya şifre hatalı")
      console.error("login hatası catch", err.response.data)
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Panelinize Giriş Yapın
      </h2>
      <p className="text-center text-gray-600 mb-6">
        E-posta ve şifrenizle kolayca oturum açın.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta Adresi*</FormLabel>
                <FormControl>
                  <Input placeholder="E-posta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Şifre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} {...field} />
                </FormControl>
                <FormLabel>Beni Hatırla</FormLabel>
              </FormItem>
            )}
          />

          <div className="flex justify-between text-sm">
            <a href="/forgot" className="text-indigo-600 hover:underline">
              Şifremi Unuttum
            </a>
            <a href="/register" className="text-indigo-600 hover:underline">
              Hala hesabınız yok mu? Kaydolun
            </a>
          </div>

          <Button type="submit" className="w-full">
            Giriş Yap
          </Button>
        </form>
      </Form>
    </div>
  );
}
