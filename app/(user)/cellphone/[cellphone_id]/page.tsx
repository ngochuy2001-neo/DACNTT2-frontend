/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function LaptopDetail() {
  const cellphoneId = useParams();

  const [price, setPrice] = useState(0);
  const [variantIndex, setVariantIndex] = useState(0);
  const [productImageUrl, setProductImageUrl] = useState("");

  const [cellphoneDetails, setCellphoneDetails] = useState({
    id: "",
    productId: "",
    brandId: "",
    name: "",
    description: "",
    product_name: "",
    cpuBrand: "",
    vgaBrand: "",
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    featureImage: "",
    categoryId: "",
    price: 0,
    createdAt: "",
    updatedAt: "",
    version: 0,
  });

  const [variants, setVariants] = useState([
    {
      variant: {
        _id: "",
        variant_id: "",
        product_id: "",
        variant_name: "",
        sku: "",
        price: 0,
        promotion_id: "None",
        stock: 0,
        createdAt: "",
        updatedAt: "",
        __v: 0,
      },
      field: {
        screen: {
          resolution: {
            width: 0,
            height: 0,
          },
          size: "",
          material: "",
        },
        cpu: {
          version: "",
          name: "",
        },
        connectors: {
          sim: {
            slots: 0,
          },
          wifi: "",
          bluetooth: "",
          internet: "",
          gps_support: [],
        },
        storage: {
          rom: "",
        },
        camera: {
          back_camera: [],
        },
        power: {
          capability: 0,
          charger: "",
        },
        _id: "",
        variant_field_id: "",
        variant_id: "",
        mfg_year: 0,
        origin_id: "",
        weight: 0,
        color_id: "",
        water_resist: "None",
        material: "",
        ram_storage: "",
        gpu: "None",
        gears: [],
        __v: 0,
      },
    },
  ]);

  const [colors, setColors] = useState([
    {
      color_id: "",
      color: "",
      _id: "",
    },
  ]);

  const [origins, setOrigins] = useState([
    {
      origin_id: "",
      country: "",
      _id: "",
    },
  ]);

  const findOrigin = (originId: string) => {
    return origins.find((origin) => origin.origin_id === originId);
  };

  const findColor = (colorId: string) => {
    return colors.find((color) => color.color_id === colorId);
  };

  const handleVariantClick = (variantIndex: number) => {
    setPrice(variants[variantIndex].variant.price);
    setVariantIndex(variantIndex);
  };

  const fetchColor = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/colors`)
      .then((res) => {
        console.log(res.data.colors);
        setColors(res.data.colors);
      });
  };

  const fetchOrigin = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/origins`)
      .then((res) => {
        console.log(res.data.origins);
        setOrigins(res.data.origins);
      });
  };

  const fetchCellphone = async () => {
    if (cellphoneId) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/cellphone/detail/${cellphoneId.cellphone_id}`
        )
        .then((res) => {
          console.log(res.data.cellphone);
          setCellphoneDetails(res.data.cellphone);
          if (res.data.cellphone.price) {
            setPrice(res.data.cellphone.price);
          } else {
            setPrice(0);
          }
        });
    }
  };

  const fetchingVariants = async () => {
    if (cellphoneId) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/cellphone/detail/${cellphoneId.cellphone_id}/variant`
        )
        .then((res) => {
          console.log(res.data);
          setVariants(res.data.variantList);
        });
    }
  };

  useEffect(() => {
    fetchCellphone();
    fetchingVariants();
    fetchColor();
    fetchOrigin();
  }, []);

  return (
    <div className="px-[16%] py-[64px]">
      <div className="grid grid-cols-2 gap-[94px] mb-[64px]">
        <div className="w-full">
          {/* {cellphoneDetails?.feature_img_src?.length > 0 ? (
            <img className="h-full" src={`http://${productImageUrl}`} alt="" />
          ) : (
            <div className="w-full h-[500px] bg-red-500"></div>
          )} */}
        </div>
        <div className="w-ful flex flex-col justify-between">
          <div>
            <div className="mb-[20px] flex flex-col gap-[10px]">
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {cellphoneDetails.product_name}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {price.toLocaleString() + "đ"}
              </Typography>
            </div>
            <Divider />
            <div className="flex flex-col gap-[10px]">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Mô tả sản phẩm
              </Typography>
              <Typography variant="body1">
                {cellphoneDetails.description}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="grid grid-cols-3 gap-[10px]">
              {variants?.map((data, index) => (
                <div
                  key={data.variant._id}
                  style={{
                    backgroundColor: index === variantIndex ? "black" : "white",
                    color: index === variantIndex ? "white" : "black",
                  }}
                  className="border-2 border-black p-2 rounded-md hover:cursor-pointer hover:bg-black hover:text-white duration-300"
                  onClick={() => handleVariantClick(index)}
                >
                  <div>
                    <Typography variant="body1">
                      {`${data.field.storage.rom} - ${data.field.ram_storage}`}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "30px",
                  padding: "10px 20px",
                  width: "100%",
                  "&:disabled": {
                    color: "white",
                  },
                }}
                disabled={variants?.length === 0}
              >
                {variants.length === 0 ? "Liên hệ sau" : "Thêm vào giỏ hàng"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-2 gap-[10px] mt-[40px]">
        <div>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Mô tả sản phẩm
          </Typography>
          <Typography variant="body1">
            {cellphoneDetails.description}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Thông số kỹ thuật
          </Typography>
          {variants.length > 0 ? (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Độ phân giải</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.screen?.resolution.width} x{" "}
                    {variants[variantIndex].field?.screen?.resolution.height}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CPU</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.cpu?.name}{" "}
                    {variants[variantIndex].field?.cpu?.version}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Các loại kết nối</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex gap-[10px]">
                        <Typography variant="body1">Số khe sim</Typography>
                        <Typography variant="body1">
                          {" "}
                          {variants[variantIndex].field?.connectors?.sim?.slots}
                        </Typography>
                      </div>
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex gap-[10px]">
                          <Typography variant="body1">WiFi</Typography>
                          <Typography variant="body1">
                            {variants[variantIndex].field?.connectors?.wifi}
                          </Typography>
                        </div>
                        <div className="flex gap-[10px]">
                          <Typography variant="body1">Bluetooth</Typography>
                          <Typography variant="body1">
                            {
                              variants[variantIndex].field?.connectors
                                ?.bluetooth
                            }
                          </Typography>
                        </div>
                        <div className="flex gap-[10px]">
                          <Typography variant="body1">Internet</Typography>
                          <Typography variant="body1">
                            {variants[variantIndex].field?.connectors?.internet}
                          </Typography>
                        </div>
                        <div className="flex gap-[10px]">
                          <Typography variant="body1">GPS Support</Typography>
                          <Typography variant="body1">
                            {variants[
                              variantIndex
                            ].field?.connectors?.gps_support.join(", ")}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bộ nhớ</TableCell>
                  <TableCell>
                    {`${variants[variantIndex].field?.storage?.rom}`}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Camera</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.camera?.back_camera.join(
                      ", "
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pin nguồn</TableCell>
                  <TableCell>
                    <div>
                      <Typography variant="body1">
                        {variants[variantIndex].field?.power?.capability} mAh
                      </Typography>
                      <Typography variant="body1">
                        Sạc: {variants[variantIndex].field?.power?.charger}
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Năm sản xuất</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.mfg_year}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Xuất xứ</TableCell>
                  <TableCell>
                    {
                      findOrigin(variants[variantIndex].field?.origin_id)
                        ?.country
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Màu sắc</TableCell>
                  <TableCell>
                    {findColor(variants[variantIndex].field?.color_id)?.color}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tiêu chuẩn chống nước</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.water_resist}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Trọng lượng</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.weight} kg
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Chất liệu</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.material}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <div>
              <Typography>Chưa có thông tin sản phẩm</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LaptopDetail;
