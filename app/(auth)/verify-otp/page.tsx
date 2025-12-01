"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/lib/store/services/authApi";

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const loading = isVerifying || isResending;

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      const result = await verifyOtp({
        email,
        otp: otpCode,
      }).unwrap();

      if (result.success) {
        // Redirect to login or home after successful verification
        router.push("/login");
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      setError(error?.data?.message || "Invalid OTP");
    }
  };

  const handleResendOTP = async () => {
    setError("");

    try {
      const result = await resendOtp({ email }).unwrap();

      if (result.success) {
        alert("OTP has been resent to your email");
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      setError(error?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1734554566930-b00065c543c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHZW9yZ2lhbiUyMHRvd25ob3VzZSUyMExvbmRvbiUyMGhlcml0YWdlfGVufDF8fHx8MTc1ODI3MTA3NHww&ixlib=rb-4.1.0&q=80&w=1080")',
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)",
          opacity: 0.7,
        }}
      />
      <div className="relative z-10">
        <h2
          className="text-6xl font-bold mb-6 text-white text-center"
          style={{
            textShadow:
              "0 4px 24px rgba(30,64,175,0.7), 0 2px 8px rgba(0,0,0,0.6), 0 1px 1px rgba(0,0,0,0.3)",
          }}
        >
          FPPCD
        </h2>
        <p className="text-center text-white text-lg font-semibold mb-2">
          Planning Conditions Extractor
        </p>
        <p className="text-center text-gray-200 mb-8">
          Professional planning permission analysis tool
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-md w-full lg:max-w-[500px]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-2 text-center text-gray-800">
              Verify OTP
            </h2>
            <p className="text-center text-md text-gray-500 mb-2">
              Enter the 6-digit code sent to {email}
            </p>

            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleChange(index, e.target.value.replace(/\D/g, ""))
                  }
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 flex justify-center items-center text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold h-11 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {error && (
              <div className="text-red-600 text-center text-sm font-semibold">
                {error}
              </div>
            )}

            <div className="flex flex-col items-center space-y-2">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="text-blue-600 hover:underline text-md font-semibold disabled:opacity-50"
              >
                Resend OTP
              </button>

              <span className="text-gray-600 text-md">
                Remember your password?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Sign in
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
