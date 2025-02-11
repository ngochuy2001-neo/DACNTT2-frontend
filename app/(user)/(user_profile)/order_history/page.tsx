"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function OrderHistoryPage() {
  const [transactions, setTransactions] = useState<
    {
      _id: string;
      transaction_id: string;
      order_id: string;
      amount: string;
      method: string;
      description: string;
      user_id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }[]
  >([]);

  const fetchAllTransaction = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ORDER_API_URL}/transactions/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTransaction();
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-lg">
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Lịch sử giao dịch
      </Typography>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell align="center">Ngày đặt hàng</TableCell>
              <TableCell align="center">Tổng tiền</TableCell>
              <TableCell align="right">Phương thức thanh toán</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 &&
              transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.transaction_id}</TableCell>
                  <TableCell align="center">{transaction.createdAt}</TableCell>
                  <TableCell align="center">
                    {(Number(transaction.amount) / 100).toLocaleString(
                      "vi-VN",
                      { currency: "VND", style: "currency" }
                    )}
                  </TableCell>
                  <TableCell align="right">{transaction.method}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default OrderHistoryPage;
