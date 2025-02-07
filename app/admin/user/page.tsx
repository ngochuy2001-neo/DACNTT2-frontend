"use client";
import { Delete } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  user_name: string;
  full_name: string;
  email: string;
  phone_num: string;
  user_id: string;
  role_id: string;
}

function UserPage() {
  const [userData, setUserData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("10");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<string>("");

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.users || []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      localStorage.removeItem("token");
      Router.push("/login");
    }
  };

  const handleOpenModal = (modalType: boolean) => {
    setIsEditMode(modalType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserName("");
    setFullName("");
    setEmail("");
    setPhoneNum("");
    setPassword("");
    setRoleId("10");
  };

  const updateUser = async (id: string) => {
    if (
      !userName.trim() ||
      !fullName.trim() ||
      !email.trim() ||
      !phoneNum.trim()
    ) {
      return alert("Vui lòng điền đầy đủ thông tin!");
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/users/put/${id}`,
        {
          username: userName,
          full_name: fullName,
          email: email,
          phoneNumber: phoneNum,
          password: password,
          role_id: roleId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserData((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, ...response.data.user } : user
        )
      );
      fetchData();
    } catch (error) {
      console.log("Lỗi khi cập nhật người dùng:", error);
    }
    handleCloseModal();
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/users/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserData((prev) => prev.filter((user) => user._id !== id));
      fetchData();
    } catch (error) {
      console.log("Lỗi khi xóa người dùng:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white h-[100%] rounded-md p-[10px]">
      <div className="flex items-center w-full justify-between px-[20px]">
        <h1 className="font-bold text-[20px]">Quản lý người dùng</h1>
      </div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên người dùng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.full_name}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.phone_num}</TableCell>
                <TableCell align="right">
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        setEditId(data.user_id);
                        setUserName(data.user_name);
                        setFullName(data.full_name);
                        setEmail(data.email);
                        setPhoneNum(data.phone_num);
                        setRoleId(data.role_id);
                        handleOpenModal(true);
                      }}
                      variant="outlined"
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => {
                        deleteUser(data.user_id);
                      }}
                      color="error"
                    >
                      <Delete />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="min-w-[800px] flex flex-col gap-[20px] bg-white py-[20px] px-[30px]">
          <div className="w-[100%]">
            <p className="font-bold text-[20px]">Sửa người dùng</p>
          </div>
          <div className="w-[100%] grid grid-cols-2 gap-[20px]">
            <TextField
              value={email}
              sx={{ width: "100%" }}
              variant="standard"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              value={phoneNum}
              sx={{ width: "100%" }}
              variant="standard"
              label="Số điện thoại"
              onChange={(e) => setPhoneNum(e.target.value)}
            />
            <TextField
              value={password}
              sx={{ width: "100%" }}
              variant="standard"
              label="Mật khẩu"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="role-select-label">Vai trò</InputLabel>
              <Select
                labelId="role-select-label"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                <MenuItem value="0">Admin</MenuItem>
                <MenuItem value="1">Manager</MenuItem>
                <MenuItem value="10">Customer</MenuItem>
                <MenuItem value="2">Staff</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (isEditMode) {
                  updateUser(editId);
                }
              }}
            >
              Xác nhận
            </Button>
            <Button onClick={handleCloseModal} color="error">
              Hủy bỏ
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserPage;
