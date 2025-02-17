"use client";
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Address = {
  _id: string;
  user_id: string;
  city: string;
  district: string;
  ward: string;
  avenue: string;
  specific_address: string;
  create_at: string;
  update_at: string;
  __v: number;
};

function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Partial<Address>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const fetchAddressData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSnackbarMessage("Không tìm thấy token");
        setSnackbarOpen(true);
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/address`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error);
      setSnackbarMessage("Lỗi khi lấy địa chỉ");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchAddressData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSnackbarMessage("Không tìm thấy token");
        setSnackbarOpen(true);
        return;
      }

      await axios.delete(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/address/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== id)
      );
      setSnackbarMessage("Xóa địa chỉ thành công");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Lỗi khi xóa địa chỉ:", error);
      setSnackbarMessage("Lỗi khi xóa địa chỉ");
      setSnackbarOpen(true);
    }
  };

  const handleOpenModal = (address?: Address) => {
    if (address) {
      setSelectedAddress(address);
      setIsEditing(true);
    } else {
      setSelectedAddress({
        city: "",
        district: "",
        ward: "",
        avenue: "",
        specific_address: "",
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSnackbarMessage("Không tìm thấy token");
        setSnackbarOpen(true);
        return;
      }

      if (isEditing && selectedAddress._id) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/address/${selectedAddress._id}`,
          selectedAddress,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address._id === selectedAddress._id
              ? response.data.address
              : address
          )
        );
        setSnackbarMessage("Cập nhật địa chỉ thành công");
        setSnackbarOpen(true);
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/address`,
          selectedAddress,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddresses([...addresses, response.data.address]);
        setSnackbarMessage("Thêm địa chỉ thành công");
        setSnackbarOpen(true);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi lưu địa chỉ:", error);
      setSnackbarMessage("Lỗi khi lưu địa chỉ");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="w-[100%]">
      <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: "20px" }}>
        Quản lý địa chỉ nhận hàng
      </Typography>
      <div className="flex flex-col bg-white w-[100%] p-[20px] rounded-md">
        <div className="flex justify-end">
          <Button
            onClick={() => handleOpenModal()}
            variant="contained"
            size="small"
          >
            Thêm địa chỉ nhận hàng
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="center">Tỉnh/thành phố</TableCell>
              <TableCell align="center">Quận/huyện</TableCell>
              <TableCell align="center">Phường/Xã</TableCell>
              <TableCell align="center">Đường</TableCell>
              <TableCell align="center">Địa chỉ chi tiết</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.district}</TableCell>
                <TableCell align="center">{row.ward}</TableCell>
                <TableCell align="center">{row.avenue}</TableCell>
                <TableCell align="center">{row.specific_address}</TableCell>
                <TableCell align="center">
                  <Button
                    sx={{ minWidth: "0px" }}
                    onClick={() => handleOpenModal(row)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    sx={{ minWidth: "0px" }}
                    color="error"
                    onClick={() => handleDelete(row._id)}
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal thêm / chỉnh sửa địa chỉ */}
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="bg-white p-[20px] min-w-[900px] grid grid-cols-2 gap-[40px] rounded-md">
          <TextField
            variant="standard"
            label="Tỉnh/thành phố"
            value={selectedAddress.city}
            onChange={(e) =>
              setSelectedAddress({ ...selectedAddress, city: e.target.value })
            }
          />
          <TextField
            variant="standard"
            label="Quận/huyện"
            value={selectedAddress.district}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                district: e.target.value,
              })
            }
          />
          <TextField
            variant="standard"
            label="Phường/xã"
            value={selectedAddress.ward}
            onChange={(e) =>
              setSelectedAddress({ ...selectedAddress, ward: e.target.value })
            }
          />
          <TextField
            variant="standard"
            label="Số nhà, đường"
            value={selectedAddress.avenue}
            onChange={(e) =>
              setSelectedAddress({ ...selectedAddress, avenue: e.target.value })
            }
          />
          <TextField
            variant="standard"
            label="Vị trí cụ thể"
            value={selectedAddress.specific_address}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                specific_address: e.target.value,
              })
            }
          />
          <Button onClick={handleSave} variant="contained">
            {isEditing ? "Cập nhật" : "Thêm mới"}
          </Button>
        </div>
      </Modal>

      {/* Snackbar thông báo lỗi hoặc thành công */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddressPage;
