import { TextField, Typography, Button } from "@mui/material";
import React from "react";

function LoginPage() {
  return (
    <div className="bg-login-background bg-center bg-cover h-[calc(100vh-364px)] flex justify-center items-center">
      <div className="bg-white h-fit flex flex-col items-center justify-center gap-[10px] p-[30px] w-[30%]">
        <Typography sx={{ fontWeight: "bold" }}>ĐĂNG NHẬP</Typography>
        <form className="flex flex-col items-center gap-[20px] w-full">
          <TextField
            id="username-field"
            label="Tên đăng nhập"
            variant="standard"
            className="w-full"
          />
          <TextField
            id="password-field"
            label="Mật khẩu"
            variant="standard"
            type="password"
            className="w-full"
          />
          <Button variant="contained" sx={{ width: "40%" }}>
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
