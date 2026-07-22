"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState(0);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA challenge.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Registration failed");
        setRecaptchaToken(null);
        setRecaptchaKey((k) => k + 1);
        return;
      }

      // Auto-login after registration
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/auth/login");
      } else {
        router.push("/dashboard");
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
        <div className="w-full max-w-md mx-auto space-y-5">
          
          <div>
            <h1 className="text-3xl text-gray-900 tracking-tight">Create an account</h1>
            <p className="text-sm text-gray-500 mt-1.5">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline ">
                Log in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {error && (
              <div className="p-3.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs  text-gray-700">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="h-11 bg-white border border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-600 text-sm px-4"
                {...registerField("name")}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs  text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-11 bg-white border border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-600 text-sm px-4"
                {...registerField("email")}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs  text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 bg-white border border-gray-200 rounded-xl pr-10 focus-visible:ring-2 focus-visible:ring-blue-600 text-sm px-4"
                  {...registerField("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-xs  text-gray-700">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="h-11 bg-white border border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-600 text-sm px-4"
                {...registerField("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-xs text-gray-600  cursor-pointer">
                I agree to the <span className="text-blue-600 underline ">Terms & Conditions</span>
              </label>
            </div>

            <div className="pt-1 flex justify-center scale-90 origin-center">
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
              disabled={loading || !recaptchaToken || !agreeTerms}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create account
            </Button>
          </form>

        </div>
      </div>
    </main>
  );
}