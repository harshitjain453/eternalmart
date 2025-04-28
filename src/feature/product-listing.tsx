import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../shared/hooks/redux-type";
import { fetchProducts } from "../shared/store/slice/product/api";
import { motion } from "framer-motion";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  alpha,
  Button,
  Avatar,
  Grid,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PaymentIcon from "@mui/icons-material/Payment";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import {
  banner,
  all,
  womnesclothing,
  mensclothing,
  electronics,
  jewellary,
} from "../core/assets/index";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const featureBoxVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const categoryItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};
const ProductCard = React.lazy(
  () => import("../shared/components/products/product-card")
);

const ProductListing = () => {
  const muiTheme = useMuiTheme();
  const dispatch = useAppDispatch();
  const { listings, categories } = useAppSelector((state) => state.product);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!listings?.items?.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, listings]);

  // Filter products based on search term and selected category
  // const filteredProducts =
  //   listings?.items?.filter((product) => {
  //     const matchesSearch =
  //       product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.description.toLowerCase().includes(searchTerm.toLowerCase());

  //     const matchesCategory = selectedCategory
  //       ? product.category === selectedCategory
  //       : true;

  //     return matchesSearch && matchesCategory;
  //   }) || [];

  // Featured benefits section
  const benefits = [
    {
      icon: <LocalShippingIcon />,
      title: "Free Delivery",
      desc: "Orders over $50",
    },
    {
      icon: <SupportAgentIcon />,
      title: "24/7 Support",
      desc: "Dedicated support",
    },
    {
      icon: <AssignmentReturnIcon />,
      title: "Easy Returns",
      desc: "30-day guarantee",
    },
    {
      icon: <PaymentIcon />,
      title: "Secure Payment",
      desc: "Protected checkout",
    },
  ];

  const filteredProducts = useMemo(() => {
    return (
      listings?.items?.filter((product) => {
        const matchesSearch =
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory
          ? product.category === selectedCategory
          : true;
        return matchesSearch && matchesCategory;
      }) || []
    );
  }, [listings?.items, searchTerm, selectedCategory]);

  // Memoized Category Image Mapper
  const getCategoryImage = useCallback((category: string) => {
    const categoryImages: Record<string, string> = {
      electronics,
      jewelery: jewellary,
      "men's clothing": mensclothing,
      "women's clothing": womnesclothing,
      all,
    };
    return categoryImages[category] || all;
  }, []);

  const scrollToProducts = useCallback(() => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      {/* Main Hero Banner - Full Width with Left-Side Gradient Mask */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 450, md: 600 },
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, ${alpha(
              muiTheme.palette.background.default,
              0.95
            )} 0%, ${alpha(
              muiTheme.palette.background.default,
              0.8
            )} 50%, ${alpha(
              muiTheme.palette.background.default,
              0.4
            )} 75%, ${alpha(muiTheme.palette.background.default, 0.1)} 100%)`,
            zIndex: 1,
          },
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              maxWidth: "550px",
              ml: { xs: 0, md: 4 },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: muiTheme.palette.primary.main,
                fontWeight: "bold",
                letterSpacing: 2,
                mb: 1,
                display: "block",
              }}
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              NEW COLLECTION 2025
            </Typography>

            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontSize: { xs: "2rem", md: "3.5rem" },
                fontWeight: 800,
                lineHeight: 1.2,
              }}
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Discover Latest Fashion Trends
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontSize: { xs: "1rem", md: "1.1rem" },
                maxWidth: "500px",
              }}
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Explore our curated collection of premium products at unbeatable
              prices. Find your style with our exclusive seasonal designs.
            </Typography>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={scrollToProducts}
                startIcon={<ShoppingBagIcon />}
                sx={{
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  backgroundColor: muiTheme.palette.primary.main,
                  fontSize: "1rem",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: muiTheme.palette.primary.dark,
                    transform: "translateY(-3px)",
                    boxShadow: `0 6px 20px ${alpha(
                      muiTheme.palette.primary.main,
                      0.4
                    )}`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Shop Now
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Benefits Section - Full Width */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
          py: 4,
          backgroundColor: alpha(muiTheme.palette.background.paper, 0.5),
          width: "100%",
        }}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={featureBoxVariants}
                style={{ flex: "1 1 200px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: alpha(
                        muiTheme.palette.background.paper,
                        0.8
                      ),
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      backgroundColor: alpha(
                        muiTheme.palette.primary.main,
                        0.1
                      ),
                      color: muiTheme.palette.primary.main,
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.desc}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ py: 4 }} id="products-section">
        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search products..."
            variant="outlined"
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "12px",
                backgroundColor: alpha(muiTheme.palette.background.paper, 0.8),
                backdropFilter: "blur(8px)",
                "&:hover": {
                  boxShadow: `0 4px 12px ${alpha(
                    muiTheme.palette.primary.main,
                    0.15
                  )}`,
                },
                transition: "all 0.3s ease",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: alpha(muiTheme.palette.primary.main, 0.2),
                },
                "&:hover fieldset": {
                  borderColor: alpha(muiTheme.palette.primary.main, 0.5),
                },
                "&.Mui-focused fieldset": {
                  borderColor: muiTheme.palette.primary.main,
                },
              },
            }}
          />
        </Box>

        {/* Circular Category Selection with Images */}
        <Box
          component={motion.div}
          variants={categoryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 1, md: 3 },
            mb: 5,
          }}
        >
          <motion.div variants={categoryItemVariants}>
            <Box
              onClick={() => setSelectedCategory("")}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar
                src={all}
                sx={{
                  width: 80,
                  height: 80,
                  mb: 1,
                  border: `2px solid ${
                    !selectedCategory
                      ? muiTheme.palette.primary.main
                      : alpha(muiTheme.palette.divider, 0.3)
                  }`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: `0 4px 12px ${alpha(
                      muiTheme.palette.primary.main,
                      0.2
                    )}`,
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: !selectedCategory ? 600 : 400,
                  color: !selectedCategory
                    ? muiTheme.palette.primary.main
                    : "inherit",
                }}
              >
                All
              </Typography>
            </Box>
          </motion.div>

          {categories.map((category) => (
            <motion.div key={category} variants={categoryItemVariants}>
              <Box
                onClick={() => setSelectedCategory(category)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  src={getCategoryImage(category)}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 1,
                    border: `2px solid ${
                      selectedCategory === category
                        ? muiTheme.palette.primary.main
                        : alpha(muiTheme.palette.divider, 0.3)
                    }`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: `0 4px 12px ${alpha(
                        muiTheme.palette.primary.main,
                        0.2
                      )}`,
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    fontWeight: selectedCategory === category ? 600 : 400,
                    color:
                      selectedCategory === category
                        ? muiTheme.palette.primary.main
                        : "inherit",
                    maxWidth: "100px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Product Count Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            {selectedCategory
              ? `${
                  selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)
                }`
              : "All Products"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: muiTheme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            {filteredProducts.length} items
          </Typography>
        </Box>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 3,
              }}
            >
              {filteredProducts.map((product) => (
                //@ts-ignore
                <Grid
                  item
                  key={product.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{ display: "contents" }}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
            }}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h5"
              sx={{ mb: 2, color: muiTheme.palette.text.secondary }}
            >
              No products found
            </Typography>
            <Typography>Try changing your search or filter criteria</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductListing;
