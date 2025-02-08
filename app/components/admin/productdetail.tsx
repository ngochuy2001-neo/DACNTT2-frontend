/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Laptop, Cellphone, LaptopVariant } from "@/app/utils/interface";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import LaptopVariantForm from "./LaptopVariantForm";
import LaptopProductForm from "./LaptopProductForm";

function ProductDetail({
  selectedProductId,
  category_id,
}: {
  selectedProductId: string;
}) {
  const [productDetail, setProductDetail] = useState<Laptop | Cellphone | null>(
    null
  );

  const [productVariants, setProductVariants] = useState<LaptopVariant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVariant, setNewVariant] = useState({
    variant_name: "",
    sku: "",
    price: 0,
    promotion_id: "",
    stock: 0,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    fetchProductDetail();
  };

  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/${category_id}/detail/${selectedProductId}`
      );
      console.log(response.data);
      if (category_id === "laptop") {
        setProductDetail(response.data.laptop);
      } else {
        setProductDetail(response.data.cellphone);
      }
    } catch (error) {
      console.error("Error fetching product detail:", error);
      return null;
    }
  };

  const fetchProductVariants = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/${category_id}/detail/${selectedProductId}/variant`
      );
      console.log(response.data);
      if (category_id === "laptop") {
        setProductVariants(response.data.variantsList);
      } else {
        setProductVariants(response.data.variantsList);
      }
    } catch (error) {
      console.error("Error fetching product variants:", error);
      return [];
    }
  };

  const handleAddVariant = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/${category_id}/detail/${selectedProductId}/variant`,
        newVariant
      );
      setProductVariants((prev) => [...prev, response.data.variant]);
      handleCloseModal();
    } catch (error) {
      console.error("Error adding variant:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewVariant({
      variant_name: "",
      sku: "",
      price: 0,
      promotion_id: "",
      stock: 0,
    });
  };
  const handleDeleteVariant = async (variantId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop/detail/${selectedProductId}/variant/delete/${variantId}`
      );
      console.log("Xóa variant thành công");
      fetchProductVariants();
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa variant:", error);
    }
  };

  useEffect(() => {
    console.log(category_id);
    fetchProductDetail();
    fetchProductVariants();
  }, []);

  return (
    <div>
      {category_id === "laptop" && productDetail ? (
        <div className="flex flex-col gap-[20px]">
          <div className="bg-white rounded-md p-4 ">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold mb-[10px]">
                {productDetail.product_name}
              </h1>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Chỉnh sửa
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[20px]">
              <p>
                <strong>Mô tả:</strong> {productDetail.description}
              </p>
              <p>
                <strong>Thương hiệu CPU:</strong> {productDetail.cpu_brand}
              </p>
              <p>
                <strong>Kích thước:</strong> {productDetail.size} inch
              </p>
              <p>
                <strong>Thương hiệu VGA:</strong> {productDetail.vga_brand}
              </p>
              <p>
                <strong>Hình ảnh đặc trưng:</strong>{" "}
                {productDetail.feature_img_src}
              </p>
              <p>
                <strong>Ngày tạo:</strong> {productDetail.createdAt}
              </p>
              <p>
                <strong>Ngày cập nhật:</strong> {productDetail.updatedAt}
              </p>
              <p>
                <strong>Version:</strong> {productDetail.__v}
              </p>
            </div>
          </div>
          <Modal
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            open={isEditModalOpen}
            onClose={handleCloseEditModal}
          >
            <LaptopProductForm
              fetchProducts={fetchProductDetail}
              handleCloseModal={handleCloseEditModal}
              editMode={true}
              productId={selectedProductId}
            />
          </Modal>
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Các Variant</h2>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
              >
                Thêm Variant Mới
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-[20px]">
            {productVariants.map((data, index) => (
              <div key={index} className="bg-white rounded-md p-4 h-fit">
                <div>Variant ID: {data.variant.variant_id}</div>
                <div>Variant Name: {data.variant.variant_name}</div>
                <div>SKU: {data.variant.sku}</div>
                <div>Price: {data.variant.price}</div>
                <div>Promotion ID: {data.variant.promotion_id}</div>
                <div>Stock: {data.variant.stock}</div>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>Thông tin biến thể Laptop</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {data.field && (
                      <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                          <tr>
                            <th className="border border-gray-300 p-2">
                              Tên trường
                            </th>
                            <th className="border border-gray-300 p-2">
                              Giá trị
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Kích thước
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.whd_size.width} x{" "}
                              {data.field.whd_size.height} x{" "}
                              {data.field.whd_size.depth} cm
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">CPU</td>
                            <td className="border border-gray-300 p-2">
                              {data.field.cpu?.brand} - {data.field.cpu?.name} (
                              {data.field.cpu?.model})
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">VGA</td>
                            <td className="border border-gray-300 p-2">
                              {data.field.vga?.brand} - {data.field.vga?.name} (
                              {data.field.vga?.model})
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">RAM</td>
                            <td className="border border-gray-300 p-2">
                              {data.field.ram.storage} ({data.field.ram.slots}{" "}
                              slots)
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Mã linh kiện
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.part_number}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Dung lượng RAM tối đa
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.max_ram_up}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Dung lượng ổ cứng tối đa
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.max_drive_up}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Màn hình
                            </td>
                            <td className="border border-gray-300 p-2">
                              <ul>
                                <li>
                                  Kích thước: {data.field.screen.size} inch
                                </li>
                                <li>
                                  Độ phân giải:{" "}
                                  {data.field.screen.resolution.width} x{" "}
                                  {data.field.screen.resolution.height}
                                </li>
                                <li>Tỉ lệ: {data.field.screen.ratio}</li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Ổ cứng sẵn có
                            </td>
                            <td className="border border-gray-300 p-2">
                              <li>{data.field.drive.model}</li>
                              <li>
                                {data.field.drive.storage} (
                                {data.field.drive.slots} slots)
                              </li>
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Trọng lượng
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.weight} kg
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Màu sắc
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.color_id}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Chất liệu
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.material}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Kết nối
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.port.wifi ? "Có" : "Không"} -{" "}
                              {data.field.port.bluetooth ? "Có" : "Không"} -{" "}
                              {data.field.port.webcam ? "Có" : "Không"}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Hệ điều hành
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.os.name} - {data.field.os.version}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Công suất
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.power.capability} -{" "}
                              {data.field.power.supply}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Phụ kiện
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.gears.map((gear, index) => (
                                <li key={index}>{gear.name}</li>
                              ))}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Năm sản xuất
                            </td>
                            <td className="border border-gray-300 p-2">
                              {data.field.mfg_year}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </AccordionDetails>
                </Accordion>
                <div className="flex gap-2 mt-2">
                  <Button variant="outlined" color="primary">
                    Chỉnh sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteVariant(data.variant.variant_id)}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
            <Modal
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              open={isModalOpen}
              onClose={handleCloseModal}
            >
              <div className="bg-white rounded-md p-4 max-h-[80vh] overflow-y-scroll">
                <LaptopVariantForm
                  closeModal={handleCloseModal}
                  productId={selectedProductId}
                />
              </div>
            </Modal>
          </div>
        </div>
      ) : category_id === "cellphone" && productDetail ? (
        <div>
          <h1>{productDetail.product_name}</h1>
          <p>{productDetail.description}</p>
          <p>OS: {productDetail.os}</p>
          <p>Size: {productDetail.size} inch</p>
          <div className="grid grid-cols-4">
            <div className="bg-white ">
              <ul>
                {productVariants?.map((data, index) => (
                  <li key={index}>
                    <div>Variant ID: {data.variant.variant_id}</div>
                    <div>Variant Name: {data.variant.variant_name}</div>
                    <div>SKU: {data.variant.sku}</div>
                    <div>Price: {data.variant.price}</div>
                    <div>Promotion ID: {data.variant.promotion_id}</div>
                    <div>Stock: {data.variant.stock}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ProductDetail;
