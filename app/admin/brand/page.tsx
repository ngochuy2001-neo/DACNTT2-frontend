"use client";
import { Add, Delete } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function BrandPage() {
  const [brandData, setBrandData] = useState([
    {
      _id: "Something",
      name: "Test",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<string>("");

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/brand/"
      );
      setBrandData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenModal = (modalType: boolean) => {
    setIsEditMode(modalType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBrandName("");
  };

  // Create brand
  const createBrand = async () => {
    if (!brandName.trim()) return alert("Vui lòng nhập tên thương hiệu!");

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/brand/",
        {
          name: brandName,
        }
      );
      setBrandData((prev) => [...prev, response.data]); // Update local state directly
    } catch (error) {
      console.log("Error creating brand:", error);
    }
    handleCloseModal();
  };

  // Update brand
  const updateBrand = async (id: string) => {
    if (!brandName.trim()) return alert("Vui lòng nhập tên thương hiệu!");

    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/brand/" + id,
        {
          name: brandName,
        }
      );
      setBrandData((prev) =>
        prev.map((brand) =>
          brand._id === id ? { ...brand, name: response.data.name } : brand
        )
      );
    } catch (error) {
      console.log("Error updating brand:", error);
    }
    handleCloseModal();
  };

  // Delete brand
  const deleteBrand = async (id: string) => {
    try {
      await axios.delete(
        process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/brand/" + id
      );
      setBrandData((prev) => prev.filter((brand) => brand._id !== id)); // Update local state directly
    } catch (error) {
      console.log("Error deleting brand:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white h-[100%] rounded-md p-[10px]">
      <div className="flex items-center w-full justify-between px-[20px]">
        <h1 className="font-bold text-[20px]">Quản lý thương hiệu</h1>
        <Button
          onClick={() => handleOpenModal(false)}
          variant="outlined"
          startIcon={<Add />}
        >
          Thêm thương hiệu
        </Button>
      </div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên thương hiệu</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brandData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data._id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell align="right">
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        setEditId(data._id);
                        setBrandName(data.name);
                        handleOpenModal(true);
                      }}
                      variant="outlined"
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => {
                        deleteBrand(data._id);
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
            <p className="font-bold text-[20px]">
              {isEditMode ? "Sửa thương hiệu" : "Thêm thương hiệu"}
            </p>
          </div>
          <div className="w-[100%]">
            <TextField
              value={brandName}
              sx={{ width: "100%" }}
              variant="standard"
              label="Tên thương hiệu"
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (isEditMode) {
                  updateBrand(editId);
                } else {
                  createBrand();
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

export default BrandPage;
