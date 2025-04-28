import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputAdornment,
  Stack,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";

type PaymentFormProps = {
  initialData: {
    method: string;
    cardNumber: string;
    nameOnCard: string;
    expiryDate: string;
    cvv: string;
    upiId: string;
  };
  onSubmit: (values: any) => void;
  onBack: () => void;
};

const PaymentForm: React.FC<PaymentFormProps> = ({
  initialData,
  onSubmit,
  onBack,
}) => {
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState(
    initialData.method || "card"
  );

  const textFieldStyle = useMemo(
    () => ({
      "& .MuiOutlinedInput-root": {
        borderRadius: 1.5,
        backgroundColor: alpha(theme.palette.background.paper, 0.4),
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(theme.palette.text.primary, 0.2),
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(theme.palette.text.primary, 0.3),
      },
    }),
    [theme]
  );

  const cardValidationSchema = Yup.object({
    cardNumber: Yup.string()
      .transform((value) => value.replace(/\s+/g, "")) // 🛠 Strip spaces before validation
      .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
      .required("Card number is required"),
    nameOnCard: Yup.string().required("Name on card is required"),
    expiryDate: Yup.string()
      .matches(
        /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        "Expiry date must be in MM/YY format"
      )
      .required("Expiry date is required"),
    cvv: Yup.string()
      .matches(/^[0-9]{3,4}$/, "CVV must be 3-4 digits")
      .required("CVV is required"),
  });

  const upiValidationSchema = Yup.object({
    upiId: Yup.string()
      .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/, "Please enter a valid UPI ID")
      .required("UPI ID is required"),
  });

  const formik = useFormik({
    initialValues: {
      method: initialData.method || "card",
      cardNumber: initialData.cardNumber || "",
      nameOnCard: initialData.nameOnCard || "",
      expiryDate: initialData.expiryDate || "",
      cvv: initialData.cvv || "",
      upiId: initialData.upiId || "",
    },
    validationSchema:
      paymentMethod === "card" ? cardValidationSchema : upiValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handlePaymentMethodChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const method = event.target.value;
      setPaymentMethod(method);
      formik.setFieldValue("method", method);
    },
    [formik]
  );

  const formatCardNumber = useCallback((value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  }, []);
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
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
          <PaymentOutlinedIcon />
        </Box>
        <Typography variant="h6" fontWeight={600}>
          Payment Method
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <form onSubmit={formik.handleSubmit}>
        <FormControl component="fieldset" sx={{ width: "100%", mb: 4 }}>
          <RadioGroup
            aria-label="payment-method"
            name="method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `2px solid ${
                      paymentMethod === "card"
                        ? theme.palette.primary.main
                        : alpha(theme.palette.divider, 0.2)
                    }`,
                    bgcolor:
                      paymentMethod === "card"
                        ? alpha(theme.palette.primary.main, 0.05)
                        : alpha(theme.palette.background.paper, 0.4),
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                    },
                  }}
                  onClick={() => setPaymentMethod("card")}
                >
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CreditCardOutlinedIcon
                          color={
                            paymentMethod === "card" ? "primary" : "action"
                          }
                        />
                        <Typography fontWeight={500}>
                          Credit / Debit Card
                        </Typography>
                      </Stack>
                    }
                    sx={{ width: "100%", m: 0 }}
                  />
                </Paper>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `2px solid ${
                      paymentMethod === "upi"
                        ? theme.palette.primary.main
                        : alpha(theme.palette.divider, 0.2)
                    }`,
                    bgcolor:
                      paymentMethod === "upi"
                        ? alpha(theme.palette.primary.main, 0.05)
                        : alpha(theme.palette.background.paper, 0.4),
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                    },
                  }}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <FormControlLabel
                    value="upi"
                    control={<Radio />}
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AccountBalanceOutlinedIcon
                          color={paymentMethod === "upi" ? "primary" : "action"}
                        />
                        <Typography fontWeight={500}>UPI Payment</Typography>
                      </Stack>
                    }
                    sx={{ width: "100%", m: 0 }}
                  />
                </Paper>
              </Box>
            </Box>
          </RadioGroup>
        </FormControl>

        {paymentMethod === "card" ? (
          <>
            <TextField
              fullWidth
              id="cardNumber"
              name="cardNumber"
              placeholder="Card Number"
              value={formik.values.cardNumber}
              onChange={(e: any) => {
                const formatted = formatCardNumber(e.target.value);
                formik.setFieldValue("cardNumber", formatted);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
              }
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCardOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ ...textFieldStyle, mb: 2 }}
            />

            <TextField
              fullWidth
              id="nameOnCard"
              name="nameOnCard"
              placeholder="Name on Card"
              value={formik.values.nameOnCard}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nameOnCard && Boolean(formik.errors.nameOnCard)
              }
              helperText={formik.touched.nameOnCard && formik.errors.nameOnCard}
              sx={{ ...textFieldStyle, mb: 2 }}
            />

            <Box sx={{ display: "flex", gap: 2, width: "100%", mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="Expiry Date (MM/YY)"
                  value={formik.values.expiryDate}
                  onChange={(e: any) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 2) {
                      value =
                        value.substring(0, 2) + "/" + value.substring(2, 4);
                    }
                    formik.setFieldValue("expiryDate", value);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.expiryDate &&
                    Boolean(formik.errors.expiryDate)
                  }
                  helperText={
                    formik.touched.expiryDate && formik.errors.expiryDate
                  }
                  sx={textFieldStyle}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  id="cvv"
                  name="cvv"
                  placeholder="CVV"
                  type="password"
                  value={formik.values.cvv}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                  helperText={formik.touched.cvv && formik.errors.cvv}
                  sx={textFieldStyle}
                />
              </Box>
            </Box>
          </>
        ) : (
          <TextField
            fullWidth
            id="upiId"
            name="upiId"
            placeholder="example@ybl"
            value={formik.values.upiId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.upiId && Boolean(formik.errors.upiId)}
            helperText={formik.touched.upiId && formik.errors.upiId}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceOutlinedIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ ...textFieldStyle, mb: 2 }}
          />
        )}

        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={onBack}
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
            Back to Shipping
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
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
            Review Order
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PaymentForm;
