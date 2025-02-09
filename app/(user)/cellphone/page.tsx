"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import LapptopBackground from "@/public/assets/images/laptop-background.jpg";
import { Typography, Box } from "@mui/material";
import {} from "@mui/icons-material";
import { useRouter } from "next/navigation";

function CellphoneProductPage() {
  const [cellphones, setCellphones] = useState<
    Array<{
      _id: string;
      product_id: string;
      brand_id: string;
      product_name: string;
      description: string;
      cpu_brand: string;
      vga_brand: string;
      price: number;
      size: number;
      feature_img_src: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      category_id: string;
    }>
  >([]);

  const fetchAllLaptops = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/cellphone`
      );
      console.log(response.data);
      setCellphones(response.data.cellphones);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu laptop:", error);
    }
  };

  const router = useRouter();

  useEffect(() => {
    fetchAllLaptops();
  }, []);

  return (
    <Box className="">
      <div
        className="flex h-[30vh] justify-center items-center text-white "
        style={{
          backgroundImage: `url(${LapptopBackground.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography
          sx={{ fontFamily: "Oleo Script", fontSize: "50px" }}
          variant="h4"
        >
          Cellphones
        </Typography>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-4 gap-4 ">
          {cellphones?.map((cellphones) => (
            <div
              onClick={() => router.push(`/cellphone/${cellphones.product_id}`)}
              key={cellphones._id}
              className="flex flex-col gap-2 hover:cursor-pointer hover:shadow-lg duration-300 rounded-lg"
            >
              <div className="w-full h-[180px] bg-gray-200 rounded-lg">
                {/* <Image src={laptop.feature_img_src} alt={laptop.product_name} /> */}
              </div>

              <div className="p-2">
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  {cellphones.product_name}
                </Typography>
                <Typography variant="body1">{cellphones?.price}</Typography>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

export default CellphoneProductPage;
