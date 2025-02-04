"use client";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "Nguyễn Lê Ngọc Huy",
    email: "bleach20011001@gmail.com",
    phone_number: "0399803827",
  });
  const [email, setEmail] = useState(userData.email);
  const [name, setName] = useState(userData.name);

  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/user/authorize",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setUserData({
          name: response.data.user.name,
          email: response.data.user.email,
          phone_number: response.data.user.phone_number,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleChangeUserProfile = () => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/user/authorize",
        {
          user_name: name,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => console.log(error));
    setEditMode(false);
    fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="w-full">
      <div>
        <p className="font-bold text-[20px] mb-[10px]">Thông tin cá nhân</p>
      </div>
      <div className="flex flex-col justify-center items-center px-[20px] py-[50px] bg-white w-full shadow-md rounded-lg">
        {!editMode ? (
          <div className="w-full flex justify-center flex-col items-center">
            <div className="flex justify-between w-[40%] border-b-2 py-[10px]">
              <Typography>Họ và tên</Typography>
              <Typography>{userData.name}</Typography>
            </div>
            <div className="flex justify-between w-[40%] border-b-2 py-[10px]">
              <Typography>Email</Typography>
              <Typography>{userData.email}</Typography>
            </div>
            <div className="flex justify-between w-[40%] py-[10px]">
              <Typography>Số điện thoại</Typography>
              <Typography>{userData.phone_number}</Typography>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center px-[20px] py-[20px] bg-white w-full gap-[20px]">
            <TextField
              sx={{ width: "40%" }}
              label="Họ và tên"
              variant="standard"
              size="small"
              defaultValue={userData.name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              sx={{ width: "40%" }}
              label="Email"
              variant="standard"
              size="small"
              defaultValue={userData.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ width: "40%" }}
              disabled
              label="Số điện thoại"
              variant="standard"
              size="small"
              defaultValue={userData.phone_number}
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
            Xác nhận
          </Button>
        ) : (
          <Button
            onClick={() => setEditMode(true)}
            sx={{ mt: "20px" }}
            size="small"
            variant="contained"
          >
            Chỉnh sửa thông tin cá nhân
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
