import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack,
  Avatar,
  useTheme,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-type";
import { removeFromCart, addToCart } from "../../store/slice/cart/cart-slice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { paths } from "../../../core/paths";

// Animation variants
const drawerItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: any) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

const CartDrawer = ({ open, onClose }: any) => {
  const theme = useTheme();
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleCheckout = () => {
    onClose();
    navigate(paths.checkOut.checkOutPage);
  };
  const handleCart = () => {
    onClose();
    navigate(paths.cart.cartPage);
  };
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 420 },
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderLeft: `1px solid ${
            isDarkMode ? theme.palette.divider : theme.palette.divider
          }`,
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color: theme.palette.secondary.main,
              letterSpacing: "1px",
            }}
          >
            YOUR CART ({cart.totalQuantity})
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ color: theme.palette.text.primary }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3, borderColor: theme.palette.divider }} />

        {/* Cart Items List */}
        {cart.items.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              gap: 2,
              p: 4,
            }}
          >
            <ShoppingCartIcon
              sx={{
                fontSize: 60,
                color: theme.palette.text.secondary,
                opacity: 0.5,
              }}
            />
            <Typography variant="h6" color="text.secondary" textAlign="center">
              Your cart is empty
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                onClose();
                navigate(paths?.productListing?.allProducts);
              }}
              sx={{
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                "&:hover": {
                  borderColor: theme.palette.secondary.main,
                  backgroundColor: `${theme.palette.secondary.main}10`,
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                mb: 3,
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `${theme.palette.secondary.main}40`,
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: `${theme.palette.text.primary}10`,
                },
              }}
            >
              <Stack spacing={2}>
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={drawerItemVariants}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: `${theme.palette.text.primary}08`,
                        "&:hover": {
                          backgroundColor: `${theme.palette.text.primary}12`,
                        },
                        position: "relative",
                      }}
                    >
                      {/* Product Image */}
                      <Avatar
                        src={item.image}
                        alt={item.title}
                        variant="rounded"
                        sx={{
                          width: 70,
                          height: 70,
                          mr: 2,
                          p: 1,
                          bgcolor: isDarkMode ? "#333" : "#f5f5f5",
                        }}
                      />

                      {/* Product Details */}
                      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 500,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.title}
                        </Typography>

                        {/* Size */}
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            mt: 0.5,
                            color: theme.palette.text.secondary,
                          }}
                        >
                          Size:{" "}
                          {
                            //@ts-ignore
                            item.size || "M"
                          }
                        </Typography>

                        {/* Price */}
                        <Typography
                          variant="subtitle2"
                          sx={{
                            mt: 1,
                            fontWeight: 600,
                            color: theme.palette.secondary.main,
                          }}
                        >
                          ${item.price.toFixed(2)}
                        </Typography>

                        {/* Quantity Controls */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleDecreaseQuantity(item)}
                            sx={{
                              color: theme.palette.text.primary,
                              border: `1px solid ${theme.palette.divider}`,
                              p: 0.5,
                              "&:hover": {
                                backgroundColor: `${theme.palette.text.primary}10`,
                              },
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>

                          <Typography
                            variant="body2"
                            sx={{
                              px: 2,
                              minWidth: 24,
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
                              "&:hover": {
                                backgroundColor: `${theme.palette.text.primary}10`,
                              },
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>

                          <Box sx={{ ml: "auto" }}>
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              sx={{ color: theme.palette.secondary.main }}
                            >
                              ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Remove Button */}
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveItem(item.id)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          color: theme.palette.text.secondary,
                          "&:hover": {
                            color: theme.palette.error.main,
                          },
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </Box>

            {/* Cart Summary */}
            <Box
              sx={{
                mt: "auto",
                pt: 3,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Subtotal:
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
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Shipping:
                  </Typography>
                  <Typography variant="body2">Free</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    pb: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Total:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    ${cart.totalPrice.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" gap={1}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={handleCheckout}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    borderColor: alpha(theme.palette.primary.main, 0.5),
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  CHECKOUT
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleCart}
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
                  View Cart
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
