"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useResetPasswordMutation } from "@/store/services/authApi";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token") || "";

  const [token, setToken] = useState(tokenParam);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    try {
      const result = await resetPassword({
        token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      if (result.success) {
        setSuccess(result.message || "Password has been reset successfully");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      setError(
        error?.data?.message || "Failed to reset password. Please try again."
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

        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-[500px]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-2 text-center text-gray-800">
              Reset Password
            </h2>
            <p className="text-center text-md text-gray-500 mb-2">
              Enter your reset token and new password below to reset your
              password
            </p>

            <div>
              <label
                htmlFor="token"
                className="block text-sm font-semibold text-gray-700"
              >
                Reset Token
              </label>
              <input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-11"
                placeholder="Enter your reset token"
                required
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-11"
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-11"
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 flex justify-center items-center text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold h-11 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
