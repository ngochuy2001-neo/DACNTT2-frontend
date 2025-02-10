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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thông tin</TableCell>
                <TableCell>Giá trị</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Số tiền:</TableCell>
                <TableCell>
                  {(Number(paramsObject.vnp_Amount) / 100).toLocaleString(
                    "vi-VN",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Mã ngân hàng:</TableCell>
                <TableCell>{paramsObject.vnp_BankCode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Số giao dịch ngân hàng:</TableCell>
                <TableCell>{paramsObject.vnp_BankTranNo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Loại thẻ:</TableCell>
                <TableCell>{paramsObject.vnp_CardType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Thông tin đơn hàng:</TableCell>
                <TableCell>{paramsObject.vnp_OrderInfo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ngày thanh toán:</TableCell>
                <TableCell>{paramsObject.vnp_PayDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Số giao dịch:</TableCell>
                <TableCell>{paramsObject.vnp_TransactionNo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Trạng thái giao dịch:</TableCell>
                <TableCell>
                  {paramsObject.vnp_TransactionStatus === "00"
                    ? "Giao dịch thành công"
                    : "Giao dịch không thành công"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TableContainer>
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
