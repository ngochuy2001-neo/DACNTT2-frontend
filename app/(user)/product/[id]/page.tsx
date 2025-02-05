"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function ProductDetailPage() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    "/images/laptop-1.jpg",
    "/images/laptop-2.jpg",
    "/images/laptop-3.jpg",
  ];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 3 }}>
      <Grid container spacing={3}>
        {/* Phần hình ảnh */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ padding: 2 }}>
            <Box sx={{ position: "relative", height: 400, marginBottom: 2 }}>
              <Image
                src={images[selectedImage]}
                alt="Product"
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
              {images.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 80,
                    height: 80,
                    position: "relative",
                    cursor: "pointer",
                    border:
                      selectedImage === index ? "2px solid #1976d2" : "none",
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Phần thông tin */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Laptop Gaming MSI Katana 15 B13VEK 1205VN
          </Typography>
          <Typography variant="h5" color="error" gutterBottom>
            27.990.000₫
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            CPU: Intel Core i5-13420H
          </Typography>
          <Typography variant="body1" paragraph>
            RAM: 16GB
          </Typography>
          <Typography variant="body1" paragraph>
            Ổ cứng: 512GB SSD
          </Typography>
          <Typography variant="body1" paragraph>
            Card đồ họa: NVIDIA GeForce RTX 4050 6GB
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ marginRight: 2 }}
            >
              Mua ngay
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Thêm vào giỏ hàng
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Tabs thông tin chi tiết */}
      <Box sx={{ width: "100%", mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Mô tả" />
            <Tab label="Thông số kỹ thuật" />
            <Tab label="Đánh giá" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1">
            Laptop Gaming MSI Katana 15 B13VEK 1205VN là một trong những laptop
            gaming tầm trung mới nhất từ MSI, sở hữu thiết kế gaming đặc trưng
            cùng hiệu năng mạnh mẽ từ CPU Intel Core i5 thế hệ 13 và GPU NVIDIA
            RTX 4050.
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="body1" fontWeight="bold">
                CPU
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body1">Intel Core i5-13420H</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" fontWeight="bold">
                RAM
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body1">16GB DDR5</Typography>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1">Chưa có đánh giá nào.</Typography>
        </TabPanel>
      </Box>
    </Box>
  );
}

export default ProductDetailPage;
