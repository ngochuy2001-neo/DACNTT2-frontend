"use client";
import React, { useState } from "react";
import Image from "next/image";
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
} from "@mui/material";
import {
  KeyboardArrowDown,
  FavoriteBorder,
  ShoppingCart,
} from "@mui/icons-material";

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  brand: string;
  cpu: {
    brand: string;
    series: string;
  };
  ram: {
    size: number;
    type: string;
  };
  storage: {
    type: string;
    capacity: number;
  };
  screen: {
    size: number;
    type: string;
  };
}

const productData: Product[] = [
  {
    id: "1",
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Laptop ASUS Vivobook Go 14 E1404FA-NK177W",
    price: 23990000,
    originalPrice: 27990000,
    rating: 4.5,
    reviews: 123,
    brand: "ASUS",
    cpu: {
      brand: "Intel",
      series: "Core i5",
    },
    ram: {
      size: 16,
      type: "DDR5",
    },
    storage: {
      type: "SSD",
      capacity: 512,
    },
    screen: {
      size: 14,
      type: "OLED",
    },
  },
  {
    id: "2",
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Laptop ASUS Vivobook Go 14 E1404FA-NK177W",
    price: 23990000,
    originalPrice: 27990000,
    rating: 4.5,
    reviews: 123,
    brand: "ASUS",
    cpu: {
      brand: "Intel",
      series: "Core i5",
    },
    ram: {
      size: 16,
      type: "DDR5",
    },
    storage: {
      type: "SSD",
      capacity: 512,
    },
    screen: {
      size: 14,
      type: "OLED",
    },
  },
  {
    id: "3",
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Laptop ASUS Vivobook Go 14 E1404FA-NK177W",
    price: 23990000,
    originalPrice: 27990000,
    rating: 4.5,
    reviews: 123,
    brand: "ASUS",
    cpu: {
      brand: "Intel",
      series: "Core i5",
    },
    ram: {
      size: 16,
      type: "DDR5",
    },
    storage: {
      type: "SSD",
      capacity: 512,
    },
    screen: {
      size: 14,
      type: "OLED",
    },
  },
  {
    id: "4",
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Laptop ASUS Vivobook Go 14 E1404FA-NK177W",
    price: 23990000,
    originalPrice: 27990000,
    rating: 4.5,
    reviews: 123,
    brand: "ASUS",
    cpu: {
      brand: "Intel",
      series: "Core i5",
    },
    ram: {
      size: 16,
      type: "DDR5",
    },
    storage: {
      type: "SSD",
      capacity: 512,
    },
    screen: {
      size: 14,
      type: "OLED",
    },
  },
  {
    id: "5",
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Laptop ASUS Vivobook Go 14 E1404FA-NK177W",
    price: 23990000,
    originalPrice: 27990000,
    rating: 4.5,
    reviews: 123,
    brand: "ASUS",
    cpu: {
      brand: "Intel",
      series: "Core i5",
    },
    ram: {
      size: 16,
      type: "DDR5",
    },
    storage: {
      type: "SSD",
      capacity: 512,
    },
    screen: {
      size: 14,
      type: "OLED",
    },
  },
];

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
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000000]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

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
            {productData.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
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
                        paddingTop: "100%",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
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
                    {product.originalPrice && (
                      <Chip
                        label={`-${Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}%`}
                        color="error"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                        }}
                      />
                    )}
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
                      {product.name}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      <Rating
                        value={product.rating}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({product.reviews})
                      </Typography>
                    </Stack>

                    <Typography variant="h6" color="error" sx={{ mt: 1 }}>
                      {product.price.toLocaleString()}₫
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                      >
                        {product.originalPrice.toLocaleString()}₫
                      </Typography>
                    )}

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
