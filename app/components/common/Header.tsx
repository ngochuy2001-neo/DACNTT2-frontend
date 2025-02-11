"use client";
import React, { SetStateAction, useState } from "react";
import Logo from "../../../public/assets/images/OnlineShopLogo.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import { Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

function HeaderBar({
  username,
  setUserName,
  role,
}: {
  username?: string;
  setUserName: React.Dispatch<SetStateAction<string>>;
  role?: string;
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleLogout = () => {
    setUserName("");
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="border-b-[2px] h-[100px] border-black px-[75px] flex items-center justify-around">
      <div>
        <Image src={Logo} height={80} alt="logo-image" />
      </div>
      <div className="flex w-[30%] justify-between font-bold">
        <p
          onClick={() => router.push("/cellphone")}
          className="hover:bg-black rounded-[30px] cursor-pointer hover:text-white p-[10px] duration-200"
        >
          Điện thoại
        </p>
        <p
          onClick={() => router.push("/laptop")}
          className="hover:bg-black rounded-[30px] cursor-pointer hover:text-white p-[10px] duration-200"
        >
          Laptop
        </p>

        <p className="hover:bg-black rounded-[30px] cursor-pointer hover:text-white p-[10px] duration-200">
          About
        </p>
      </div>
      <div className="flex gap-[20px] items-center">
        {username === "" ? (
          <div>
            <p
              onClick={() => router.push("/login")}
              className="hover:underline cursor-pointer p-[10px] duration-200"
            >
              Đăng nhập
            </p>
            <p
              onClick={() => router.push("/register")}
              className="hover:underline cursor-pointer p-[10px] duration-200"
            >
              Đăng ký
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-[20px]">
            <ShoppingCartIcon
              sx={{
                ":hover": {
                  cursor: "pointer",
                  bgcolor: "black",
                  color: "white",
                },
                p: "5px",
                width: "34px",
                height: "34px",
                borderRadius: "30px",
                overflow: "visible",
              }}
              onClick={() => router.push("/cart")}
            />

            <div className="flex items-center gap-[10px]">
              <div>
                <AccountCircle />
              </div>
              <div>
                <Typography
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ ":hover": { cursor: "pointer" } }}
                >
                  {username}
                </Typography>
                <Menu
                  open={isMenuOpen}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      router.push("/profile");
                    }}
                  >
                    Thông tin người dùng
                  </MenuItem>
                  {role?.toLowerCase() === "admin" && (
                    <MenuItem onClick={() => router.push("/admin")}>
                      Đến trang quản lý
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderBar;
