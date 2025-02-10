"use client";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createVnpayPaymentUrl } from "@/app/utils/vnpay";

function CheckoutPage() {
  const [orderDetails, setOrderDetails] = useState<
    {
      _id: string;
      order_id: string;
      product_name: string;
      variant_id: string;
      unit_price: number;
      quantity: number;
      promotion_id: string;
      price: number;
      product_img: string;
      __v: number;
    }[]
  >([]);
  const [orderInformation, setOrderInformation] = useState<{
    _id: string;
    order_id: string;
    user_id: string;
    fullname: string;
    phone_number: string;
    address_id: string;
    total_item: number;
    total_price: number;
    delivery_cost: number;
    discount_amount: number;
    total_cost: number;
    status: string;
    __v: number;
  }>({
    _id: "",
    order_id: "",
    user_id: "",
    fullname: "",
    phone_number: "",
    address_id: "",
    total_item: 0,
    total_price: 0,
    delivery_cost: 0,
    discount_amount: 0,
    total_cost: 0,
    status: "",
    __v: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  const { orderId } = useParams();
  const fetchOrder = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ORDER_API_URL}/orders/${orderId}`
    );
    if (res.data.success) {
      console.log(res.data.order);
      setOrderDetails(res.data.detail);
      setOrderInformation(res.data.order);
    }
  };

  const handlePayment = async () => {
    const paymentUrl = createVnpayPaymentUrl({
      amount: orderDetails.reduce((acc, item) => acc + item.price, 0),
      orderInfo: `Thanh toán đơn hàng ${orderId}`,
      orderType: "pay",
      returnUrl: "http://localhost:3000/complete",
    });
    window.location.href = paymentUrl;
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="flex justify-center py-[30px]">
      <div className="w-[40%] bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-center">
          <Typography
            variant="h5"
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            Xác nhận thanh toán
          </Typography>
        </div>
        <div className="flex mt-[20px]">
          <Typography sx={{ fontWeight: "bold" }}>
            Mã đơn hàng: {orderId}
          </Typography>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Tổng tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ borderBottom: "none" }}>
              <TableCell
                sx={{ fontWeight: "bold", borderBottom: "none" }}
                colSpan={2}
              >
                Tổng tiền
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "none" }}>
                {orderDetails.reduce((acc, item) => acc + item.price, 0)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-[20px]">
          <Typography sx={{ fontWeight: "bold" }}>
            Phương thức thanh toán
          </Typography>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Tiền mặt"
            />
            <FormControlLabel value="VNPay" control={<Radio />} label="VNPay" />
          </RadioGroup>
        </div>
        <div className="mt-[20px] flex justify-end">
          <Button onClick={handlePayment} variant="contained" color="primary">
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
