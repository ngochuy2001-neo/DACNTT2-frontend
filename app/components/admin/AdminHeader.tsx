import { VerifiedUser } from "@mui/icons-material";
import React from "react";
import { Menu } from "@mui/icons-material";
import { Button } from "@mui/material";

const userData = {
  name: "Nguyen Le Ngoc Huy",
};

function AdminHeader({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="bg-red-700 fixed w-full flex justify-between h-[78px] text-white px-[30px] items-center">
      <Button
        sx={{
          color: "white",
          p: "5px",
          minWidth: "0px",
          borderRadius: "100px",
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu />
      </Button>
      <div>Admin Page</div>
      <div>
        <VerifiedUser />
        {userData.name}
      </div>
    </div>
  );
}

export default AdminHeader;
