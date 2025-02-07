/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ArrowBack, Laptop, Smartphone } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Product = {
  _id: string;
  product_id: string;
  brand_id: string;
  product_name: string;
  description: string;
  cpu_brand: string;
  vga_brand: string;
  size: number;
  feature_img_src: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Variant = {
  variant: {
    _id: string;
    variant_id: string;
    product_id: string;
    variant_name: string;
    sku: string;
    price: number;
    promotion_id: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  field: {
    whd_size: {
      width: number;
      height: number;
      depth: number;
    };
    cpu: {
      brand: string;
      name: string;
      model: string;
    };
    vga: {
      brand: string;
      name: string;
      model: string;
    };
    ram: {
      storage: string;
      slots: number;
      gears: any[];
    };
    _id: string;
    variant_field_id: string;
    variant_id: string;
    part_number: string;
    mfg_year: number;
    origin_id: string;
    weight: number;
    color_id: string;
    material: string;
    max_ram_up: string;
    max_drive_up: string;
    drive: {
      model: string;
      storage: string;
      slots: number;
    };
    screen: {
      size: number;
      resolution: {
        width: number;
        height: number;
      };
      ratio: string;
    };
    port: {
      wifi: string;
      bluetooth: string;
      webcam: string;
    };
    os: {
      name: string;
      version: string;
    };
    power: {
      capability: string;
      supply: string;
    };
    gears: any[];
    __v: number;
  };
};

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [detailMode, setDetailMode] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);

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

  const handleViewDetails = (productId: string) => {
    setSelectedProductId(productId);
    setDetailMode(true);
  };

  const handleBack = () => {
    setDetailMode(false);
    setSelectedProductId(null);
  };

  const fetchProductDetail = async (productId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop/detail/${productId}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching product detail:", error);
      return null;
    }
  };

  const fetchProductVariants = async (productId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop/detail/${productId}/variant`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching product variants:", error);
      return [];
    }
  };
  useEffect(() => {
    if (selectedProductId) {
      fetchProductDetail(selectedProductId);
      fetchProductVariants(selectedProductId);
    }
  }, [selectedProductId]);

  return (
    <div>
      {detailMode ? (
        <div>
          <div className="flex justify-between">
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
          <div></div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-2xl font-bold">Quản lý sản phẩm</p>
            <ButtonGroup variant="contained" color="primary">
              <Button startIcon={<Laptop />} variant="outlined">
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
                    onClick={() => handleViewDetails(data.product_id)}
                  >
                    Xem Chi Tiết
                  </Button>
                  <Button variant="outlined" color="error">
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
