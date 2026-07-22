"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

function getRoleRedirect(role?: string) {
  if (role === "ADMIN") return "/admin";
  if (role === "HR") return "/hr";
  return "/dashboard";
}

export default function LoginPage() {
  const router = useRouter();
  const { data: existingSession, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (status === "authenticated" && existingSession?.user) {
      router.replace(getRoleRedirect((existingSession.user as any).role));
    }
  }, [status, existingSession, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </main>
    );
  }

  const onSubmit = async (data: LoginInput) => {
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA challenge.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        recaptchaToken,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setRecaptchaToken(null);
        setRecaptchaKey((k) => k + 1);
      } else {
        const session = await getSession();
        router.push(getRoleRedirect((session?.user as any)?.role));
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full grid grid-cols-1 md:grid-cols-12 bg-white">
      
      {/* Left Side: Large Prominent Image Display */}
      <div className="md:col-span-5 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 flex items-center justify-center p-6 sm:p-10 min-h-[350px] md:min-h-screen">
        <div className="relative w-[92%] h-[85%] max-w-xl min-h-[320px]">
          <Image
            src="/Analyzing-Data.png"
            alt="Analyzing Data"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Side: Clean White Form */}
      <div className="md:col-span-7 flex flex-col justify-center px-6 sm:px-12 md:px-16 py-12 bg-white">
        <div className="w-full max-w-md mx-auto space-y-6">
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Login</h1>
            <p className="text-sm text-gray-500 mt-1.5">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-blue-600 hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-12 bg-white border border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-600 text-sm px-4"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-gray-700">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 bg-white border border-gray-200 rounded-xl pr-10 focus-visible:ring-2 focus-visible:ring-blue-600 text-sm px-4"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-xs text-gray-600 font-medium cursor-pointer">
                Remember me
              </label>
            </div>

            <div className="pt-2 flex justify-center scale-90 origin-center">
              <ReCAPTCHA
                key={recaptchaKey}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setRecaptchaToken(token)}
                onExpired={() => setRecaptchaToken(null)}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 text-sm"
              disabled={loading || !recaptchaToken}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>

        </div>
      </div>
    </main>
  );
}
