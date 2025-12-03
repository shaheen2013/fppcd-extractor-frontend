import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./components/AuthProvider";
import StoreProvider from "./components/StoreProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FFPCD - Extractor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#F8FAFC]`}>
        <StoreProvider>
          <AuthProvider>{children}</AuthProvider>
        </StoreProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
