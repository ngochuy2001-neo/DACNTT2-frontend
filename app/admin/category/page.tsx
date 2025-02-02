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

function CategoryPage() {
  const [categoryData, setCategoryData] = useState([
    {
      _id: "Something",
      category_name: "Test",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<string>("");

  const fetchData = async () => {
    axios
      .get(process.env.NEXT_PUBLIC_LOCAL_API_URL + "category/")
      .then((response) => setCategoryData(response.data));
  };

  const handleOpenModal = (modalType: boolean) => {
    setIsEditMode(modalType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoryName("");
  };

  const createCategory = async () => {
    axios
      .post(process.env.NEXT_PUBLIC_LOCAL_API_URL + "category/", {
        category_name: categoryName,
      })
      .then((response) => {
        fetchData();
        console.log(response);
      })
      .catch((error) => console.log(error));
    handleCloseModal();
  };

  const updateCategory = async (id: string) => {
    axios
      .put(process.env.NEXT_PUBLIC_LOCAL_API_URL + "category/" + id, {
        category_name: categoryName,
      })
      .then((response) => {
        fetchData();
        console.log(response);
      })
      .catch((error) => console.log(error));
    handleCloseModal();
  };

  const deleteCategory = async (id: string) => {
    axios
      .delete(process.env.NEXT_PUBLIC_LOCAL_API_URL + "category/" + id)
      .then((response) => {
        fetchData();
        console.log(response);
      })
      .catch((error) => console.log(error));
    fetchData();
    handleCloseModal();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-white h-[100%] rounded-md p-[10px]">
      <div className="flex items-center w-full justify-between px-[20px]">
        <h1 className="font-bold text-[20px]">Quản lý danh mục sản phẩm</h1>
        <Button
          onClick={() => handleOpenModal(false)}
          variant="outlined"
          startIcon={<Add />}
        >
          Thêm danh mục
        </Button>
      </div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên danh mục</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data._id}</TableCell>
                <TableCell>{data.category_name}</TableCell>
                <TableCell align="right">
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        setEditId(data._id);
                        setCategoryName(data.category_name);
                        handleOpenModal(true);
                      }}
                      variant="outlined"
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => {
                        deleteCategory(data._id);
                        fetchData();
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
            <p className="font-bold text-[20px]">Thêm danh mục</p>
          </div>
          <div className="w-[100%]">
            <TextField
              defaultValue={isEditMode ? categoryName : ""}
              sx={{ width: "100%" }}
              variant="standard"
              label="Tên danh mục"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (!isEditMode) {
                  createCategory();
                } else {
                  updateCategory(editId);
                }
                fetchData();
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

export default CategoryPage;
