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
  Checkbox,
  Divider,
  IconButton,
  Typography,
  Box,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import Image from "next/image";
import { Add, Remove, Delete, LocalShipping } from "@mui/icons-material";

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
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
  const [selectAll, setSelectAll] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleSelectItem = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCartItems((items) =>
      items.map((item) => ({ ...item, selected: !selectAll }))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Box className="max-w-7xl mx-auto py-8 px-4">
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Giỏ hàng của bạn
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ borderRadius: 2 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectAll}
                      onChange={handleSelectAll}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell align="right">Đơn giá</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                  <TableCell align="right">Thành tiền</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={item.selected}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </TableCell>
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
                        </Box>
                        <Typography variant="subtitle1">{item.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      {item.price.toLocaleString()}₫
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          sx={{ border: "1px solid #ddd" }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ minWidth: 40, textAlign: "center" }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          sx={{ border: "1px solid #ddd" }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: "#f8f9fa",
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Tổng tiền giỏ hàng
            </Typography>

            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography color="text.secondary">Tổng tiền hàng</Typography>
                <Typography variant="h6">
                  {calculateTotal().toLocaleString()}₫
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography color="text.secondary">Phí vận chuyển</Typography>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "success.main",
                  }}
                >
                  <LocalShipping fontSize="small" />
                  Miễn phí
                </Typography>
              </Box>

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Tổng thanh toán</Typography>
                <Typography variant="h5" color="error" fontWeight="bold">
                  {calculateTotal().toLocaleString()}₫
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
                disabled={!cartItems.some((item) => item.selected)}
              >
                Thanh toán
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartPage;
