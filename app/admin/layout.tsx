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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import {
  ExpandMore,
  Laptop,
  PointOfSale,
  Smartphone,
  Style,
  Tag,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axios from "axios";

const userMenuList = [
  { name: "Thông tin người dùng", url: "/admin/user" },
  { name: "Quản lý địa chỉ", url: "/admin/addresses" },
  { name: "Quản lý đơn hàng", url: "/user/orders" },
];

const adminMenuList = [
  { name: "Quản lý thương hiệu", url: "/admin/brand" },
  { name: "Quản lý phân loại", url: "/admin/category" },
  { name: "Quản lý phương thức thanh toán", url: "/admin/paymentmethod" },
  { name: "Quản lý thiết bị ", url: "/admin/product" },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const drawerWidth = 300;
  const router = useRouter();

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const checkUserRole = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/users/login/check`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        const userRole = response.data.user.role;
        if (userRole !== "Admin") {
          router.push("/");
        }
      } else {
        router.push("/login");
        console.error(
          "Không thể lấy thông tin người dùng:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  // Gọi hàm checkUserRole khi component được mount
  React.useEffect(() => {
    checkUserRole();
  }, []);

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
            <Accordion
              expanded={expanded === "userPanel"}
              onChange={handleChange("userPanel")}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="userPanel-content"
                id="userPanel-header"
              >
                <Typography variant="h6">Quản lý người dùng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {userMenuList.map((item, index) => (
                    <ListItem
                      sx={{ ":hover": { cursor: "pointer" } }}
                      component="button"
                      key={index}
                      onClick={() => router.push(item.url)}
                    >
                      <ListItemText
                        sx={{ ":hover": { cursor: "pointer" } }}
                        primary={item.name}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "adminPanel"}
              onChange={handleChange("adminPanel")}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="adminPanel-content"
                id="adminPanel-header"
              >
                <Typography variant="h6">Quản lý sản phẩm</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {adminMenuList.map((item, index) => (
                    <ListItem
                      sx={{ ":hover": { cursor: "pointer" } }}
                      component="button"
                      key={index}
                      onClick={() => router.push(item.url)}
                    >
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
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
            overflow: "scroll",
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
