import React, { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  useTheme,
  alpha,
  Stack,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../shared/hooks/redux-type";
import { clearCart } from "../shared/store/slice/cart/cart-slice";
import { paths } from "../core/paths";

const OrderSuccess = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Generate a random order number
  const orderNumber = React.useMemo(() => {
    return "ORD-" + Math.floor(100000 + Math.random() * 900000);
  }, []);

  // Clear cart after successful order
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // Animation variants
  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
      },
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(8px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: theme.palette.success.main,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                boxShadow: `0 8px 20px ${alpha(
                  theme.palette.success.main,
                  0.4
                )}`,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 40 }} />
            </Box>
          </motion.div>
        </Box>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(90deg, #10B981 0%, #3B82F6 100%)"
                  : "linear-gradient(90deg, #047857 0%, #1E40AF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Order Placed Successfully!
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Thank you for your purchase. Your order has been received and is
            being processed.
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 2,
              backgroundColor: alpha(
                theme.palette.mode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
                0.1
              ),
              border: `1px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
              display: "inline-block",
              minWidth: "250px",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <ReceiptLongOutlinedIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={600}>
                Order #{orderNumber}
              </Typography>
            </Stack>
          </Paper>

          <Box sx={{ mb: 5 }}>
            <Typography variant="body1" color="text.secondary">
              We've sent a confirmation email with all the details to your email
              address. You can also track your order status in your account.
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            {/* <Button
              component={Link}
              to="/orders"
              variant="outlined"
              color="primary"
              startIcon={<ReceiptLongOutlinedIcon />}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontWeight: 600,
                borderColor: alpha(theme.palette.primary.main, 0.5),
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              Track Order
            </Button> */}
            <Button
              component={Link}
              to={paths.productListing.allProducts}
              variant="contained"
              color="primary"
              startIcon={<ShoppingBagOutlinedIcon />}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)"
                    : "linear-gradient(90deg, #1E3A8A 0%, #4F46E5 100%)",
                fontWeight: 600,
                "&:hover": {
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(90deg, #2563EB 0%, #9333EA 100%)"
                      : "linear-gradient(90deg, #1E40AF 0%, #4338CA 100%)",
                  boxShadow: `0 4px 12px ${alpha(
                    theme.palette.primary.main,
                    0.4
                  )}`,
                },
              }}
            >
              Continue Shopping
            </Button>
          </Stack>
        </motion.div>
      </Paper>
    </Container>
  );
};

export default OrderSuccess;
