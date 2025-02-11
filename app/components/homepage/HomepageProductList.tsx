import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type dataset = {
  item: {
    product_name: string;
    product_id: string;
    price: number;
    category_id: string;
  };
  upload: [
    {
      is_feature: boolean;
      upload_src: string;
    }
  ];
};

function HomepageProductList({
  data,
  title,
}: {
  data: dataset[];
  title: string;
}) {
  const router = useRouter();
  useEffect(() => {
    console.log(data);
  });
  return (
    <div className="py-[30px] px-[200px]">
      <div className="text-[30px] font-bold border-b-2 border-red-700 mb-[20px]">
        <p>{title}</p>
      </div>
      <div className="grid grid-cols-6 gap-[20px]">
        {data &&
          data.map((data, index) => (
            <div
              onClick={() =>
                router.push(
                  `/${data.item.category_id === "LT" ? "laptop" : "celphone"}/${
                    data.item.product_id
                  }`
                )
              }
              className="rounded-md shadow-xl p-[10px] hover:shadow-2xl duration-500 flex flex-col gap-[20px] hover:cursor-pointer"
              key={index}
            >
              {data.upload.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`http://${data.upload[0].upload_src}`}
                  alt="product-image"
                  height={1000}
                  width={1000}
                />
              ) : (
                <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                  <p>No image</p>
                </div>
              )}
              <p className="font-bold text-[20px]">{data.item.product_name}</p>
              <p className="font-bold text-red-700 text-[18px]">
                {data.item.price?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
                VND
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomepageProductList;
