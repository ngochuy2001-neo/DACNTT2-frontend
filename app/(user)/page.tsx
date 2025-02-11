"use client";
import { useEffect, useState } from "react";
import Banner from "../components/homepage/Banner";
import HomepageProductList from "../components/homepage/HomepageProductList";
import LaptopBrands from "../components/homepage/LaptopBrands";
import MobileBrand from "../components/homepage/MobileBrand";
import axios from "axios";

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
      <div className="px-[200px]">
        <div className="shadow-md rounded-md p-4">
          <div></div>
          <div></div>
        </div>
      </div>
      {/* <LaptopBrands />
      <MobileBrand /> */}
    </div>
  );
}
