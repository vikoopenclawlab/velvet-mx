"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      // Demo mode - just redirect
      router.push("/dashboard");
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">Iniciar Sesión</CardTitle>
            <p className="text-white/50 text-sm mt-2">
              Accede a tu cuenta Velvet MX
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-white/60 mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="tu@email.com"
                    className="pl-12"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-white/60 mb-2 block">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Tu contraseña"
                    className="pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white/50 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/20 bg-primary" />
                  Recordarme
                </label>
                <Link href="/forgot-password" className="text-secondary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full glow-gold" size="lg">
                {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
              </Button>
            </form>

            <p className="text-center text-sm text-white/50 mt-6">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-secondary hover:text-secondary/80 font-medium">
                Regístrate aquí
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
