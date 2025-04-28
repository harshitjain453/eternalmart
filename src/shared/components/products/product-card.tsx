import { memo } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { paths } from "../../../core/paths";
import { truncateText } from "../../../core/utils/helper";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  hover: {
    y: -10,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductCardComponent = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNavigation = () => {
    navigate(`/product/${product?.id}`, {
      state: { product },
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <Card
        onClick={handleNavigation}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "transparent",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: "all 0.3s ease-in-out",
          position: "relative",
        }}
        tabIndex={0}
        component={Box}
      >
        <Box
          sx={{
            position: "relative",
            pt: "75%",
            backgroundColor: alpha(theme.palette.background.default, 0.02),
          }}
        >
          <CardMedia
            component="img"
            loading="lazy"
            // sx={{
            //   position: "absolute",
            //   top: 0,
            //   left: 0,
            //   width: "100%",
            //   height: "100%",
            //   objectFit: "contain",
            //   p: 2,
            //   mixBlendMode: "multiply",
            //   backgroundColor: "transparent",
            //   filter:
            //     theme.palette.mode === "dark" ? "brightness(0.9)" : "none",
            // }}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              p: 2,
              transition: "transform 0.5s ease",
            }}
            image={product.image}
            alt={product.title}
          />
          <Box sx={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}>
            <Chip
              label={`$${product.price}`}
              size="small"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                fontWeight: "bold",
              }}
            />
          </Box>
        </Box>

        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Box sx={{ mb: "auto" }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 600,
                fontSize: "1rem",
                mb: 1,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mb: 2,
                fontSize: "0.8rem",
              }}
            >
              {truncateText(product.description, 80)}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                value={product.rating.rate}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                ({product.rating.count})
              </Typography>
            </Box>

            <Chip
              label={product.category}
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.text.primary,
                fontSize: "0.7rem",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
const ProductCard = memo(ProductCardComponent);

export default ProductCard;
