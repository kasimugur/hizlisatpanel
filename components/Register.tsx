// components/Register.tsx
"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";

const registerSchema = z
  .object({
    name: z.string().min(1, "Ad Soyad gerekli"),
    email: z.string().email("Geçerli e-posta girin"),
    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalı")
      .regex(/[A-Z]/, "En az 1 büyük harf içermeli")
      .regex(/\d/, "En az 1 rakam içermeli"),
    confirm: z.string().min(1, "Şifreyi onaylayın"),
    remember: z.boolean().optional(),
    agree: z.literal(true, { errorMap: () => ({ message: "KVKK onayı zorunlu" }) }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Şifreler eşleşmiyor",
    path: ["confirm"],
  });

export function Register() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      remember: false,
      agree: false,
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    console.log(values, "gönderilen values")
     try {
      // 2) API isteği
      const { data } = await axios.post("/api/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      // 3) Başarılıysa kullanıcıyı bilgilendir ve yönlendir
      toast.success("Kaydınız tamamlandı, giriş sayfasına yönlendiriliyorsunuz.");
      setTimeout(() => router.push("/login"), 1200);

      
    } catch (err: any) {
      // 4) Hata durumunda mesaj göster
      const msg =
        err.response?.data?.error ||
        "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto py-14 px-4 md:px-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2 tracking-tight">
        HızlıSat’e Hoş Geldiniz!
      </h2>
      <p className="text-center text-gray-600 mb-3">
        Ticaret panelinize hemen kaydolun, 5 dakikada siparişe hazır olun.
      </p>
      <p className="text-xs text-gray-400 text-center mb-6">
        Kaydolmadan önce{" "}
        <Link
          href="/kvkk-aydinlatma-metni"
          target="_blank"
          className="underline hover:text-indigo-600 transition"
        >
          KVKK Aydınlatma Metni
        </Link>
        ’ni okuyabilirsiniz.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Ad Soyad */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Soyad*</FormLabel>
                <FormControl>
                  <Input placeholder="Ad Soyad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* E-posta */}
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

          {/* Şifre */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Şifre" {...field} />
                </FormControl>
                <FormDescription>
                  En az 8 karakter, bir büyük harf ve bir rakam içermelidir.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Şifreyi Onayla */}
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifreyi Onayla*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Tekrar Şifre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Beni Hatırla */}
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  {/* 
                    Önemli: react-hook-form + Checkbox için `onCheckedChange` ve `checked`
                    propslarını elle kontrol etmek gerekir.
                  */}
                  <Controller
                    control={form.control}
                    name="remember"
                    render={({ field: checkboxField }) => (
                      <Checkbox
                        checked={!!checkboxField.value}
                        onCheckedChange={checkboxField.onChange}
                        id="remember"
                      />
                    )}
                  />
                  <FormLabel htmlFor="remember" className="mb-0">
                    Beni Hatırla
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* KVKK Onayı */}
          <FormField
            control={form.control}
            name="agree"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <Controller
                    control={form.control}
                    name="agree"
                    render={({ field: checkboxField }) => (
                      <Checkbox
                        checked={!!checkboxField.value}
                        onCheckedChange={checkboxField.onChange}
                        id="agree"
                      />
                    )}
                  />
                  <FormLabel htmlFor="agree" className="mb-0">
                    <span>
                      <span className="underline hover:text-indigo-600 transition cursor-pointer">
                        Kullanım koşullarını ve gizlilik politikasını okudum.
                      </span>
                      *
                    </span>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full text-base py-2.5 rounded-xl">
            Kaydol
          </Button>

          <p className="text-center text-sm text-gray-500 mt-3">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="text-indigo-600 font-medium hover:underline">
              Giriş Yap
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
