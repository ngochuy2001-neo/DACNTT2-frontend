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

  const authorize = () => {
    axios
      .post(
        process.env.NEXT_PUBLIC_LOCAL_API_URL + "user/auth",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setUserName(response.data.user.name);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    authorize();
  }, []);
  return (
    <div>
      <HeaderBar username={username} setUserName={setUserName} />
      {children}
      <Footer />
    </div>
  );
}

export default UserLayout;
