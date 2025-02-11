/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function LaptopDetail() {
  const laptopId = useParams();

  const [price, setPrice] = useState(0);
  const [variantIndex, setVariantIndex] = useState(0);
  const [productImageUrl, setProductImageUrl] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [laptopDetails, setLaptopDetails] = useState({
    _id: "",
    product_id: "",
    brand_id: "",
    product_name: "",
    description: "",
    cpu_brand: "",
    vga_brand: "",
    size: 0,
    feature_img_src: "",
    category_id: "",
    price: 0,
    createdAt: "",
    updatedAt: "",
    __v: 0,
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
        whd_size: {
          width: 0,
          height: 0,
          depth: 0,
        },
        cpu: {
          brand: "",
          name: "",
          model: "",
        },
        vga: {
          brand: "",
          name: "",
          model: "",
        },
        ram: {
          ram_type: "",
          storage: "",
          slots: 0,
        },
        drive: {
          drive_type: "",
          model: "",
          storage: "",
          slots: 0,
        },
        screen: {
          resolution: {
            width: 0,
            height: 0,
          },
          size: 0,
          screen_type: "",
          ratio: "",
        },
        port: {
          wifi: "false",
          bluetooth: "false",
          webcam: "false",
        },
        os: {
          name: "",
          version: "",
        },
        power: {
          capability: "",
          supply: "",
        },
        _id: "",
        variant_field_id: "",
        variant_id: "",
        part_number: "",
        mfg_year: 0,
        origin_id: "",
        weight: 0,
        color_id: "",
        material: "",
        max_ram_up: "",
        max_drive_up: "",
        gears: [
          {
            name: "",
            _id: "",
          },
        ],
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

  const handleAddToCart = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/cart/add/${variants[variantIndex].variant.variant_id}`,
        {
          variant_id: variants[variantIndex].variant.variant_id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

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

  const fetchLaptop = async () => {
    if (laptopId) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop/detail/${laptopId.laptop_id}`
        )
        .then((res) => {
          console.log(res.data.laptop);
          setLaptopDetails(res.data.laptop);
          setProductImageUrl(res.data.laptop.feature_img_src);
          if (res.data.laptop.price) {
            setPrice(res.data.laptop.price);
          } else {
            setPrice(0);
          }
        });
    }
  };

  const fetchingVariants = async () => {
    if (laptopId) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop/detail/${laptopId.laptop_id}/variant`
        )
        .then((res) => {
          console.log(res.data.variantsList);
          setVariants(res.data.variantsList);
        });
    }
  };

  useEffect(() => {
    fetchLaptop();
    fetchingVariants();
    fetchColor();
    fetchOrigin();
  }, []);

  return (
    <div className="px-[16%] py-[64px]">
      <div className="grid grid-cols-2 gap-[94px] mb-[64px]">
        <div className="w-full flex items-center justify-center">
          {laptopDetails.feature_img_src?.length > 0 ? (
            <img className="h-full" src={`http://${productImageUrl}`} alt="" />
          ) : (
            <div className="w-full h-[500px] bg-red-500"></div>
          )}
        </div>
        <div className="w-ful flex flex-col justify-between">
          <div>
            <div className="mb-[20px] flex flex-col gap-[10px]">
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {laptopDetails.product_name}
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
                {laptopDetails.description}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="grid grid-cols-3 gap-[10px]">
              {variants.map((data, index) => (
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
                      {`Core ${data.field.cpu.model} ${data.field.cpu.name}`}
                    </Typography>
                    <Typography variant="body1">
                      {` ${data.field.vga.model} ${data.field.vga.name}`}
                    </Typography>
                    <Typography variant="body1">
                      {`RAM ${data.field.ram.storage}`}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center">
                <Button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  variant="outlined"
                  sx={{
                    marginRight: "10px",
                    borderRadius: "100%",
                    minWidth: "30px",
                    minHeight: "30px",
                  }}
                >
                  -
                </Button>
                <TextField
                  variant="outlined"
                  type="number"
                  value={quantity}
                  size="small"
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  sx={{ width: "60px", textAlign: "center" }}
                />
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  variant="outlined"
                  sx={{
                    marginLeft: "10px",
                    borderRadius: "30%",
                    minWidth: "30px",
                  }}
                >
                  +
                </Button>
              </div>
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
                onClick={handleAddToCart}
                disabled={variants.length === 0}
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
          <Typography variant="body1">{laptopDetails.description}</Typography>
        </div>
        <div>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Thông số kỹ thuật
          </Typography>
          {variants.length > 0 ? (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Kích thước</TableCell>
                  <TableCell>
                    {variants[variantIndex]?.field?.whd_size?.width} x{" "}
                    {variants[variantIndex].field?.whd_size?.height} x{" "}
                    {variants[variantIndex].field?.whd_size?.depth}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CPU</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.cpu?.brand}{" "}
                    {variants[variantIndex].field?.cpu?.model}{" "}
                    {variants[variantIndex].field?.cpu?.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>VGA</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.vga?.brand}{" "}
                    {variants[variantIndex].field?.vga?.model}{" "}
                    {variants[variantIndex].field?.vga?.name}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>RAM</TableCell>
                  <TableCell>
                    {`${variants[variantIndex].field?.ram?.storage} GB`} (
                    {variants[variantIndex].field?.ram?.ram_type.toUpperCase()})
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Ổ cứng</TableCell>
                  <TableCell>
                    {`${variants[variantIndex].field?.drive?.storage} GB`} (
                    {variants[
                      variantIndex
                    ].field?.drive?.drive_type.toUpperCase()}
                    )
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Màn hình</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.screen?.size} inch,{" "}
                    {variants[variantIndex].field?.screen?.resolution?.width} x{" "}
                    {variants[variantIndex].field?.screen?.resolution?.height}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Hệ điều hành</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.os?.name}{" "}
                    {variants[variantIndex].field?.os?.version}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Pin</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.power?.capability} mAh
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Khả năng kết nối</TableCell>
                  <TableCell>
                    <div>
                      <Typography variant="body1">
                        Wifi:{" "}
                        {variants[variantIndex].field?.port?.wifi
                          ? "Có"
                          : "Không"}
                      </Typography>
                      <Typography variant="body1">
                        Bluetooth:{" "}
                        {variants[variantIndex].field?.port?.bluetooth
                          ? "Có"
                          : "Không"}
                      </Typography>
                      <Typography variant="body1">
                        Webcam:{" "}
                        {variants[variantIndex].field?.port?.webcam
                          ? "Có"
                          : "Không"}
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nguồn điện</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.power?.supply}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Trọng lượng</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.weight} kg
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Màu sắc</TableCell>
                  <TableCell>
                    {findColor(variants[variantIndex].field?.color_id)?.color}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Vật liệu</TableCell>
                  <TableCell>
                    {variants[variantIndex].field?.material}
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
                  <TableCell>Khả năng nâng cấp</TableCell>
                  <TableCell>
                    <div>
                      <Typography variant="body1">
                        RAM: {variants[variantIndex].field?.max_ram_up}
                      </Typography>
                      <Typography variant="body1">
                        Ổ cứng: {variants[variantIndex].field?.max_drive_up}
                      </Typography>
                    </div>
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
