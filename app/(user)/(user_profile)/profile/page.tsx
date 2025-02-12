"use client";
import { Button, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    fullname: "",
    email: "",
    phoneNumber: "",
  });
  const [email, setEmail] = useState(userData.email);
  const [fullname, setFullname] = useState(userData.fullname);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  }

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/users/fetch`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUserData({
          username: response.data.user.user_name,
          fullname: response.data.user.full_name,
          email: response.data.user.email,
          phoneNumber: response.data.user.phone_num,
        });
        setEmail(response.data.user.email);
        setFullname(response.data.user.full_name);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChangeUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (password !== confirmPassword) {
      setIsSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/users/update`,
        {
          email: email,
          full_name: fullname,
          phoneNumber: userData.phoneNumber,
          password: password,
          role_id: "10",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        fetchUserData();
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
    setEditMode(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="w-full">
      <div>
        <p className="font-bold text-[20px] mb-[10px]">Thông tin cá nhân</p>
      </div>
      <div className="flex flex-col justify-center items-center px-[20px] py-[50px] bg-white w-full shadow-md rounded-lg">
        {!editMode ? (
          <div className="w-full flex justify-center flex-col items-center">
            <div className="flex justify-between w-[40%] border-b-2 py-[10px]">
              <Typography>Họ và tên</Typography>
              <Typography>{userData.fullname}</Typography>
            </div>
            <div className="flex justify-between w-[40%] border-b-2 py-[10px]">
              <Typography>Tên đăng nhập</Typography>
              <Typography>{userData.username}</Typography>
            </div>
            <div className="flex justify-between w-[40%] border-b-2 py-[10px]">
              <Typography>Email</Typography>
              <Typography>{userData.email}</Typography>
            </div>
            <div className="flex justify-between w-[40%] py-[10px]">
              <Typography>Số điện thoại</Typography>
              <Typography>{userData.phoneNumber}</Typography>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center px-[20px] py-[20px] bg-white w-full gap-[20px]">
            <TextField
              sx={{ width: "40%" }}
              label="Họ và tên"
              disabled
              variant="standard"
              size="small"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <TextField
              sx={{ width: "40%" }}
              label="Tên đăng nhập"
              variant="standard"
              size="small"
              value={userData.username}
              disabled
            />
            <TextField
              sx={{ width: "40%" }}
              label="Email"
              variant="standard"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ width: "40%" }}
              label="Số điện thoại"
              variant="standard"
              size="small"
              value={userData.phoneNumber}
              onChange={(e) =>
                setUserData({ ...userData, phoneNumber: e.target.value })
              }
            />
            <TextField
              sx={{ width: "40%" }}
              label="Mật khẩu"
              variant="standard"
              size="small"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              sx={{ width: "40%" }}
              label="Nhập lại mật khẩu"
              variant="standard"
              size="small"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={password !== confirmPassword}
              helperText={password !== confirmPassword ? "Mật khẩu không khớp" : ""}
            />
          </div>
        )}
        {editMode ? (
          <Button
            onClick={handleChangeUserProfile}
            sx={{ mt: "20px" }}
            size="small"
            variant="contained"
          >
            Xác nhận
          </Button>
        ) : (
          <Button
            onClick={() => setEditMode(true)}
            sx={{ mt: "20px" }}
            size="small"
            variant="contained"
          >
            Chỉnh sửa thông tin cá nhân
          </Button>
        )}
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Mật khẩu không khớp"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
}

export default ProfilePage;
