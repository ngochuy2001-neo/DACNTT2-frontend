import React from "react";
import Image from "next/image";

const dataset = [
  {
    brand: "Lenovo",
    image: "/assets/images/homepage/brand-lenovo.png",
    url: "",
  },
  {
    brand: "Samsung",
    image: "/assets/images/homepage/brand-samsung.png",
    url: "",
  },
  {
    brand: "Razer",
    image: "/assets/images/homepage/brand-razer.png",
    url: "",
  },
  {
    brand: "Microsoft",
    image: "/assets/images/homepage/brand-microsoft.png",
    url: "",
  },
  {
    brand: "MSI",
    image: "/assets/images/homepage/brand-msi.png",
    url: "",
  },
  {
    brand: "Asus",
    image: "/assets/images/homepage/brand-asus.png",
    url: "",
  },
  {
    brand: "Acer",
    image: "/assets/images/homepage/brand-acer.png",
    url: "",
  },
  {
    brand: "Dell",
    image: "/assets/images/homepage/brand-dell.png",
    url: "",
  },
  {
    brand: "HP",
    image: "/assets/images/homepage/brand-hp.png",
    url: "",
  },
  {
    brand: "Apple",
    image: "/assets/images/homepage/brand-apple.png",
    url: "",
  },
];

function LaptopBrands() {
  return (
    <div className="py-[30px] px-[200px]">
      <div className="text-[30px] font-bold border-b-2 border-red-700 mb-[20px]">
        Các hãng laptop của chúng tôi
      </div>
      <div className="grid grid-cols-5 gap-[20px] grid-rows-2">
        {dataset.map((data, index) => (
          <div
            key={index}
            className="w-full h-full shadow-xl hover:shadow-2xl rounded-xl px-[50px] flex justify-center items-center duration-300"
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

export default LaptopBrands;
