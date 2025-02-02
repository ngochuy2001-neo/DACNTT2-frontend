"use client";
import { TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = () => {
    const loginInformation = { phone_number: phoneNumber, password: password };
    axios
      .post(
        process.env.NEXT_PUBLIC_LOCAL_API_URL + "user/login/",
        loginInformation
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-login-background bg-center bg-cover h-[100vh] flex justify-center items-center">
      <div className="bg-white h-fit flex flex-col items-center justify-center gap-[10px] p-[30px] w-[30%]">
        <Typography sx={{ fontWeight: "bold" }}>ĐĂNG NHẬP</Typography>
        <form className="flex flex-col items-center gap-[20px] w-full">
          <TextField
            id="username-field"
            label="Số điện thoại"
            variant="standard"
            className="w-full"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            id="password-field"
            label="Mật khẩu"
            variant="standard"
            type="password"
            className="w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{ width: "40%" }}
          >
            Đăng nhập
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "white", color: "black", width: "40%" }}
          >
            Đăng ký
          </Button>
        </form>
        <p>Bạn không nhớ mật khẩu?</p>
        <p className="text-blue-700 underline cursor-pointer hover:text-red-700">
          Quên mật khẩu
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
