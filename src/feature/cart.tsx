import {
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  IconButton,
  Avatar,
  useTheme,
  Alert,
  Card,
  CardContent,
  TextField,
  alpha,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../shared/hooks/redux-type";
import {
  addToCart,
  removeFromCart,
} from "../shared/store/slice/cart/cart-slice";
import { paths } from "../core/paths";

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: any) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
};

const ViewCartPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const isDarkMode = theme.palette.mode === "dark";

  const handleRemoveItem = (id: any) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (item: any) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const handleDecreaseQuantity = (item: any) => {
    if (item.quantity === 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(removeFromCart(item.id));
      dispatch(addToCart({ ...item, quantity: item.quantity - 1 }));
    }
  };

  if (cart.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            textAlign: "center",
          }}
        >
          <ShoppingCartIcon
            sx={{
              fontSize: 80,
              mb: 3,
              color: theme.palette.text.secondary,
              opacity: 0.5,
            }}
          />
          <Typography variant="h5" gutterBottom fontWeight={500}>
            Your cart is empty
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ mb: 4, maxWidth: 500 }}
          >
            Looks like you haven't added anything to your cart yet. Continue
            shopping and discover our amazing products.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to={paths.productListing.allProducts}
            startIcon={<KeyboardBackspaceIcon />}
            sx={{
              py: 1.5,
              px: 4,
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h4" fontWeight={600} sx={{ mb: 4 }}>
        My Cart
      </Typography>

      {/* Main container - side by side layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Product detail section - takes 2/3 width on desktop */}
        <Box
          sx={{ width: { xs: "100%", md: "66.666%" }, order: { xs: 1, md: 1 } }}
        >
          <Paper
            elevation={isDarkMode ? 2 : 1}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" fontWeight={500} sx={{ mb: 3 }}>
                Cart Items ({cart.totalQuantity})
              </Typography>

              {/* Free shipping alert */}
              <Alert
                severity="success"
                icon={<LocalShippingOutlinedIcon />}
                sx={{
                  mb: 3,
                  backgroundColor: isDarkMode
                    ? "rgba(46, 125, 50, 0.15)"
                    : "rgba(237, 247, 237, 1)",
                  color: isDarkMode
                    ? theme.palette.success.light
                    : theme.palette.success.dark,
                  "& .MuiAlert-icon": {
                    color: isDarkMode
                      ? theme.palette.success.light
                      : theme.palette.success.main,
                  },
                }}
              >
                You are eligible for free shipping!
              </Alert>

              <Divider sx={{ mb: 2 }} />

              {/* Header Row for desktop */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  py: 1.5,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ width: "50%" }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Product
                  </Typography>
                </Box>
                <Box sx={{ width: "20%", textAlign: "center" }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Quantity
                  </Typography>
                </Box>
                <Box sx={{ width: "25%", textAlign: "right" }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total
                  </Typography>
                </Box>
                <Box sx={{ width: "5%" }}></Box>
              </Box>

              {/* Cart Items */}
              <Box sx={{ py: 2 }}>
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "flex-start", md: "center" },
                        py: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      {/* Product Info */}
                      <Box
                        sx={{
                          display: "flex",
                          width: { xs: "100%", md: "50%" },
                          mb: { xs: 2, md: 0 },
                        }}
                      >
                        <Avatar
                          src={item.image}
                          alt={item.title}
                          variant="rounded"
                          sx={{
                            width: 80,
                            height: 80,
                            mr: 2,
                            p: 1,
                            bgcolor: isDarkMode ? "#333" : "#f5f5f5",
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={500}>
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mb: 1 }}
                          >
                            Size:{" "}
                            {
                              //@ts-ignore
                              item.size || "M"
                            }
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.secondary.main,
                              fontWeight: 500,
                            }}
                          >
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Quantity Controls */}
                      <Box
                        sx={{
                          width: { xs: "100%", md: "20%" },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: { xs: "flex-start", md: "center" },
                          mb: { xs: 2, md: 0 },
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleDecreaseQuantity(item)}
                          sx={{
                            color: theme.palette.text.primary,
                            border: `1px solid ${theme.palette.divider}`,
                            p: 0.5,
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography
                          variant="body1"
                          sx={{
                            px: 2,
                            minWidth: 30,
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() => handleIncreaseQuantity(item)}
                          sx={{
                            color: theme.palette.text.primary,
                            border: `1px solid ${theme.palette.divider}`,
                            p: 0.5,
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      {/* Total */}
                      <Box
                        sx={{
                          width: { xs: "100%", md: "25%" },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: { xs: "flex-start", md: "flex-end" },
                          mb: { xs: 1, md: 0 },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          sx={{ color: theme.palette.secondary.main }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>

                      {/* Remove Button */}
                      <Box
                        sx={{
                          width: { xs: "100%", md: "5%" },
                          display: "flex",
                          justifyContent: { xs: "flex-start", md: "flex-end" },
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{
                            color: theme.palette.text.secondary,
                            "&:hover": {
                              color: theme.palette.error.main,
                            },
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              {/* Continue Shopping Button */}
              <Box
                sx={{ mt: 4, display: "flex", justifyContent: "flex-start" }}
              >
                <Button
                  variant="outlined"
                  component={Link}
                  to={paths.productListing.allProducts}
                  startIcon={<KeyboardBackspaceIcon />}
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.main}10`,
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Order Summary - takes 1/3 width on desktop */}
        <Box
          sx={{
            width: { xs: "100%", md: "33.333%" },
            order: { xs: 2, md: 2 },
          }}
        >
          <Card
            elevation={isDarkMode ? 2 : 1}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              position: "sticky",
              top: 24,
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" fontWeight={500} sx={{ mb: 3 }}>
                Order Summary
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Subtotal ({cart.totalQuantity} items)
                  </Typography>
                  <Typography variant="body2">
                    ${cart.totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Shipping
                  </Typography>
                  <Typography variant="body2">Free</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Tax
                  </Typography>
                  <Typography variant="body2">Included</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    my: 2,
                    pt: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Total
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    ${cart.totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    mb: 2,
                  }}
                >
                  You saved Rs. 749.00!
                </Typography>
              </Box>

              {/* Promo Code Input */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Promo code"
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="text"
                        sx={{
                          color: theme.palette.primary.main,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Apply
                      </Button>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </Box>

              {/* Checkout Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => navigate(paths.checkOut.checkOutPage)}
                sx={{
                  py: 1.5,
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
                CHECKOUT
              </Button>

              {/* Payment methods info */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  🔒 100% Secure Payments
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default ViewCartPage;
