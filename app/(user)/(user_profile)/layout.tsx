"use client";
import { List, ListItem } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

const menuList = [
  { title: "Thông tin khách hàng", url: "/profile" },
  { title: "Quản lý địa chỉ", url: "/address" },
  {
    title: "Quản lý đơn hàng",
  },
];

function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const authorize = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return false;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/users/login/check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return true;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } catch (error) {
      console.error("Authorization error:", error);
      localStorage.removeItem("token");
      return false;
    }
  };

  useEffect(() => {
    const authenticateUser = async () => {
      const isAuthenticated = await authorize();
      setIsAuthenticated(isAuthenticated);
      setLoading(false);
      if (!isAuthenticated) {
        router.push("/login");
      }
    };

    authenticateUser();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex py-[30px] px-[200px] bg-[#f3f4f6] gap-[20px] min-h-[547px]">
      <div className="w-[20%] shadow-md rounded-2xl overflow-hidden bg-white">
        <List sx={{ backgroundColor: "white" }}>
          {menuList.map((data, index) => (
            <div
              onClick={() => router.push(data.url ? data.url : "/")}
              key={index}
            >
              <ListItem
                sx={{
                  backgroundColor: pathname === data.url ? "blue" : "white",
                  color: pathname === data.url ? "white" : "black",
                  ":hover": {
                    cursor: "pointer",
                    backgroundColor: "blue",
                    color: "white",
                  },
                }}
              >
                {data.title}
              </ListItem>
            </div>
          ))}
        </List>
      </div>
      {children}
    </div>
  );
}

export default ProfileLayout;
