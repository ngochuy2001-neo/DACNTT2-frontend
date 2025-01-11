import React from "react";
import Image from "next/image";

const dataset = [
  {
    brand: "Apple",
    image: "/assets/images/homepage/brand-apple.png",
    url: "",
  },
  {
    brand: "Samsung",
    image: "/assets/images/homepage/brand-samsung.png",
    url: "",
  },
  {
    brand: "Xiaomi",
    image: "/assets/images/homepage/brand-xiaomi.png",
    url: "",
  },
  {
    brand: "Oppo",
    image: "/assets/images/homepage/brand-oppo.png",
    url: "",
  },
  {
    brand: "Sony",
    image: "/assets/images/homepage/brand-sony.png",
    url: "",
  },
  {
    brand: "ZTE Nubia",
    image: "/assets/images/homepage/brand-zte.png",
    url: "",
  },
  {
    brand: "Razer",
    image: "/assets/images/homepage/brand-razer.png",
    url: "",
  },
  {
    brand: "Infinix",
    image: "/assets/images/homepage/brand-infinix.png",
    url: "",
  },
  {
    brand: "Vivo",
    image: "/assets/images/homepage/brand-vivo.png",
    url: "",
  },
  {
    brand: "Realme",
    image: "/assets/images/homepage/brand-realme.png",
    url: "",
  },
];

function MobileBrand() {
  return (
    <div className="py-[30px] px-[200px]">
      <div className="text-[30px] font-bold border-b-2 border-red-700 mb-[20px]">
        Các hãng laptop của chúng tôi
      </div>
      <div className="grid grid-cols-5 gap-[20px] grid-rows-2">
        {dataset.map((data, index) => (
          <div
            key={index}
            className="w-full shadow-xl hover:shadow-2xl rounded-xl px-[50px] flex justify-center items-center duration-300 h-[96px] overflow-hidden"
          >
            <Image
              src={data.image}
              alt={data.brand}
              width={1000}
              height={1000}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileBrand;
