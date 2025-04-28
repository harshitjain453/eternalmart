import React, { useState, useEffect, memo } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Container,
  Paper,
  useTheme,
  alpha,
  Divider,
  Avatar,
  Stack,
  IconButton,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "../shared/hooks/redux-type";
import { useNavigate } from "react-router-dom";

// Import Step Components
import ShippingForm from "../shared/components/checkout/shipping-form";
import PaymentForm from "../shared/components/checkout/payment-form";
import OrderConfirmation from "../shared/components/checkout/order-confirmation";
import { paths } from "../core/paths";

// Custom styled connector for the stepper
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        theme.palette.mode === "dark"
          ? "linear-gradient(90deg, #3B82F6, #A855F7)"
          : "linear-gradient(90deg, #1E3A8A, #4F46E5)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        theme.palette.mode === "dark"
          ? "linear-gradient(90deg, #3B82F6, #A855F7)"
          : "linear-gradient(90deg, #1E3A8A, #4F46E5)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300],
    borderRadius: 1,
  },
}));

// Custom step icon component - Fixed to use theme from props
const ColorlibStepIcon = styled(
  ({
    active,
    completed,
    icon,
    className,
  }: StepIconProps & { icon?: React.ReactNode }) => {
    const currentTheme = useTheme(); // Get theme within the component

    const icons: { [index: string]: React.ReactNode } = {
      1: <LocalShippingOutlinedIcon />,
      2: <PaymentOutlinedIcon />,
      3: <CheckCircleOutlineOutlinedIcon />,
    };

    return (
      <Box
        className={className}
        sx={{
          backgroundColor:
            completed || active
              ? "transparent"
              : alpha(currentTheme.palette.grey[500], 0.2),
          zIndex: 1,
          color:
            completed || active ? "#fff" : currentTheme.palette.text.primary,
          width: 44,
          height: 44,
          display: "flex",
          borderRadius: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icons[String(icon)]}
      </Box>
    );
  }
)(({ theme, active, completed }) => ({
  background:
    completed || active
      ? theme.palette.mode === "dark"
        ? "linear-gradient(90deg, #3B82F6, #A855F7)"
        : "linear-gradient(90deg, #1E3A8A, #4F46E5)"
      : "transparent",
  boxShadow:
    completed || active
      ? `0 4px 10px ${alpha(theme.palette.primary.main, 0.4)}`
      : "none",
  transition: "all 0.3s ease",
}));

const steps = [
  { label: "Shipping", icon: <LocalShippingOutlinedIcon /> },
  { label: "Payment", icon: <PaymentOutlinedIcon /> },
  { label: "Confirmation", icon: <CheckCircleOutlineOutlinedIcon /> },
];

const CheckoutPage = () => {
  const theme = useTheme();
  const cart = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [paymentData, setPaymentData] = useState({
    method: "card",
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
  const handleShippingSubmit = (data: any) => {
    setShippingData(data);
    handleNext();
  };
  const handlePaymentSubmit = (data: any) => {
    setPaymentData(data);
    handleNext();
  };

  const handlePlaceOrder = () => {
    setIsProcessingOrder(true);
    setTimeout(() => {
      setIsProcessingOrder(false);
      navigate(paths.order.orderSummary);
    }, 2000);
  };

  useEffect(() => {
    if (cart.items.length === 0) navigate(paths.productListing.allProducts);
  }, [cart.items, navigate]);

  const taxAmount = cart.totalPrice * 0.1;
  const shippingCost = cart.totalPrice > 100 ? 0 : 10;
  const grandTotal = cart.totalPrice + taxAmount + shippingCost;

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ShippingForm
            initialData={shippingData}
            onSubmit={handleShippingSubmit}
          />
        );
      case 1:
        return (
          <PaymentForm
            initialData={paymentData}
            onSubmit={handlePaymentSubmit}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <OrderConfirmation
            shippingDetails={shippingData}
            paymentDetails={paymentData}
            onConfirm={handlePlaceOrder}
            onBack={handleBack}
            isProcessing={isProcessingOrder}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const getStepStatusMessage = (step: number) => {
    switch (step) {
      case 0:
        return "Complete shipping information to proceed";
      case 1:
        return "Enter payment details to continue";
      case 2:
        return "Review your order before confirming";
      default:
        return "";
    }
  };

  if (!theme) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: theme.palette.text.primary,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Page Title */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 4,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)"
              : "linear-gradient(90deg, #1E3A8A 0%, #4F46E5 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Checkout
      </Typography>

      {/* Stepper */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(8px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<ColorlibConnector />}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={(props: any) => (
                  <ColorlibStepIcon {...props} icon={props.icon || index + 1} />
                )}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Flex Layout for Form + Order Summary */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Form Area */}
        <Box sx={{ flex: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.3 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  minHeight: 400,
                }}
              >
                {getStepContent(activeStep)}
              </Paper>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Order Summary */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(8px)",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              position: "sticky",
              top: 24,
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Cart Items */}
            <Stack
              spacing={2}
              sx={{ mb: 3, maxHeight: 300, overflowY: "auto", pr: 1 }}
            >
              {cart.items.map((item) => (
                <Box
                  key={item.id}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Avatar
                    src={item.image}
                    alt={item.title}
                    variant="rounded"
                    sx={{ width: 60, height: 60, p: 1, bgcolor: "white" }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Qty: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={500}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* Summary Details */}
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography variant="body2">
                  ${cart.totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Tax (10%)
                </Typography>
                <Typography variant="body2">${taxAmount.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Shipping
                </Typography>
                <Typography variant="body2">
                  {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "Free"}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* Total */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
                py: 1,
                px: 2,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 1.5,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight={600} color="primary">
                ${grandTotal.toFixed(2)}
              </Typography>
            </Box>

            {/* Step Status */}
            <Box sx={{ textAlign: "center", color: "text.secondary" }}>
              <Typography variant="caption" display="block">
                {getStepStatusMessage(activeStep)}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(CheckoutPage);
