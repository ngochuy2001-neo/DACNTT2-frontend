import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(
  image: string,
  name: string,
  price: number,
  stock_status: boolean
) {
  return { image, name, price, stock_status };
}

const rows = [
  createData(
    "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    "Super laptop",
    24000000,
    false
  ),
  createData(
    "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    "Super laptop",
    24000000,
    true
  ),
  createData(
    "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    "Super laptop",
    24000000,
    false
  ),
  createData(
    "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    "Super laptop",
    24000000,
    true
  ),
  createData(
    "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    "Super laptop",
    24000000,
    true
  ),
];

function WishlistPage() {
  return (
    <div className="flex justify-center items-center py-[20px]">
      <div className="w-[80%]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <div className="flex gap-[20px]">
                      <div className="w-[100px] h-[100px]">
                        <Image
                          src={row.image}
                          alt="product_image"
                          height={1000}
                          width={1000}
                        />
                      </div>
                      <p className="font-bold text-[20px]">{row.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    {row.stock_status ? "On stock" : "Out of stock"}
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        backgroundColor: "#da0d0d",
                        padding: "6px 0px",
                        minWidth: "48px",
                      }}
                      variant="contained"
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default WishlistPage;
