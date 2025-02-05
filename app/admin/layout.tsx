"use client";
import React, { useState } from "react";
import AdminHeader from "../components/admin/AdminHeader";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  Laptop,
  PointOfSale,
  Smartphone,
  Style,
  Tag,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const submenuData = [
  {
    menuIcon: <Style />,
    name: "Quản lý thương hiệu",
    url: "/admin/brand",
  },
  {
    menuIcon: <Tag />,
    name: "Quản lý phân loại",
    url: "/admin/category",
  },
  {
    menuIcon: <PointOfSale />,
    name: "Quản lý phương thức thanh toán",
    url: "/admin/paymentmethod",
  },
  {
    menuIcon: <Laptop />,
    name: "Quản lý thiết bị laptop",
    url: "/admin/laptop",
  },
  {
    menuIcon: <Smartphone />,
    name: "Quản lý thiết bị di động",
    url: "/admin/laptop",
  },
];

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const drawerWidth = 300;
  const router = useRouter();

  return (
    <div>
      <AdminHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="pt-[78px]">
        <Drawer
          open={isMenuOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: "78px",
            },
          }}
          variant="persistent"
          anchor="left"
        >
          <List>
            {submenuData.map((data, index) => (
              <ListItem
                key={index}
                sx={{ padding: "0px", borderBottom: "1px solid #c7c7c7" }}
              >
                <Button
                  onClick={() => router.push(data.url)}
                  sx={{ width: "100%", color: "black" }}
                >
                  <ListItemIcon>{data.menuIcon}</ListItemIcon>
                  <ListItemText>{data.name}</ListItemText>
                </Button>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            width: isMenuOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
            height: "calc(100vh - 78px)",
            marginLeft: isMenuOpen ? `${drawerWidth}px` : "0px",
            transition: theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            padding: "20px",
          }}
        >
          {children}
        </Box>
      </div>
    </div>
  );
}

export default AdminLayout;
