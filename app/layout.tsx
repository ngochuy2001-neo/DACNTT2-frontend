import type { Metadata } from "next";
import "./globals.css";
import HeaderBar from "./components/common/Header";
import Footer from "./components/common/Footer";

export const metadata: Metadata = {
  title: "Fastphone Deliv",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
