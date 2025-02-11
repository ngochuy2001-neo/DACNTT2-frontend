/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import LapptopBackground from "@/public/assets/images/laptop-background.jpg";
import { Typography, Box } from "@mui/material";
import {} from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  brand: string;
  cpu: {
    brand: string;
    series: string;
  };
  ram: {
    size: number;
    type: string;
  };
  storage: {
    type: string;
    capacity: number;
  };
  screen: {
    size: number;
    type: string;
  };
}

const filters = [
  {
    title: "Thương hiệu",
    type: "checkbox",
    options: ["ASUS", "Acer", "Dell", "HP", "Lenovo", "MSI"],
  },
  {
    title: "CPU",
    type: "checkbox",
    options: [
      "Intel Core i3",
      "Intel Core i5",
      "Intel Core i7",
      "Intel Core i9",
      "AMD Ryzen 5",
      "AMD Ryzen 7",
    ],
  },
  {
    title: "RAM",
    type: "checkbox",
    options: ["4GB", "8GB", "16GB", "32GB"],
  },
  {
    title: "Ổ cứng",
    type: "checkbox",
    options: ["SSD 256GB", "SSD 512GB", "SSD 1TB", "HDD 1TB"],
  },
  {
    title: "Màn hình",
    type: "checkbox",
    options: ["13.3 inch", "14 inch", "15.6 inch", "16 inch", "17.3 inch"],
  },
  {
    title: "Card đồ họa",
    type: "checkbox",
    options: [
      "NVIDIA RTX 3050",
      "NVIDIA RTX 4050",
      "NVIDIA RTX 4060",
      "AMD Radeon",
    ],
  },
];

function LaptopProductPage() {
  const [laptops, setLaptops] = useState<
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
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop`
      );
      console.log(response.data);
      setLaptops(response.data.laptops);
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
          Laptop
        </Typography>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-5 gap-4 ">
          {laptops.map((laptop) => (
            <div
              onClick={() => router.push(`/laptop/${laptop.product_id}`)}
              key={laptop._id}
              className="flex flex-col items-center gap-2 hover:cursor-pointer hover:shadow-lg duration-300 rounded-lg"
            >
              {laptop.feature_img_src ? (
                <div className="w-[200px] h-[200px] rounded-lg">
                  <img
                    src={`http://${laptop.feature_img_src}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-[200px] w-[200px] bg-gray"></div>
              )}
              <div className="p-2 w-full">
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  {laptop.product_name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#b01207",
                    fontSize: "18px",
                  }}
                >
                  {laptop?.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

export default LaptopProductPage;
