"use client";
import {
  Button,
  ButtonGroup,
  Modal,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function OrderPage() {
  const [orders, setOrders] = React.useState<
    Array<{
      order: {
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
      };
      detail: {
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
      }[];
    }>
  >([]);

  const [openModal, setOpenModal] = useState(false);

  const [tablePage, setTablePage] = useState(0);
  const [tableData, setTableData] = useState<
    Array<{
      order: {
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
      };
      detail: {
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
      }[];
    }>
  >([]);

  const [orderDetail, setOrderDetail] = useState<
    Array<{
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
    }>
  >([
    {
      _id: "",
      order_id: "",
      product_name: "",
      variant_id: "",
      unit_price: 0,
      quantity: 0,
      promotion_id: "",
      price: 0,
      product_img: "",
      __v: 0,
    },
  ]);

  const fetchOrders = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ORDER_API_URL}/orders/`
    );
    console.log(response);
    setOrders(response.data.orderList);
    console.log(
      response.data.orderList.slice(0 * tablePage, (tablePage + 1) * 10)
    );
    setTableData(response.data.orderList.slice(0, (tablePage + 1) * 10));
  };

  const addShipment = async (orderId: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SHIPMENT_API_URL}/shipments/create`,
        {
          orderId: orderId,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (orderId: string) => {
    setOpenModal(true);

    const orderDetail = orders.find(
      (order) => order.order.order_id === orderId
    );
    if (orderDetail) {
      setOrderDetail(orderDetail.detail);
    }
  };

  useEffect(() => {
    setTableData(orders.slice(10 * tablePage, (tablePage + 1) * 10));
  }, [tablePage]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-4 rounded-md min-h-full flex flex-col justify-between">
      <div>
        <Typography>Quản lý đơn hàng</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Số thứ tự</TableCell>
              <TableCell align="center">Tên người dùng</TableCell>
              <TableCell align="center">Số điện thoại</TableCell>
              <TableCell align="center">Tổng số mặt hàng</TableCell>
              <TableCell align="center">Tổng giá</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((orderItem, index) => (
              <TableRow key={orderItem.order.order_id}>
                <TableCell align="center">
                  {index + 1 + tablePage * 10}
                </TableCell>
                <TableCell align="center">{orderItem.order.fullname}</TableCell>
                <TableCell align="center">
                  {orderItem.order.phone_number}
                </TableCell>
                <TableCell align="center">
                  {orderItem.order.total_item}
                </TableCell>
                <TableCell align="center">
                  {orderItem.order.total_cost}
                </TableCell>
                <TableCell align="center">{orderItem.order.status}</TableCell>
                <TableCell align="center">
                  <ButtonGroup>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpenModal(orderItem.order.order_id)}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      size="small"
                      onClick={() => addShipment(orderItem.order.order_id)}
                      variant="outlined"
                    >
                      Lên đơn giao hàng
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Pagination
          count={Math.ceil(orders.length / 10)}
          page={tablePage + 1}
          onChange={(event, value) => setTablePage(value - 1)}
        />
      </div>
      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="w-[60%] h-fit flex flex-col bg-white p-4 rounded-md">
          <Typography>Chi tiết đơn hàng</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Hình ảnh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetail.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.product_img}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Modal>
    </div>
  );
}

export default OrderPage;
