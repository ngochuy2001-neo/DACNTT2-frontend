"use client";
import { List, ListItem } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const menuList = [
  { title: "Thông tin khách hàng", url: "/profile" },
  { title: "Quản lý địa chỉ", url: "/address" },
  {
    title: "Quản lý đơn hàng",
  },
];

function ProfilePage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex py-[30px] px-[200px] bg-[#f3f4f6] gap-[20px]">
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

export default ProfilePage;
