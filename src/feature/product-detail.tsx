import React, { useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Rating,
  Chip,
  Divider,
  IconButton,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../shared/hooks/redux-type";
import { addToCart } from "../shared/store/slice/cart/cart-slice";
import { paths } from "../core/paths";

const ProductDetailPage = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { product } = location.state || {};

  const handleAddToCart = useCallback(() => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  }, [dispatch, product]);

  const handleBuyNow = useCallback(() => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    navigate(paths.checkOut.checkOutPage);
  }, [dispatch, product, navigate]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const originalPrice = useMemo(
    () => Math.round(product.price * 1.1),
    [product.price]
  );
  const discountPercentage = useMemo(
    () => Math.round(((originalPrice - product.price) / originalPrice) * 100),
    [originalPrice, product.price]
  );

  const services = useMemo(
    () => [
      { icon: <LocalShippingOutlinedIcon />, text: "Free Delivery" },
      { icon: <VerifiedUserOutlinedIcon />, text: "1 Year Warranty" },
      { icon: <LoopOutlinedIcon />, text: "7 Days Return" },
    ],
    []
  );

  const specifications = useMemo(
    () => [
      { label: "Category", value: product.category || "Apparel" },
      { label: "Material", value: "Premium Rayon" },
      { label: "Style", value: "Contemporary" },
      { label: "Pattern", value: "Printed" },
      { label: "Care", value: "Machine wash cold" },
      { label: "Country of Origin", value: "India" },
    ],
    [product.category]
  );

  if (!product) return <Typography>No Product Found</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh" }}>
      {/* Back Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton
          onClick={handleBack}
          sx={{ mr: 1, bgcolor: "background.paper", boxShadow: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* Left: Product Image */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            width: { xs: "100%", md: "45%" },
            height: { xs: "auto", md: "600px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            bgcolor: "background.paper",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              maxHeight: "550px",
            }}
          />
        </Paper>

        {/* Right: Product Info */}
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Product Summary Card */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h5" fontWeight={600}>
                {product.title}
              </Typography>
            </Box>

            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Rating value={product.rating.rate} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.rating.rate}) • {product.rating.count} Reviews
              </Typography>
            </Stack>

            <Box
              sx={{ mb: 3, display: "flex", alignItems: "baseline", gap: 2 }}
            >
              <Typography variant="h4" fontWeight={700} color="primary">
                ₹{product.price}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ₹{originalPrice}
              </Typography>
              <Chip
                label={`${discountPercentage}% OFF`}
                color="success"
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography
              variant="body1"
              mb={3}
              sx={{ color: "text.secondary", lineHeight: 1.7 }}
            >
              {product.description ||
                "This premium product combines style with comfort, making it perfect for everyday wear. The high-quality material ensures durability and a great fit."}
            </Typography>

            <Stack direction="row" spacing={2} mb={3}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                size="large"
                onClick={handleAddToCart}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleBuyNow}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                Buy Now
              </Button>
            </Stack>

            {/* Services */}
            {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {specifications.map((detail, index) => (
                <Box key={index}>
                  <Typography variant="body2" color="text.secondary">
                    {detail.label}
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {detail.value}
                  </Typography>
                </Box>
              ))}
            </Box> */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {services.map((service, index) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: "action.hover",
                    height: "100%",
                  }}
                  key={index}
                >
                  {service.icon}
                  <Typography variant="body2" align="center" mt={1}>
                    {service.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Product Details Card */}
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Product Specifications
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {specifications.map((detail, index) => (
                  <Box key={index}>
                    <Typography variant="body2" color="text.secondary">
                      {detail.label}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {detail.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Delivery Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Usually shipped within 24 hours. Expected delivery within 3-5
                business days.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
});

export default ProductDetailPage;
