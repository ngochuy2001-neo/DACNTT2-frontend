"use client";
import { InputAdornment, styled, TextField } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FFFFFF",
  },
  "& .MuiInputLabel-root": {
    color: "#FFFFFF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FFFFFF",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#FFFFFF",
    },
    "&:hover fieldset": {
      borderColor: "#FFFFFF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFFFFF",
    },
  },
  "& input": {
    color: "#FFFFFF",
  },
});

function Footer() {
  return (
    <div className="bg-black text-white px-[100px] py-[25px] grid-cols-4 grid">
      <div className="flex flex-col gap-[20px]">
        <h2 className="uppercase text-[25px]">Exclusive</h2>
        <h3 className="text-[20px]">Subscribe</h3>
        <p>Get 10% off your order</p>
        <div>
          <CustomTextField
            variant="outlined"
            size="small"
            label="Enter your email"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon className="text-white hover:cursor-pointer" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
      </div>
      <div className="flex gap-[20px] flex-col">
        <h2 className="text-[25px] uppercase">Support</h2>
        <p>111 Jurong West Street, Jurong, Singarpore.</p>
        <p>exclusive@gmail.com</p>
        <p className="text-[20px]">+88015-88888-9999</p>
      </div>
      <div className="flex gap-[20px] flex-col">
        <h2 className="text-[25px] uppercase">Account</h2>
        <a href="" className="hover:underline">
          My account
        </a>
        <a href="" className="hover:underline">
          Cart
        </a>
        <a href="" className="hover:underline">
          Wishlist
        </a>
        <a href="" className="hover:underline">
          Shop
        </a>
      </div>
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[25px] uppercase">Quick Link</h2>
        <a href="" className="hover:underline">
          Privacy Policy
        </a>
        <a href="" className="hover:underline">
          Terms of Use
        </a>
        <a href="" className="hover:underline">
          FAQ
        </a>
        <a href="" className="hover:underline">
          Contact
        </a>
      </div>
    </div>
  );
}

export default Footer;
