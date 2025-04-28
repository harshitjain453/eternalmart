import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Stack,
  alpha,
  Container,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { paths } from "../../core/paths";
import { useTheme } from "../hooks/theme-context";
import { useAppSelector } from "../hooks/redux-type";
import CartDrawer from "../components/cart/car-drawer";

const TopNav = () => {
  const muiTheme = useMuiTheme();
  const cart = useAppSelector((state) => state.cart);
  const { toggleTheme, mode } = useTheme();

  // State for cart drawer
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: alpha(muiTheme.palette.background.default, 0.9),
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${alpha(muiTheme.palette.divider, 0.1)}`,
        }}
      >
        <Container maxWidth={false}>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              px: { xs: 1, sm: 2 },
              py: 1,
            }}
          >
            {/* Logo */}
            <Link
              to={paths.productListing.allProducts}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                  background:
                    muiTheme.palette.mode === "dark"
                      ? "linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)"
                      : "linear-gradient(90deg, #1E3A8A 0%, #4F46E5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mr: 1,
                }}
              >
                Eternal Mart
              </Typography>
            </Link>

            {/* Navigation Icons */}
            <Stack direction="row" spacing={1}>
              {/* Theme Toggle Button with Animation */}
              <Tooltip
                title={
                  mode === "dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                }
              >
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    color: muiTheme.palette.text.primary,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: alpha(
                        muiTheme.palette.primary.main,
                        0.1
                      ),
                      transform: "translateY(-2px)",
                    },
                    "& svg": {
                      transition: "transform 0.5s ease",
                      "&:hover": {
                        transform: "rotate(30deg)",
                      },
                    },
                  }}
                >
                  {mode === "dark" ? (
                    <DarkModeIcon
                      sx={{
                        color: muiTheme.palette.primary.main,
                      }}
                    />
                  ) : (
                    <LightModeIcon
                      sx={{
                        color: muiTheme.palette.secondary.main,
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>

              <IconButton
                color="inherit"
                onClick={handleOpenCart}
                sx={{
                  color: muiTheme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
                  },
                }}
              >
                <Badge
                  badgeContent={cart.totalQuantity}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: mode === "dark" ? "#3B82F6" : "#1E3A8A",
                      color: mode === "dark" ? "#000000" : "#FFFFFF",
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onClose={handleCloseCart} />
    </>
  );
};

export default TopNav;
