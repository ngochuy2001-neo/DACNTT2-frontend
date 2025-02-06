/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Box,
  Slider,
  Paper,
  Rating,
  Stack,
  Chip,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardArrowDown,
  FavoriteBorder,
  ShoppingCart,
} from "@mui/icons-material";

interface Product {
  _id: string;
  product_name: string;
  brand: {
    _id: string;
    name: string;
  };
  category: {
    _id: string;
    name: string;
  };
  description: string;
  images: Array<{
    url: string;
    public_id: string;
  }>;
  variants: Array<{
    _id: string;
    variant_name: string;
    price: number;
    images: Array<{
      url: string;
      public_id: string;
    }>;
  }>;
}

const filters = [
  {
    title: "Thương hiệu",
    type: "checkbox",
    options: ["ASUS", "Acer", "Dell", "HP", "Lenovo", "MSI"],
  },
  {
    title: "CPU",
    type: "checkbox",
    options: [
      "Intel Core i3",
      "Intel Core i5",
      "Intel Core i7",
      "Intel Core i9",
      "AMD Ryzen 5",
      "AMD Ryzen 7",
    ],
  },
  {
    title: "RAM",
    type: "checkbox",
    options: ["4GB", "8GB", "16GB", "32GB"],
  },
  {
    title: "Ổ cứng",
    type: "checkbox",
    options: ["SSD 256GB", "SSD 512GB", "SSD 1TB", "HDD 1TB"],
  },
  {
    title: "Màn hình",
    type: "checkbox",
    options: ["13.3 inch", "14 inch", "15.6 inch", "16 inch", "17.3 inch"],
  },
  {
    title: "Card đồ họa",
    type: "checkbox",
    options: [
      "NVIDIA RTX 3050",
      "NVIDIA RTX 4050",
      "NVIDIA RTX 4060",
      "AMD Radeon",
    ],
  },
];

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000000]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4200/api/laptop");
      if (response.data) {
        setProducts(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      // Hiển thị thông báo lỗi cho người dùng
      alert(error.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category]
        ? prev[category].includes(value)
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value]
        : [value],
    }));
  };

  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return "/images/placeholder.jpg";
    if (imageUrl.startsWith("http")) return imageUrl;
    return `http://localhost:4200${imageUrl}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="max-w-7xl mx-auto py-8 px-4">
      <Grid container spacing={4}>
        {/* Bộ lọc */}
        <Grid item xs={12} md={3}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Bộ lọc sản phẩm
            </Typography>

            {/* Khoảng giá */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                Khoảng giá
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={100000000}
                step={1000000}
                valueLabelFormat={(value) => `${value.toLocaleString()}₫`}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">
                  {priceRange[0].toLocaleString()}₫
                </Typography>
                <Typography variant="body2">
                  {priceRange[1].toLocaleString()}₫
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              {filters.map((filter, index) => (
                <Accordion
                  key={index}
                  elevation={0}
                  sx={{
                    "&:before": { display: "none" },
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <AccordionSummary expandIcon={<KeyboardArrowDown />}>
                    <Typography fontWeight="medium">{filter.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {filter.options.map((option, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          control={
                            <Checkbox
                              checked={
                                selectedFilters[filter.title]?.includes(
                                  option
                                ) || false
                              }
                              onChange={() =>
                                handleFilterChange(filter.title, option)
                              }
                              size="small"
                            />
                          }
                          label={option}
                        />
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            <Button variant="contained" fullWidth sx={{ mt: 3 }}>
              Áp dụng bộ lọc
            </Button>
          </Paper>
        </Grid>

        {/* Danh sách sản phẩm */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={getImageUrl(product.images[0]?.url)}
                        alt={product.product_name}
                        style={{ objectFit: "cover", height: "200px" }}
                      />
                    </Box>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "white",
                        "&:hover": { backgroundColor: "white" },
                      }}
                    >
                      <FavoriteBorder />
                    </IconButton>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.product_name}
                    </Typography>

                    <Typography variant="h6" color="error" sx={{ mt: 1 }}>
                      {product.variants[0]?.price.toLocaleString()}₫
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCart />}
                      >
                        Thêm vào giỏ
                      </Button>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductPage;
