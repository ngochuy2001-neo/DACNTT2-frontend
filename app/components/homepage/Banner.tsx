import { Button } from "@mui/material";
import React from "react";

function Banner() {
  return (
    <div className="bg-homepage-background h-[700px] bg-center bg-cover flex justify-center py-[40px]">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-[45px]">
          Một khởi đầu hoàn hảo cho năm mới 2025
        </h1>
        <h2 className="text-[30px] mb-[20px]">
          Tìm được món đồ công nghệ thay đổi cuộc sống
        </h2>
      </div>
    </div>
  );
}

export default Banner;
