"use client";
import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ShippingPage() {
  const [tableData, setTableData] = useState([]);
  const [tablePage, setTablePage] = useState(0);
  const [shipments, setShipments] = useState<
    Array<{
      shipment: {
        _id: string;
        shipment_id: string;
        order_id: string;
        recipient_name: string;
        recipient_phone_num: string;
        city: string;
        district: string;
        avenue: string;
        specific: string;
        total_item: number;
        status: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      detail: {
        _id: string;
        shipment_id: string;
        product_name: string;
        quantity: number;
        __v: number;
      }[];
    }>
  >([
    {
      shipment: {
        _id: "",
        shipment_id: "",
        order_id: "",
        recipient_name: "",
        recipient_phone_num: "",
        city: "",
        district: "",
        avenue: "",
        specific: "",
        total_item: 0,
        status: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
      },
      detail: [
        {
          _id: "",
          shipment_id: "",
          product_name: "",
          quantity: 0,
          __v: 0,
        },
      ],
    },
  ]);

  const [statusList, setStatusList] = useState([
    "Pending",
    "Packaged",
    "Shipping",
    "Delivered",
    "Shipping failed",
    "Cancelled",
  ]);

  const handleChangeStatus = async (shipmentId: string, status: string) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SHIPMENT_API_URL}/shipments/update/${shipmentId}`,
      { status }
    );
    console.log(response.data);
    fetchShipping();
  };

  const fetchShipping = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SHIPMENT_API_URL}/shipments`
    );
    console.log(response.data);
    setShipments(response.data.list);
  };

  useEffect(() => {
    fetchShipping();
  }, []);

  return (
    <div className="bg-white p-4 rounded-md">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell align="center">Mã vận chuyển</TableCell>
            <TableCell align="center">Tên người nhận</TableCell>
            <TableCell align="center">Số điện thoại</TableCell>
            <TableCell align="center">Tổng số mặt hàng</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
            <TableCell align="center">Ngày tạo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shipments?.map((shipment, index) => (
            <TableRow key={shipment.shipment._id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">
                {shipment.shipment.shipment_id}
              </TableCell>
              <TableCell align="center">
                {shipment.shipment.recipient_name}
              </TableCell>
              <TableCell align="center">
                {shipment.shipment.recipient_phone_num}
              </TableCell>
              <TableCell align="center">
                {shipment.shipment.total_item}
              </TableCell>
              <TableCell align="center">
                <Select
                  value={shipment.shipment.status}
                  onChange={(e) => {
                    handleChangeStatus(
                      shipment.shipment.shipment_id,
                      e.target.value
                    );
                  }}
                >
                  {statusList.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell align="center">
                {new Date(shipment.shipment.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ShippingPage;
