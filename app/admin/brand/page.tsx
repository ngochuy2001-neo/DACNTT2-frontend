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

interface Brand {
  _id: string;
  brand_name: string;
  brand_id: string;
}

function BrandPage() {
  const [brandData, setBrandData] = useState<Brand[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/brands`
      );
      setBrandData(response.data.brands);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
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

  const createBrand = async () => {
    if (!brandName.trim()) return alert("Vui lòng nhập tên thương hiệu!");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/brands/create`,
        {
          brandName: brandName,
        }
      );
      fetchData(); // Fetch lại dữ liệu sau khi tạo thương hiệu
    } catch (error) {
      console.log("Lỗi khi tạo thương hiệu:", error);
    }
    handleCloseModal();
  };

  const updateBrand = async (id: string) => {
    if (!brandName.trim()) return alert("Vui lòng nhập tên thương hiệu!");

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/brands/update/${id}`,
        {
          brandName: brandName,
        }
      );
      fetchData(); // Fetch lại dữ liệu sau khi cập nhật thương hiệu
    } catch (error) {
      console.log("Lỗi khi cập nhật thương hiệu:", error);
    }
    handleCloseModal();
  };

  const deleteBrand = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/brands/delete/${id}`
      );
      fetchData();
    } catch (error) {
      console.log("Lỗi khi xóa thương hiệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white h-[100%] rounded-md p-[10px] overflow-y-scroll">
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
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.brand_name}</TableCell>
                <TableCell align="right">
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        setEditId(data.brand_id);
                        setBrandName(data.brand_name);
                        handleOpenModal(true);
                      }}
                      variant="outlined"
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => {
                        deleteBrand(data.brand_id);
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
        <div className="min-w-[800px] flex flex-col gap-[20px] bg-white py-[20px] px-[30px] ">
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
