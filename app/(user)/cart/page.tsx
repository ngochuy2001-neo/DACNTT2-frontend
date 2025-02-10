/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider,
  IconButton,
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  selected: boolean;
}

const initialItems: CartItem[] = [
  {
    id: "1",
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Laptop ASUS Vivobook Go 14 E1404FA-NK177W",
    price: 24000000,
    quantity: 1,
    selected: false,
  },
  {
    id: "2",
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Laptop Gaming MSI Katana 15 B13VEK 1205VN",
    price: 27990000,
    quantity: 1,
    selected: false,
  },
];

function CartPage() {
  const [cartDetails, setCartDetails] = useState<
    {
      _id: string;
      cart_id: string;
      variant_id: string;
      product_img: string;
      product_name: string;
      variant_name: string;
      variant_price: number;
      promotion_id: string;
      quantity: number;
      subtotal: number;
      __v: number;
    }[]
  >([]);

  const [addressDetails, setAddressDetails] = useState<
    {
      _id: string;
      address_id: string;
      user_id: string;
      city: string;
      district: string;
      avenue: string;
      specific: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }[]
  >([]);

  const [currentAddressId, setCurrentAddressId] = useState<string>("");

  const router = useRouter();

  const handleRemoveItem = async (variant_id: string) => {
    try {
      const res = await axios.delete(
        `http://localhost:5002/cart/remove/${variant_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        fetchCart();
      } else {
        console.error("Xóa sản phẩm không thành công");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa sản phẩm:", error);
    }
  };

  const handleCheckout = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_ORDER_API_URL}/orders/create`,
      {
        addressId: currentAddressId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      console.log(res.data);
      router.push(`/checkout/${res.data.order.order_id}`);
    } else {
      console.error("Tạo đơn hàng không thành công");
    }
  };

  const fetchAddress = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_USER_API_URL}/addresses`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      setAddressDetails(res.data.address);
      setCurrentAddressId(res.data.address[0].address_id);
    } else {
      console.error("Lấy địa chỉ không thành công");
    }
  };

  const checkUser = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_USER_API_URL}/users/login/check`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res.data.success);

    if (!res.data.success) {
      router.push("/login");
    } else {
      fetchCart();
    }
  };

  const fetchCart = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/cart`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setCartDetails(res.data.detail);
  };

  useEffect(() => {
    checkUser();
    fetchAddress();
  }, []);

  return (
    <Box className="max-w-7xl mx-auto py-8 px-4">
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Giỏ hàng của bạn
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Tổng tiền</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartDetails.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="h-[100px] w-[100px]">
                      <img src={`http://${item.product_img}`} alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-[18px]">
                        {item.product_name}
                      </div>
                      <div className="font-bold text-[16px] text-red-600">
                        {item.variant_price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                      <div>{item.variant_name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">
                  {item.subtotal.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleRemoveItem(item.variant_id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="grid grid-cols-2 gap-[100px] mt-[30px]">
        <div className="bg-white shadow-md w-full p-4">
          <div>
            <Typography variant="h6" fontWeight="bold">
              Địa chỉ
            </Typography>
          </div>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <RadioGroup
              sx={{
                width: "100%",
                display: "grid",
                gridAutoRow: "auto",
                gap: "10px",
              }}
              value={currentAddressId}
              onChange={(e) => setCurrentAddressId(e.target.value)}
            >
              {addressDetails.map((item) => (
                <FormControlLabel
                  sx={{
                    marginLeft: "0px",
                    "&:hover": {
                      boxShadow:
                        " 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    },
                    padding: "5px 20px",
                    borderRadius: "7px",
                    transition: "0.3s",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  }}
                  value={item._id}
                  key={item.address_id}
                  control={<Radio />}
                  label={
                    <div className="flex">
                      <Typography>
                        {item.specific}, {item.avenue}, {item.district}
                        {", "}
                        {item.city}
                      </Typography>
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>

        <div className="bg-white w-full shadow-md p-4 h-fit">
          <Typography variant="h6" fontWeight="bold">
            Thống kê đơn hàng
          </Typography>
          <div className="flex flex-col justify-between h-full">
            <div className="mt-4 flex justify-between">
              <Typography>Số lượng sản phẩm: </Typography>
              <Typography>
                {cartDetails.reduce((total, item) => total + item.quantity, 0)}
              </Typography>
            </div>
            <Divider />
            <div className="mt-4 flex justify-between">
              <Typography>Tổng tiền: </Typography>
              <Typography>
                {cartDetails
                  .reduce((total, item) => total + item.subtotal, 0)
                  .toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
              </Typography>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleCheckout}
                sx={{ backgroundColor: "#000", color: "#fff" }}
                variant="contained"
              >
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default CartPage;
