"use client";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = () => {
    if (password === confirmPassword) {
      axios
        .post(process.env.NEXT_PUBLIC_LOCAL_API_URL + "user/register/", {
          email: email,
          phone_number: phoneNumber,
          user_name: name,
          password: password,
        })
        .then((response) => {
          const { message, token } = response.data;
          console.log(message);
          localStorage.setItem("token", token);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center min-h-[calc(100vh-100px-263px)] py-[30px] items-center">
      <div className="bg-white min-w-[500px] px-[40px] py-[30px] rounded-md">
        <div className="flex flex-col items-center">
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Đăng ký
          </Typography>
        </div>
        <div className="flex flex-col gap-[10px]">
          <TextField
            size="small"
            variant="standard"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            size="small"
            variant="standard"
            label="Họ và tên"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            size="small"
            variant="standard"
            label="Số điện thoại"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            size="small"
            variant="standard"
            label="Mật khẩu"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            size="small"
            variant="standard"
            label="Xác nhận mật khẩu"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button variant="contained" onClick={() => handleRegister()}>
            Đăng ký
          </Button>
          <Button onClick={() => router.push("/login")} variant="outlined">
            Quay lại đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
