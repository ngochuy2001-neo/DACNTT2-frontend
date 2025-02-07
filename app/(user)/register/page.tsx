"use client";
import { Button, TextField, Typography, Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleId: "10",
  });
  const [error, setError] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu xác nhận không khớp");
        setOpenSnackbar(true);
        return;
      }

      const requiredFields = {
        username: "Tên đăng nhập",
        fullname: "Họ và tên",
        phoneNumber: "Số điện thoại",
        email: "Email",
        password: "Mật khẩu",
      };

      for (const [field, label] of Object.entries(requiredFields)) {
        if (!formData[field as keyof typeof formData]) {
          setError(`${label} là bắt buộc`);
          setOpenSnackbar(true);
          return;
        }
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/api/user/create`,
        {
          username: formData.username,
          fullname: formData.fullname,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
          roleId: formData.roleId,
        }
      );

      if (response.data.success) {
        router.push("/login");
      } else {
        setError(response.data.message);
        setOpenSnackbar(true);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Có lỗi xảy ra khi đăng ký");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="bg-gray-200 flex justify-center min-h-[calc(100vh-100px-263px)] py-[30px] items-center">
      <div className="bg-white min-w-[500px] px-[40px] py-[30px] rounded-md">
        <div className="flex flex-col items-center">
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Đăng ký
          </Typography>
        </div>
        <div className="flex flex-col gap-[10px]">
          <TextField
            size="small"
            variant="standard"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            size="small"
            variant="standard"
            label="Tên đăng nhập"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            size="small"
            variant="standard"
            label="Họ và tên"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          <TextField
            size="small"
            variant="standard"
            label="Số điện thoại"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            size="small"
            variant="standard"
            label="Mật khẩu"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            size="small"
            variant="standard"
            label="Xác nhận mật khẩu"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleRegister}>
            Đăng ký
          </Button>
          <Button onClick={() => router.push("/login")} variant="outlined">
            Quay lại đăng nhập
          </Button>
        </div>
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

export default RegisterPage;
