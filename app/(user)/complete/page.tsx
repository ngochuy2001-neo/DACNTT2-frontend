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
      <TableContainer component={Paper}>
        <div className="flex justify-center"></div>
        <div>
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-green-600">Giao dịch thành công!</h3>
            <p className="mt-2 text-lg">Cảm ơn bạn đã thanh toán. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</p>
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
