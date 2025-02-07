"use client";
import { TextField, Typography, Button, Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const loginInformation = {
        username: username,
        password: password,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/users/login/account`,
        loginInformation
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      } else {
        setError(response.data.message);
        setOpenSnackbar(true);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Có lỗi xảy ra khi đăng nhập");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const authorize = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/users/login/check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        router.push("/");
      }
    } catch (error) {
      console.error("Authorization error:", error);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  return (
    <div className="bg-login-background bg-center bg-cover h-[100vh] flex justify-center items-center">
      <div className="bg-white h-fit flex flex-col items-center justify-center gap-[10px] p-[30px] w-[30%]">
        <Typography sx={{ fontWeight: "bold" }}>ĐĂNG NHẬP</Typography>
        <form className="flex flex-col items-center gap-[20px] w-full">
          <TextField
            id="username-field"
            label="Tên đăng nhập"
            variant="standard"
            className="w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="password-field"
            label="Mật khẩu"
            variant="standard"
            type="password"
            className="w-full"
            value={password}
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;
