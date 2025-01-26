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

  const fetchData = async () => {
    axios
      .get(process.env.NEXT_PUBLIC_LOCAL_API_URL + "brand/")
      .then((response) => setBrandData(response.data));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBrandName("");
    fetchData();
  };

  const createBrand = async () => {
    axios
      .post(process.env.NEXT_PUBLIC_LOCAL_API_URL + "brand/", {
        name: brandName,
      })
      .then((response) => {
        console.log(response);
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-white h-[100%] rounded-md p-[10px]">
      <div className="flex items-center w-full justify-between px-[20px]">
        <h1 className="font-bold text-[20px]">Quản lý thương hiệu</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
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
                    <Button variant="outlined">Sửa</Button>
                    <Button color="error">
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
            <p className="font-bold text-[20px]">Thêm thương hiệu</p>
          </div>
          <div className="w-[100%]">
            <TextField
              defaultValue={brandName}
              sx={{ width: "100%" }}
              variant="standard"
              label="Tên thương hiệu"
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                createBrand();
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
