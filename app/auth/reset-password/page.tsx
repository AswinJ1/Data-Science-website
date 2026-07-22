"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP code");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password, confirmPassword }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Reset failed");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login?reset=success");
      }, 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto space-y-4 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h2 className="text-2xl  text-gray-900">Password Reset Successful!</h2>
        <p className="text-gray-500 text-sm">
          Your password has been updated. Redirecting you to login...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <div>
        <h1 className="text-3xl d text-gray-900 tracking-tight">Reset Password</h1>
        <p className="text-sm text-gray-500 mt-1.5">
          Enter the 6-digit OTP code sent to your email along with your new password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs  text-gray-700">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 bg-white border border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-600 text-sm px-4"
          />
        </div>

        <div className="space-y-1 flex flex-col items-center">
          <Label htmlFor="otp" className="text-xs  text-gray-700 self-start mb-1">6-Digit OTP Code</Label>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={0} className="w-11 h-12 text-lg font-bold rounded-xl border border-gray-200 bg-white" />
              <InputOTPSlot index={1} className="w-11 h-12 text-lg font-bold rounded-xl border border-gray-200 bg-white" />
              <InputOTPSlot index={2} className="w-11 h-12 text-lg font-bold rounded-xl border border-gray-200 bg-white" />
              <InputOTPSlot index={3} className="w-11 h-12 text-lg font-bold rounded-xl border border-gray-200 bg-white" />
              <InputOTPSlot index={4} className="w-11 h-12 text-lg font-bold rounded-xl border border-gray-200 bg-white" />
              <InputOTPSlot index={5} className="w-11 h-12 text-lg font-bold rounded-xl border border-gray-200 bg-white" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-xs  text-gray-700">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 bg-white border border-gray-200 rounded-xl pr-10 focus-visible:ring-2 focus-visible:ring-blue-600 text-sm px-4"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmPassword" className="text-xs text-gray-700">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-11 bg-white border border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-600 text-sm px-4"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 text-sm mt-2"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>

        <div className="pt-2 text-center">
          <p className="text-xs text-gray-500">
            Didn&apos;t receive code?{" "}
            <Link href="/auth/forgot-password" className="text-blue-600 hover:underline ">
              Resend OTP
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
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
        <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
