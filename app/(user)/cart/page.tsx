import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { Button, Checkbox, Divider, TextField } from "@mui/material";
function createData(
  image: string,
  name: string,
  price: number,
  quantity: number
) {
  return { image, name, price, quantity };
}

const rows = [
  createData(
    "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    "Super laptop",
    24000000,
    1
  ),
  createData(
    "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    "Super laptop",
    24000000,
    1
  ),
  createData(
    "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    "Super laptop",
    24000000,
    1
  ),
  createData(
    "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    "Super laptop",
    24000000,
    1
  ),
  createData(
    "https://product.hstatic.net/200000722513/product/s5406ma-pp046ws_opi_1__c32544a0a1924215842dca8aaf3df95a_1024x1024.jpg",
    "Super laptop",
    24000000,
    1
  ),
];

function CartPage() {
  return (
    <div className="flex flex-col justify-center items-center py-[20px] gap-[20px]">
      <div className="w-[80%]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Lựa chọn</TableCell>
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
                    <TextField
                      id="ammount"
                      sx={{ maxWidth: "100px" }}
                      label="Số lượng"
                      type="number"
                      variant="standard"
                      defaultValue={row.quantity}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="p-[10px] flex flex-col self-end mr-[199px] w-[470px] border-2 border-black">
        <p className="font-bold text-[20px]">Cart Total</p>
        <div className="flex items-center justify-between h-[50px]">
          <p>Tổng tiền hàng</p>
          <p>1720000đ</p>
        </div>
        <Divider />
        <div className="flex items-center justify-between h-[50px]">
          <p>Phí ship</p>
          <p>Free</p>
        </div>
        <Divider />
        <div className="flex items-center justify-between h-[50px]">
          <p>Tổng cộng</p>
          <p>1720000đ</p>
        </div>
        <Button
          sx={{ backgroundColor: "#DB4444", alignSelf: "center" }}
          variant="contained"
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
}

export default CartPage;
