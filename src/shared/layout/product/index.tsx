import React from "react";
import { Box } from "@mui/material";
import TopNav from "../topNav";
import Footer from "../footer";

const ProductLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TopNav />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductLayout;
