"use client";
import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import HeaderBar from "../components/common/Header";
import axios from "axios";

function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [username, setUserName] = useState<string>("");

  const authorize = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/users/login/check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const userData = response.data.user;
        setUserName(userData.username);
      } else {
        localStorage.removeItem("token");
        setUserName("");
      }
    } catch (error) {
      console.error("Authorization error:", error);
      localStorage.removeItem("token");
      setUserName("");
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  return (
    <div>
      <HeaderBar username={username} setUserName={setUserName} />
      <div className="min-h-[calc(100vh-100px)]">{children}</div>

      <Footer />
    </div>
  );
}

export default UserLayout;
