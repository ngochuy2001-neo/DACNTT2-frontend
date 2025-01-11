"use client";
import Banner from "./components/homepage/Banner";
import HomepageProductList from "./components/homepage/HomepageProductList";
import LaptopBrands from "./components/homepage/LaptopBrands";
import MobileBrand from "./components/homepage/MobileBrand";

const topProduct = [
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },

  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
];

export default function Home() {
  return (
    <div>
      <Banner />
      <HomepageProductList
        data={topProduct}
        title="Top sản phẩm đáng mua nhất"
      />
      <HomepageProductList data={topProduct} title="Top laptop bán chạy" />
      <HomepageProductList data={topProduct} title="Top điện thoại bán chạy" />
      <LaptopBrands />
      <MobileBrand />
    </div>
  );
}
