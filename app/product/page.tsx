"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const productData = [
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },

  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
  {
    image:
      "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    name: "Asus Vivo S 14 OLED (S5406)",
    price: "23.990.000",
  },
];

const filterExampleData = [
  {
    filterName: "Hãng sản xuất",
    selection: ["Vivo", "Asus", "Apple", "Lenovo"],
  },
  {
    filterName: "Hãng sản xuất",
    selection: ["Vivo", "Asus", "Apple", "Lenovo"],
  },
  {
    filterName: "Hãng sản xuất",
    selection: ["Vivo", "Asus", "Apple", "Lenovo"],
  },
  {
    filterName: "Hãng sản xuất",
    selection: ["Vivo", "Asus", "Apple", "Lenovo"],
  },
];

function ProductPage() {
  const router = useRouter();

  return (
    <div className="flex px-[200px] py-[50px] gap-[20px]">
      <div className="w-[20%] bg-white h-fit flex flex-col items-center">
        {filterExampleData.map((data, filterIndex) => (
          <Accordion key={filterIndex} className="w-full">
            <AccordionSummary
              expandIcon={<KeyboardArrowDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">{data.filterName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {data.selection.map((selectionData, selectionIndex) => (
                  <FormControlLabel
                    key={selectionIndex}
                    control={<Checkbox />}
                    label={selectionData}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
        <Button
          variant="contained"
          className="mt-[20px]"
          size="small"
          sx={{ marginTop: "20px", backgroundColor: "#a39302" }}
        >
          Áp dụng bộ lọc
        </Button>
      </div>
      <div className="w-[80%] bg-white grid grid-cols-6 gap-[20px]">
        {productData.map((data, index) => (
          <div
            key={index}
            className="p-[10px] shadow-lg hover:shadow-2xl rounded-lg duration-500"
          >
            <Image
              src={data.image}
              height={1000}
              width={1000}
              alt="product-image"
            />
            <p>{data.name}</p>
            <p className="font-bold text-[20px] text-red-700">{data.price} đ</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
