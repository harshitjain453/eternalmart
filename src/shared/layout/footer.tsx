import {
  Box,
  Typography,
  Stack,
  Container,
  TextField,
  Button,
  Divider,
  useTheme,
  alpha,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 6,
        py: 4,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(8px)",
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Footer */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 4 }}
        >
          {/* Company Info */}
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)"
                    : "linear-gradient(90deg, #1E3A8A 0%, #4F46E5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Eternal Mart
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Bringing you the finest in fashion and lifestyle.
            </Typography>
          </Box>

          {/* Corporate Links */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Corporate
            </Typography>
            <Stack spacing={1}>
              <Link to="/shipping-returns" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary">
                  Shipping & Returns
                </Typography>
              </Link>
              <Link to="/about" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary">
                  About Us
                </Typography>
              </Link>
              <Link to="/gift-card" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary">
                  Gift Card
                </Typography>
              </Link>
            </Stack>
          </Box>

          {/* Support Links */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Support
            </Typography>
            <Stack spacing={1}>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary">
                  Contact us
                </Typography>
              </Link>
              <Link to="/faq" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary">
                  FAQ
                </Typography>
              </Link>
              <Link to="/privacy-policy" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary">
                  Privacy Policy
                </Typography>
              </Link>
            </Stack>
          </Box>

          {/* Newsletter */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Get 10% OFF Your First Order
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                sx={{ flex: 1 }}
              />
              <Button variant="contained" sx={{ px: 3 }}>
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Bottom Footer */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Eternal Mart. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton>
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <TwitterIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
