"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to send OTP");
        return;
      }

      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
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
            <h1 className="text-3xl text-gray-900 tracking-tight">Forgot Password?</h1>
            <p className="text-sm text-gray-500 mt-1.5">
              Enter your email address and we&apos;ll send you a 6-digit OTP code to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs  text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white border border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-600 text-sm px-4"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 text-sm mt-2"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send OTP Code
            </Button>

            <div className="pt-2 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-xs  text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Login
              </Link>
            </div>
          </form>

        </div>
      </div>
    </main>
  );
}
