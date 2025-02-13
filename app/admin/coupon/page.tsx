"use client";
import { Add, Label } from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  Modal,
  Snackbar,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const monthConverter: { [key: string]: number } = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const convertMonth = (month: string): number | null => {
  return monthConverter[month] || null;
};

function CouponAdminPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expiredDate, setExpiredDate] = useState<Dayjs | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchCoupon = async () => {
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_ORDER_API_URL + "/coupons/")
        .then((response) => {
          console.log(response.data.coupons);
          setCoupons(response.data.coupons);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    fetchCoupon();
  };

  const handleDeleteCoupon = async (coupon_id: string) => {
    try {
      await axios
        .delete(
          process.env.NEXT_PUBLIC_ORDER_API_URL + "/coupons/delete/" + coupon_id
        )
        .then((response) => {
          console.log(response.data);
          setSnackbarMessage("Xóa mã giảm giá thành công");
          setOpenSnackbar(true);
          fetchCoupon();
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isActive) {
      setDiscount(Number(value));
    } else {
      setDiscount(Number(value) / 100);
    }
  };

  const handleAddCoupon = async () => {
    console.log(expiredDate.$d, isActive, discount);
    try {
      if (isActive) {
        await axios
          .post(process.env.NEXT_PUBLIC_ORDER_API_URL + "/coupons/create", {
            expiredAt: expiredDate.$d,
            discountAmount: discount,
          })
          .then((response) => {
            console.log(response.data);
            console.log(response.data.coupon);
            handleCloseModal();
            setSnackbarMessage("Thêm mã giảm giá thành công");
            setOpenSnackbar(true);
          })
          .catch((error) => console.log(error));
      } else {
        await axios
          .post(process.env.NEXT_PUBLIC_ORDER_API_URL + "/coupons/create", {
            expiredAt: expiredDate.$d,
            discountRate: discount,
          })
          .then((response) => {
            console.log(response.data);
            handleCloseModal();
            setSnackbarMessage("Thêm mã giảm giá thành công");
            setOpenSnackbar(true);
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, []);

  return (
    <div>
      {/* <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
        label="MUI switch"
      /> */}
      <div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          startIcon={<Add />}
          variant="contained"
          color="error"
        >
          Thêm mã giảm giá
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-[20px]">
        {coupons.map((data, index) => (
          <div key={data._id} className="flex flex-col gap-2 p-4 bg-white ">
            <div>
              <span className="text-2xl font-bold">{data?.coupon_code}</span>
              {data.discount_rate === 0 ? (
                <div>
                  <Typography>
                    <strong>Loại coupon: </strong>Giảm cố định
                  </Typography>
                  <Typography
                    className="text-green-500"
                    sx={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    {data.discount_amount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography>
                    <strong>Loại coupon: </strong>Giảm phần trăm
                  </Typography>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: "bold" }}
                    className="text-green-500"
                  >
                    {data.discount_rate * 100}%
                  </Typography>
                </div>
              )}
            </div>
            <div>
              <Typography>
                <strong>Ngày hết hạn: </strong>
                {new Date(data.expired_at).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteCoupon(data.coupon_id)}
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={isAddModalOpen}
          onClose={handleCloseModal}
        >
          <div className="p-4 bg-white rounded-md flex flex-col gap-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  onChange={(e) => {
                    setExpiredDate(e);
                  }}
                  label="Ngày hết hạn"
                />
              </DemoContainer>
            </LocalizationProvider>
            <FormControlLabel
              control={
                <Switch onChange={(e) => setIsActive(e.target.checked)} />
              }
              label={isActive ? "Giảm cố định" : "Giảm phần trăm"}
            />
            <TextField
              variant="standard"
              label={isActive ? "Số tiền giảm" : "Số phần trăm giảm"}
              onChange={handleDiscountChange}
            />
            <Button onClick={handleAddCoupon}>Thêm</Button>
          </div>
        </Modal>
      </div>
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        autoHideDuration={3000}
        message="Thêm mã giảm giá thành công"
      />
    </div>
  );
}

export default CouponAdminPage;
