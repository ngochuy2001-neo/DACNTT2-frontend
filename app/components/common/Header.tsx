"use client";
import React from "react";
import Logo from "../../../public/assets/images/OnlineShopLogo.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";

function HeaderBar() {
  return (
    <div className="border-b-[2px] h-[100px] border-black px-[75px] flex items-center justify-around">
      <div>
        <Image src={Logo} height={80} alt="logo-image" />
      </div>
      <div className="flex w-[30%] justify-between font-bold">
        <p className="hover:underline hover:bg-black cursor-pointer hover:text-white p-[10px] duration-200">
          Product
        </p>
        <p className="hover:underline hover:bg-black cursor-pointer hover:text-white p-[10px] duration-200">
          Contact
        </p>
        <p className="hover:underline hover:bg-black cursor-pointer hover:text-white p-[10px] duration-200">
          About
        </p>
        <p className="hover:underline hover:bg-black cursor-pointer hover:text-white p-[10px] duration-200">
          Sign Up
        </p>
      </div>
      <div className="flex gap-[20px]">
        <FavoriteIcon />
        <ShoppingCartIcon />
      </div>
    </div>
  );
}

export default HeaderBar;
