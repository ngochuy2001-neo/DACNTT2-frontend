"use client";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

type address = {
  _id: string;
  user_id: string;
  city: string;
  district: string;
  avenue: string;
  specific_address: string;
  create_at: string;
  update_at: string;
  __v: number;
};

function AddressPage() {
  const [addresses, setAddresses] = useState<address[]>([
    {
      _id: "67a04394c2ed132d64a49c3e",
      user_id: "6798f08f2f023ee2478ef78d",
      city: "An Giang",
      district: "Tan Thanh, Long Thanh",
      avenue: "Nguyen Chanh Sat",
      specific_address: "Khu dan cu cau dung",
      create_at: "2025-02-03T04:18:28.394Z",
      update_at: "2025-02-03T04:18:28.394Z",
      __v: 0,
    },
  ]);
  const fetchAddressData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không tìm thấy token");
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}address`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setAddresses(response.data.addresses);
      })
      .catch((error) => console.error("Lỗi khi lấy địa chỉ:", error));
  };

  useEffect(() => {
    fetchAddressData();
  }, []);

  return (
    <div className="w-[100%]">
      <div>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Quản lý địa chỉ nhận hàng
        </Typography>
      </div>
      <div className="flex bg-white w-[100%] p-[20px] rounded-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="right">Tinh/thanh pho, quan huyen, </TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </div>
    </div>
  );
}

export default AddressPage;
