"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import Logo from "../../../public/assets/images/OnlineShopLogo.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import { Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  const [cartAmount, setCartAmount] = useState(0);

  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_USER_API_URL + "/users/login/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (res) => {
          if (res.data.success) {
            setUserName(res.data.user.username);
            await axios
              .get(process.env.NEXT_PUBLIC_PRODUCT_API_URL + "/cart", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setCartAmount(res.data.detail.length);
              });
          } else {
            // handleLogout();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="border-b-[2px] h-[100px] border-black px-[75px] flex items-center justify-around">
      <div className="hover:cursor-pointer" onClick={() => router.push("/")}>
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
          <div className="flex gap-[10px]">
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
          <div className="flex items-center gap-[20px] ">
            <div className="relative">
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
              {/* <div className="text-[12px] absolute top-[-5px] right-[-5px] bg-black text-white rounded-[50%] px-[5px]">{cartAmount}</div> */}
            </div>

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
