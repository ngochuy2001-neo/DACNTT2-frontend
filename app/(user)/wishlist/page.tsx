"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Stack,
  IconButton,
  Chip,
} from "@mui/material";
import Image from "next/image";
import { Delete, ShoppingCart } from "@mui/icons-material";

interface WishlistItem {
  id: string;
  image: string;
  name: string;
  price: number;
  stock_status: boolean;
  discount?: number;
}

const initialItems: WishlistItem[] = [
  {
    id: "1",
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Laptop ASUS Vivobook Go 14 E1404FA-NK177W",
    price: 24000000,
    stock_status: true,
    discount: 10,
  },
  {
    id: "2",
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Laptop Gaming MSI Katana 15 B13VEK 1205VN",
    price: 27990000,
    stock_status: false,
  },
];

function WishlistPage() {
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(initialItems);

  const handleRemoveItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price * (1 - discount / 100);
  };

  return (
    <Box className="max-w-7xl mx-auto py-8 px-4">
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Danh sách yêu thích
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell align="right">Giá</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wishlistItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f8f9fa" },
                }}
              >
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        position: "relative",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      {item.discount && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "error.main",
                            color: "white",
                            padding: "2px 8px",
                            borderRadius: 1,
                            fontSize: "0.75rem",
                          }}
                        >
                          -{item.discount}%
                        </Box>
                      )}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {item.name}
                      </Typography>
                      {item.discount && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: "line-through" }}
                        >
                          {item.price.toLocaleString()}₫
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" color="error" fontWeight="bold">
                    {calculateDiscountedPrice(
                      item.price,
                      item.discount
                    ).toLocaleString()}
                    ₫
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={item.stock_status ? "Còn hàng" : "Hết hàng"}
                    color={item.stock_status ? "success" : "error"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      disabled={!item.stock_status}
                      sx={{
                        backgroundColor: item.stock_status ? "#1976d2" : "#ccc",
                      }}
                    >
                      Thêm vào giỏ
                    </Button>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{
                        border: "1px solid",
                        borderColor: "error.main",
                        "&:hover": {
                          backgroundColor: "error.main",
                          color: "white",
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {wishlistItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    Danh sách yêu thích trống
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }} href="/product">
                    Tiếp tục mua sắm
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default WishlistPage;
