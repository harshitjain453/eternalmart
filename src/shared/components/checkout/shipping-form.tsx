import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  useTheme,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  saveInfo: boolean;
}

// Define interface for errors
interface FormErrors {
  [key: string]: string;
}

// Define component props
interface ShippingFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  onSubmit,
  initialData = {},
}) => {
  const theme = useTheme();

  const [formData, setFormData] = useState<FormData>({
    email: initialData.email || "",
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    address: initialData.address || "",
    apartment: initialData.apartment || "",
    city: initialData.city || "",
    state: initialData.state || "",
    pincode: initialData.pincode || "",
    phone: initialData.phone || "",
    saveInfo: initialData.saveInfo || false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: string, value: string | boolean): string => {
    if (typeof value === "boolean") return "";

    switch (name) {
      case "email":
        return value && !/\S+@\S+\.\S+/.test(value)
          ? "Please enter a valid email address"
          : "";
      case "firstName":
      case "lastName":
        return !value
          ? `${name === "firstName" ? "First" : "Last"} name is required`
          : "";
      case "address":
        return !value ? "Address is required" : "";
      case "city":
        return !value ? "City is required" : "";
      case "state":
        return !value ? "State is required" : "";
      case "pincode":
        return !value
          ? "PIN code is required"
          : !/^[0-9]{6}$/.test(value)
          ? "PIN code must be 6 digits"
          : "";
      case "phone":
        return !value
          ? "Phone number is required"
          : !/^[0-9]{10}$/.test(value)
          ? "Phone number must be 10 digits"
          : "";
      default:
        return "";
    }
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === "checkbox" ? checked : value;

      setFormData((prev) => ({ ...prev, [name]: fieldValue }));
      const errorMessage = validateField(name, fieldValue);
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    },
    [validateField]
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "apartment" && key !== "saveInfo") {
        const errorMessage = validateField(key, value);
        if (errorMessage) {
          newErrors[key] = errorMessage;
          hasErrors = true;
        }
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      onSubmit(formData);
    }
  };

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

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
          Delivery
        </Typography>

        <FormControl fullWidth sx={{ ...textFieldStyle, mb: 2 }}>
          <InputLabel
            sx={{
              fontSize: "0.7rem",
              transform: "translate(14px, 8px) scale(1)",
            }}
          >
            Country/Region
          </InputLabel>
          <Select
            defaultValue="India"
            sx={{ pt: 1 }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value="India">India</MenuItem>
          </Select>
        </FormControl>

        {/* Name fields with equal width distribution */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              name="firstName"
              placeholder="First name (optional)"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={textFieldStyle}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={textFieldStyle}
            />
          </Box>
        </Box>

        <TextField
          fullWidth
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={{ ...textFieldStyle, mb: 2 }}
        />

        <TextField
          fullWidth
          name="apartment"
          placeholder="Apartment, suite, etc. (optional)"
          value={formData.apartment}
          onChange={handleChange}
          sx={{ ...textFieldStyle, mb: 2 }}
        />

        {/* City, state, PIN fields with equal width distribution */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            mb: 2,
            // Make it responsive - stack on small screens
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              sx={textFieldStyle}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
              sx={textFieldStyle}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              name="pincode"
              placeholder="PIN code"
              value={formData.pincode}
              onChange={handleChange}
              error={!!errors.pincode}
              helperText={errors.pincode}
              sx={textFieldStyle}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            mb: 2,
          }}
        >
          <TextField
            fullWidth
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            sx={{ ...textFieldStyle, mb: 2 }}
          />
          <TextField
            fullWidth
            name="email"
            placeholder="Email or mobile phone number"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ ...textFieldStyle, mb: 3 }}
          />
        </Box>

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
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
          }}
        >
          Continue to payment
        </Button>
      </form>
    </Box>
  );
};

export default ShippingForm;
