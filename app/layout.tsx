import type { Metadata } from "next";
import "./globals.css";
import setupLocatorUI from "@locator/runtime";

export const metadata: Metadata = {
  title: "Fastphone Deliv",
  description: "Generated by create next app",
};

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
