// @ts-nocheck
import React, { memo, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  useTheme,
  alpha,
  Divider,
  Stack,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

type OrderConfirmationProps = {
  shippingDetails: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentDetails: {
    method: string;
    cardNumber: string;
    nameOnCard: string;
    expiryDate: string;
    cvv: string;
    upiId: string;
  };
  onConfirm: () => void;
  onBack: () => void;
  isProcessing?: boolean;
};

const OrderConfirmation: React.FC<OrderConfirmationProps> = memo(
  ({
    shippingDetails,
    paymentDetails,
    onConfirm,
    onBack,
    isProcessing = false,
  }) => {
    const theme = useTheme();

    // Mask card number for display (show only last 4 digits)
    const maskedCardNumber = useMemo(() => {
      return paymentDetails.cardNumber
        ? `**** **** **** ${paymentDetails.cardNumber.slice(-4)}`
        : "";
    }, [paymentDetails.cardNumber]);

    return (
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
            }}
          >
            <CheckCircleOutlineIcon />
          </Box>
          <Typography variant="h6" fontWeight={600}>
            Review Your Order
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {/* Shipping Information */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: "blur(8px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <HomeOutlinedIcon color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>
                  Shipping Details
                </Typography>
              </Stack>
              <Stack spacing={1} sx={{ ml: 0.5 }}>
                <Typography variant="body1">
                  {shippingDetails.firstName} {shippingDetails.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shippingDetails.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shippingDetails.city}, {shippingDetails.state}{" "}
                  {shippingDetails.pincode}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {shippingDetails.phone}
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          {/* Payment Information */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: "blur(8px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                {paymentDetails.method === "card" ? (
                  <CreditCardOutlinedIcon color="primary" />
                ) : (
                  <AccountBalanceOutlinedIcon color="primary" />
                )}
                <Typography variant="subtitle1" fontWeight={600}>
                  Payment Method
                </Typography>
              </Stack>
              {paymentDetails.method === "card" ? (
                <Stack spacing={1} sx={{ ml: 0.5 }}>
                  <Typography variant="body1">Card Payment</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {maskedCardNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {paymentDetails.nameOnCard}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expires: {paymentDetails.expiryDate}
                  </Typography>
                </Stack>
              ) : (
                <Stack spacing={1} sx={{ ml: 0.5 }}>
                  <Typography variant="body1">UPI Payment</Typography>
                  <Typography variant="body2" color="text.secondary">
                    UPI ID: {paymentDetails.upiId}
                  </Typography>
                </Stack>
              )}
            </Paper>
          </Grid>

          {/* Delivery Information */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: "blur(8px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <LocalShippingOutlinedIcon color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>
                  Delivery Information
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip
                  label="Standard Delivery"
                  color="primary"
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label="3-5 Business Days"
                  variant="outlined"
                  size="small"
                  sx={{ color: theme.palette.text.secondary }}
                />
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ShieldOutlinedIcon fontSize="small" color="success" />
                <Typography variant="body2" color="text.secondary">
                  Your order is protected by our secure payment system
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            backgroundColor: alpha(
              theme.palette.mode === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
              0.1
            ),
            border: `1px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
          }}
        >
          <Typography variant="body2" align="center" color="text.secondary">
            By placing your order, you agree to our Terms of Service and Privacy
            Policy. We'll send your order confirmation and updates to your
            email.
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Button
              type="button"
              variant="outlined"
              size="large"
              fullWidth
              onClick={onBack}
              disabled={isProcessing}
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
              Back to Payment
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={onConfirm}
              disabled={isProcessing}
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
              {isProcessing ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Place Order"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
);

export default OrderConfirmation;
