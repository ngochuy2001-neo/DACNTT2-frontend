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
  Snackbar,
  Alert,
  TextField,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";

interface Address {
  address_id: string;
  user_id: string;
  city: string;
  district: string;
  avenue: string;
  specific: string;
  create_at: string;
  update_at: string;
  __v: number;
}

function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [avenue, setAvenue] = useState("");
  const [specific, setSpecific] = useState("");

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/addresses/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setAddresses(response.data.addresses || []);
      }
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error);
      setSnackbarMessage("Lỗi khi lấy địa chỉ");
      setSnackbarOpen(true);
    }
  };

  const deleteAddress = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
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

  const handleOpenModal = (address: Address) => {
    setSelectedAddress(address);
    setCity(address.city);
    setDistrict(address.district);
    setAvenue(address.avenue);
    setSpecific(address.specific);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
    setCity("");
    setDistrict("");
    setAvenue("");
    setSpecific("");
  };

  const updateAddress = async () => {
    if (!selectedAddress) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/addresses/update/${selectedAddress.address_id}`,
        {
          city,
          district,
          avenue,
          specific,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address.address_id === selectedAddress.address_id
              ? { ...address, ...response.data.address }
              : address
          )
        );
        setSnackbarMessage("Cập nhật địa chỉ thành công");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật địa chỉ:", error);
      setSnackbarMessage("Lỗi khi cập nhật địa chỉ");
      setSnackbarOpen(true);
    }
    handleCloseModal();
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="bg-white h-[100%] rounded-md p-[10px]">
      <div className="flex items-center w-full justify-between px-[20px]">
        <h1 className="font-bold text-[20px]">Quản lý địa chỉ</h1>
      </div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Thành phố</TableCell>
              <TableCell>Quận/Huyện</TableCell>
              <TableCell>Phường/Xã</TableCell>
              <TableCell>Địa chỉ cụ thể</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.map((address, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{address.city}</TableCell>
                <TableCell>{address.district}</TableCell>
                <TableCell>{address.avenue}</TableCell>
                <TableCell>{address.specific}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="min-w-[400px] flex flex-col gap-[20px] bg-white py-[20px] px-[30px]">
          <h2 className="font-bold text-[20px]">Chỉnh sửa địa chỉ</h2>
          <TextField
            label="Thành phố"
            variant="standard"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            label="Quận/Huyện"
            variant="standard"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <TextField
            label="Phường/Xã"
            variant="standard"
            value={avenue}
            onChange={(e) => setAvenue(e.target.value)}
          />
          <TextField
            label="Địa chỉ cụ thể"
            variant="standard"
            value={specific}
            onChange={(e) => setSpecific(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={updateAddress} variant="contained">
              Cập nhật
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

export default AddressPage;
