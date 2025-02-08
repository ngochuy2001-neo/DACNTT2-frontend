/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LaptopProductForm from "@/app/components/admin/LaptopProductForm";
import ProductDetail from "../../components/admin/ProductDetail";
import CATEGORY from "@/app/utils/constant";
import { LaptopVariant, Product } from "@/app/utils/interface";
import { ArrowBack, Laptop, Smartphone } from "@mui/icons-material";
import { Button, ButtonGroup, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [detailMode, setDetailMode] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [categoryId, setCategoryId] = useState<"LT" | "CP">("LT");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop/delete/${productId}`
      );
      if (response.data.success) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleViewDetails = (productId: string, category_id: "LT" | "CP") => {
    setSelectedProductId(productId);
    setCategoryId(category_id);
    setDetailMode(true);
  };

  const handleBack = () => {
    setDetailMode(false);
    setSelectedProductId(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {detailMode ? (
        <div>
          <div className="flex justify-between mb-[20px]">
            <h2 className="text-2xl font-bold">
              Chi tiết sản phẩm ID: {selectedProductId}
            </h2>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={handleBack}
            >
              Quay lại
            </Button>
          </div>
          <div>
            <ProductDetail
              selectedProductId={selectedProductId}
              category_id={CATEGORY[categoryId]}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-2xl font-bold">Quản lý sản phẩm</p>
            <ButtonGroup variant="contained" color="primary">
              <Button
                startIcon={<Laptop />}
                variant="outlined"
                onClick={handleOpenModal}
              >
                Thêm Laptop
              </Button>
              <Button startIcon={<Smartphone />} variant="outlined">
                Thêm Điện Thoại
              </Button>
            </ButtonGroup>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {products.map((data, index) => (
              <div key={index} className="bg-white p-4 rounded-md">
                <div>
                  <h2 className="text-2xl font-bold">{data.product_name}</h2>
                  <p>
                    <strong>Brand ID:</strong> {data.brand_id}
                  </p>

                  <p>
                    <strong>Description:</strong> {data.description}
                  </p>
                  <p>
                    <strong>CPU Brand:</strong> {data.cpu_brand}
                  </p>
                  <p>
                    <strong>VGA Brand:</strong> {data.vga_brand}
                  </p>
                  <p>
                    <strong>Size:</strong> {data.size}
                  </p>
                  <p>
                    <strong>Feature Image Source:</strong>{" "}
                    {data.feature_img_src}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleViewDetails(data.product_id, data.category_id)
                    }
                  >
                    Xem Chi Tiết
                  </Button>
                  <Button
                    onClick={() => handleDeleteProduct(data.product_id)}
                    variant="outlined"
                    color="error"
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={openModal}
        onClose={handleCloseModal}
      >
        <LaptopProductForm
          fetchProducts={fetchProducts}
          handleCloseModal={handleCloseModal}
          editMode={false}
        />
      </Modal>
    </div>
  );
}

export default ProductPage;
