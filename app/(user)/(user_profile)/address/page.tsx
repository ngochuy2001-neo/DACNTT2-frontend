import { Typography } from "@mui/material";
import React from "react";

function AddressPage() {
  return (
    <div className="w-[100%]">
      <div>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Quản lý địa chỉ nhận hàng
        </Typography>
      </div>
      <div className="flex bg-white w-[100%] p-[20px] rounded-md"></div>
    </div>
  );
}

export default AddressPage;
