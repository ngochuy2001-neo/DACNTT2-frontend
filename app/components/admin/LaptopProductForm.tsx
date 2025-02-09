import { Button, TextField, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

function LaptopProductForm({
  fetchProducts,
  handleCloseModal,
  editMode,
  productId,
}: {
  fetchProducts: () => void;
  handleCloseModal: () => void;
  editMode?: boolean;
  productId?: string;
}) {
  const [newLaptop, setNewLaptop] = useState({
    brandId: "",
    productName: "",
    productDescription: "",
    cpuBrand: "",
    price: 0,
    vgaBrand: "",
    productSize: "",
    featureImgSrc: "On Development",
  });

  const [productImages, setProductImages] = useState<File>();

  const [brands, setBrands] = useState<
    { brand_id: string; brand_name: string }[]
  >([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImages(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/brands`
        );
        setBrands(response.data.brands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setNewLaptop((prev) => ({ ...prev, [name]: value as string }));
  };

  const handleEditLaptop = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop/update/${productId}`,
        { ...newLaptop }
      );
      if (response.data.success) {
        fetchProducts();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error editing laptop:", error);
    }
  };

  const handleAddLaptop = async () => {
    let productId;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop/add`,
        { ...newLaptop }
      );
      if (response.data.success) {
        const formData = new FormData();
        formData.append("file", productImages as Blob);
        try {
          console.log(productImages);

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/uploads/upload/${productId}`,
            formData
          );

          if (response.data.success) {
            fetchProducts();
            handleCloseModal();
          }
        } catch (error) {
          console.error("Error adding laptop:", error);
        }
      }
    } catch (error) {
      console.error("Error adding laptop:", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      const fetchProductDetail = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop/detail/${productId}`
          );
          setNewLaptop({
            brandId: response.data.laptop.brand_id,
            productName: response.data.laptop.product_name,
            productDescription: response.data.laptop.description,
            price: response.data.laptop.price,
            cpuBrand: response.data.laptop.cpu_brand,
            vgaBrand: response.data.laptop.vga_brand,
            productSize: response.data.laptop.size,
            featureImgSrc: response.data.laptop.feature_img_src,
          });
        } catch (error) {
          console.error("Error fetching product detail:", error);
        }
      };
      fetchProductDetail();
    }
  }, [editMode, productId]);

  return (
    <div className="bg-white rounded-md w-[60vw] max-h-[80vh] p-4 flex flex-col gap-[15px]">
      <h2 className="text-xl font-bold">Thêm Laptop Mới</h2>
      <div className="grid grid-cols-2 gap-[15px]">
        <TextField
          select
          label="Thương Hiệu"
          name="brandId"
          value={newLaptop.brandId}
          onChange={handleInputChange}
          fullWidth
          defaultValue={newLaptop.brandId}
          variant="standard"
          sx={{ pt: 0, pb: 0 }}
        >
          {brands.map((brand) => (
            <MenuItem key={brand.brand_id} value={brand.brand_id}>
              {brand.brand_name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Tên Sản Phẩm"
          name="productName"
          value={newLaptop.productName}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          sx={{ pt: 0, pb: 0 }}
        />
        <TextField
          label="Mô Tả"
          name="productDescription"
          value={newLaptop.productDescription}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          sx={{ pt: 0, pb: 0 }}
        />
        <TextField
          label="Giá cơ bản"
          name="price"
          value={newLaptop.price}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          sx={{ pt: 0, pb: 0 }}
        />
        <TextField
          select
          label="Thương Hiệu CPU"
          name="cpuBrand"
          value={newLaptop.cpuBrand}
          defaultValue={newLaptop.cpuBrand}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          sx={{ pt: 0, pb: 0 }}
        >
          {["Intel", "AMD", "Apple"].map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Thương Hiệu VGA"
          name="vgaBrand"
          value={newLaptop.vgaBrand}
          onChange={handleInputChange}
          defaultValue={newLaptop.vgaBrand}
          fullWidth
          variant="standard"
          sx={{ pt: 0, pb: 0 }}
        >
          {["NVIDIA", "AMD"].map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Kích Thước"
          name="productSize"
          value={newLaptop.productSize}
          onChange={handleInputChange}
          fullWidth
          type="number"
          variant="standard"
          sx={{ pt: 0, pb: 0 }}
        />
        {!editMode && (
          <TextField
            type="file"
            fullWidth
            variant="standard"
            sx={{ pt: 0, pb: 0 }}
            onChange={handleImageChange}
          />
        )}
      </div>
      <div className="flex justify-end gap-[15px]">
        <Button
          sx={{ width: "fit-content" }}
          variant="contained"
          color="error"
          onClick={() => handleCloseModal()}
        >
          Hủy bỏ
        </Button>
        {editMode ? (
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            color="primary"
            onClick={handleEditLaptop}
          >
            Chỉnh sửa
          </Button>
        ) : (
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            color="primary"
            onClick={handleAddLaptop}
          >
            Thêm Laptop
          </Button>
        )}
      </div>
    </div>
  );
}

export default LaptopProductForm;
