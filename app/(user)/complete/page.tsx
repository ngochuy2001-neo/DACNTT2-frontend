"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
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
} from "@mui/material";

function CompletePage() {
  const completeInformation = useSearchParams();
  const router = useRouter();
  const paramsObject = Object.fromEntries(completeInformation.entries());
  useEffect(() => {
    console.log(paramsObject.vnp_Amount);
  }, []);

  return (
    <div className="flex flex-col gap-[20px] items-center justify-center py-[30px] px-[20%]">
      <h2 className="text-2xl font-bold">Thông tin giao dịch</h2>
      <div className="flex flex-col items-center w-[500px] shadow-md p-[20px]">
        <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
          Giao dịch thành công!!
        </Typography>
        <Typography variant="h6">
          Đơn hàng sẽ được chúng tôi nhanh chóng thực hiện
        </Typography>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => router.push("/")}
          variant="contained"
          color="primary"
        >
          Trở lại trang chủ
        </Button>
      </div>
    </div>
  );
}

export default CompletePage;
