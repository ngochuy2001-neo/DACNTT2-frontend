"use client";
import { Address } from "@/app/utils/interface";
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

function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Partial<Address>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbarMessage("Không tìm thấy token");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/addresses/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setAddresses(response.data.address || []);
      }
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error);
      setSnackbarMessage("Lỗi khi lấy địa chỉ");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchAddresses();
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
        `${process.env.NEXT_PUBLIC_USER_API_URL}/addresses/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.address_id !== id)
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
        avenue: "",
        specific: "",
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

      if (!selectedAddress.avenue) {
        setSnackbarMessage("Đường là trường bắt buộc");
        setSnackbarOpen(true);
        return;
      }

      if (isEditing && selectedAddress.address_id) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_USER_API_URL}/addresses/update/${selectedAddress.address_id}`,
          selectedAddress,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address.address_id === selectedAddress.address_id
              ? response.data.address
              : address
          )
        );
        setSnackbarMessage("Cập nhật địa chỉ thành công");
        setSnackbarOpen(true);
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_USER_API_URL}/addresses/create`,
          {
            city: selectedAddress.city,
            district: selectedAddress.district,
            avenue: selectedAddress.avenue,
            specific: selectedAddress.specific,
          },
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
              <TableCell align="left">Tỉnh/thành phố</TableCell>
              <TableCell align="left">Quận/huyện</TableCell>
              <TableCell align="left">Phường/Xã</TableCell>
              <TableCell align="left">Địa chỉ chi tiết</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{row.city}</TableCell>
                <TableCell align="left">{row.district}</TableCell>
                <TableCell align="left">{row.avenue}</TableCell>
                <TableCell align="left">{row.specific}</TableCell>
                <TableCell align="left">
                  <Button
                    sx={{ minWidth: "0px" }}
                    onClick={() => handleOpenModal(row)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    sx={{ minWidth: "0px" }}
                    color="error"
                    onClick={() => handleDelete(row.address_id)}
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
        <div className="bg-white p-[20px] min-w-[600px] grid grid-cols-2 gap-[20px] rounded-md">
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
            value={selectedAddress.avenue}
            onChange={(e) =>
              setSelectedAddress({ ...selectedAddress, avenue: e.target.value })
            }
          />
          <TextField
            variant="standard"
            label="Địa chỉ cụ thể"
            value={selectedAddress.specific}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                specific: e.target.value,
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
