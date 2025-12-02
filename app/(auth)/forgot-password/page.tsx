"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/store/services/authApi";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await forgotPassword({ email }).unwrap();

      if (result.message) {
        setSuccess(
          result.message ||
            "Password reset link has been sent to your email address"
        );
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      setError(
        error?.data?.message || "Failed to send reset link. Please try again."
      );
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
              Forgot Password
            </h2>
            <p className="text-center text-md text-gray-500 mb-2">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </p>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-11 input-bootstrap"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 flex justify-center items-center text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold h-11 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>

            {error && (
              <div className="text-red-600 text-center text-sm font-semibold">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-center text-sm font-semibold">
                {success}
              </div>
            )}

            <div className="flex flex-col items-center space-y-2">
              <span className="text-gray-600 text-md">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
