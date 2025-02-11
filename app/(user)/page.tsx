/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Banner from "../components/homepage/Banner";
import HomepageProductList from "../components/homepage/HomepageProductList";
// import LaptopBrands from "../components/homepage/LaptopBrands";
// import MobileBrand from "../components/homepage/MobileBrand";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import CellphoneImage from "../../public/assets/images/homepage/cellphone.jpg";

const topProduct = [
  {
    item: {
      product_name: "Asus Vivo S 14 OLED (S5406)",
      price: 23990000,
    },
    upload: [
      {
        is_feature: true,
        upload_src:
          "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
      },
    ],
  },
  {
    item: {
      product_name: "Asus Vivo S 14 OLED (S5406)",
      price: 23990000,
    },
    upload: [
      {
        is_feature: true,
        upload_src:
          "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
      },
    ],
  },
  {
    item: {
      product_name: "Asus Vivo S 14 OLED (S5406)",
      price: 23990000,
    },
    upload: [
      {
        is_feature: true,
        upload_src:
          "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
      },
    ],
  },
  {
    item: {
      product_name: "Asus Vivo S 14 OLED (S5406)",
      price: 23990000,
    },
    upload: [
      {
        is_feature: true,
        upload_src:
          "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
      },
    ],
  },
  {
    item: {
      product_name: "Asus Vivo S 14 OLED (S5406)",
      price: 23990000,
    },
    upload: [
      {
        is_feature: true,
        upload_src:
          "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
      },
    ],
  },
  {
    item: {
      product_name: "Asus Vivo S 14 OLED (S5406)",
      price: 23990000,
    },
    upload: [
      {
        is_feature: true,
        upload_src:
          "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
      },
    ],
  },
];

export default function Home() {
  const [productList, setProductList] = useState<any[]>([]);

  const fetchProductList = async () => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products`)
        .then((res) => {
          console.log(res.data);
          setProductList(res.data.products);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div>
      <Banner />
      <HomepageProductList
        data={productList.length === 0 ? topProduct : productList.slice(0, 6)}
        title="Top sản phẩm đáng mua nhất"
      />

      <HomepageProductList
        data={productList.length === 0 ? topProduct : productList.slice(11, 17)}
        title="Top điện thoại bán chạy"
      />
      <div className="px-[200px] mb-[30px]">
        <div className="shadow-xl grid grid-cols-2 rounded-md p-4">
          <div className="flex flex-col justify-center gap-[20px]">
            <Typography variant="h4" fontWeight="bold">
              Chọn cho mình một chiếc điện thoại
            </Typography>
            <Typography variant="h6" sx={{ width: "70%" }}>
              Trong thế giới hiện đại, một chiếc điện thoại không chỉ là công cụ
              liên lạc, mà còn là cánh cửa mở ra vô vàn cơ hội.
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "200px", backgroundColor: "black" }}
              color="primary"
            >
              Xem thêm
            </Button>
          </div>
          <div>
            <img
              className="h-[400px] w-full rounded-lg"
              src={CellphoneImage.src}
              alt="cellphone"
            />
          </div>
        </div>
      </div>
      <div className="px-[200px] mb-[30px]">
        <div className="shadow-xl grid grid-cols-2 rounded-xl p-[30px]">
          <div>
            <img
              className="h-[400px] w-full rounded-lg"
              src={CellphoneImage.src}
              alt="cellphone"
            />
          </div>
          <div className="flex flex-col items-end justify-center gap-[20px]">
            <Typography variant="h4" fontWeight="bold">
              Sản phẩm không thể thiếu
            </Typography>
            <Typography variant="h6" sx={{ width: "70%", textAlign: "right" }}>
              Một chiếc laptop là thứ không thể thiếu trong balo của bạn, một
              công cụ giúp bạn hướng tới sự thành công
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "200px", backgroundColor: "black" }}
              color="primary"
            >
              Xem thêm
            </Button>
          </div>
        </div>
      </div>
      {/* <LaptopBrands />
      <MobileBrand /> */}
    </div>
  );
}
