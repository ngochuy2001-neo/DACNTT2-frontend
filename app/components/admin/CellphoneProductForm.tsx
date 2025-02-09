import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

function CellphoneProductForm({
  fetchProducts,
  handleCloseModal,
  editMode,
}: {
  fetchProducts: () => void;
  handleCloseModal: () => void;
  editMode: boolean;
}) {
  const [newCellphone, setNewCellphone] = useState({
    brandId: "",
    productName: "",
    productDescription: "",
    cpuBrand: "",
    os: "",
    size: 0,
    price: 0, // Thêm trường giá
    featureImgSrc: "On Development",
  });

  const [brands, setBrands] = useState<
    { brand_id: string; brand_name: string }[]
  >([]);

  const [cellphoneImageFile, setCellphoneImageFile] = useState<File>();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCellphone((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCellphoneImageFile(e.target.files[0]);
    }
  };

  const handleAddCellphone = async () => {
    let productId;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/cellphone/add`,
        { ...newCellphone, productSize: newCellphone.size }
      );
      if (response.data.success) {
        console.log(response.data);
        productId = response.data.cellphone.product_id;
        const formData = new FormData();
        formData.append("file", cellphoneImageFile as Blob);
        try {
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
        fetchProducts();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error adding cellphone:", error);
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

  return (
    <div className="bg-white rounded-md w-[60vw] max-h-[80vh] p-4 flex flex-col gap-[15px]">
      <h2 className="text-xl font-bold">Thêm Điện Thoại Mới</h2>
      <div className="grid grid-cols-2 gap-[15px]">
        <TextField
          select
          label="Thương Hiệu"
          name="brandId"
          value={newCellphone.brandId}
          onChange={handleInputChange}
          fullWidth
          defaultValue={newCellphone.brandId}
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
          value={newCellphone.productName}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
        />
        <TextField
          label="Mô Tả"
          name="productDescription"
          value={newCellphone.productDescription}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
        />
        <TextField
          select
          label="Thương Hiệu Chip"
          name="cpuBrand"
          value={newCellphone.cpuBrand}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
        >
          {["Snapdragon", "MediaTek", "Apple", "Exynos", "Kirin"].map(
            (brand) => (
              <MenuItem key={brand} value={brand}>
                {brand}
              </MenuItem>
            )
          )}
        </TextField>
        <TextField
          label="Giá"
          name="price"
          value={newCellphone.price === 0 ? "" : newCellphone.price}
          onChange={handleInputChange}
          fullWidth
          type="number"
          variant="standard"
        />
        <TextField
          select
          label="Hệ Điều Hành"
          name="os"
          value={newCellphone.os}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
        >
          {["Android", "iOS", "Windows Phone", "KaiOS"].map((os) => (
            <MenuItem key={os} value={os}>
              {os}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Kích Thước"
          name="size"
          value={newCellphone.size === 0 ? "" : newCellphone.size}
          onChange={handleInputChange}
          fullWidth
          type="number"
          variant="standard"
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
          onClick={handleCloseModal}
        >
          Hủy bỏ
        </Button>
        <Button
          sx={{ width: "fit-content" }}
          variant="contained"
          color="primary"
          onClick={handleAddCellphone}
        >
          Thêm Điện Thoại
        </Button>
      </div>
    </div>
  );
}

export default CellphoneProductForm;
