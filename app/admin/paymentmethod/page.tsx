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

function PaymentMethod() {
  const [paymentmethodData, setPaymentmethodData] = useState([
    {
      _id: "Something",
      payment_method_name: "Test",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentmethodName, setPaymentmethodName] = useState("");

  const fetchData = async () => {
    axios
      .get(process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/paymentmethod/")
      .then((response) => setPaymentmethodData(response.data));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPaymentmethodName("");
  };

  const createPaymentmethod = async () => {
    axios
      .post(process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/paymentmethod/", {
        payment_method_name: paymentmethodName,
      })
      .then((response) => {
        fetchData();
        console.log(response);
      })
      .catch((error) => console.log(error));
    handleCloseModal();
  };

  const deletePaymentmethod = async (id: string) => {
    axios
      .delete(
        process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/paymentmethod/" + id
      )
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
        <h1 className="font-bold text-[20px]">
          Quản lý phương thức thanh toán
        </h1>
        <Button
          onClick={() => handleOpenModal()}
          variant="outlined"
          startIcon={<Add />}
        >
          Thêm phương thức thanh toán
        </Button>
      </div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên phương thức</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentmethodData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data._id}</TableCell>
                <TableCell>{data.payment_method_name}</TableCell>
                <TableCell align="right">
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        deletePaymentmethod(data._id);
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
            <p className="font-bold text-[20px]">Thêm phương thức thanh toán</p>
          </div>
          <div className="w-[100%]">
            <TextField
              sx={{ width: "100%" }}
              variant="standard"
              label="Tên phương thức"
              onChange={(e) => setPaymentmethodName(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                createPaymentmethod();
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

export default PaymentMethod;
