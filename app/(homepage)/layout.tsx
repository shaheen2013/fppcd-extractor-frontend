import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "../components/header";

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
  return <div className="">{children}</div>;
}
