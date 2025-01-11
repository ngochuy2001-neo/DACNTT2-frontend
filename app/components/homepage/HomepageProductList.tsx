import React from "react";
import Image from "next/image";

type dataset = {
  image: string;
  name: string;
  price: string;
  url?: string;
};

function HomepageProductList({
  data,
  title,
}: {
  data: dataset[];
  title: string;
}) {
  return (
    <div className="py-[30px] px-[200px]">
      <div className="text-[30px] font-bold border-b-2 border-red-700 mb-[20px]">
        <p>{title}</p>
      </div>
      <div className="grid grid-cols-6 gap-[20px]">
        {data.map((data, index) => (
          <div
            className="rounded-md shadow-xl p-[10px] hover:shadow-2xl duration-500 flex flex-col gap-[20px] hover:cursor-pointer"
            key={index}
          >
            <Image
              src={data.image}
              alt="product-image"
              height={1000}
              width={1000}
            />
            <p className="font-bold text-[20px]">{data.name}</p>
            <p className="font-bold text-red-700 text-[18px]">
              {data.price} VND
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomepageProductList;
