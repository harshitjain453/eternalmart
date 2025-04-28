import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { productRoutes } from "./infra/routes/products";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./shared/store/store";
import { ThemeProvider, useTheme } from "./shared/hooks/theme-context";
import { lightTheme, darkTheme } from "./shared/theme/theme";
import { useEffect } from "react";
import { loadCartFromStorage } from "./shared/store/slice/cart/cart-slice";
import { loadProductsFromStorage } from "./shared/store/slice/product/product-slice";

function App() {
  const routes = useRoutes(productRoutes);
  useEffect(() => {
    store.dispatch(loadCartFromStorage());
    store.dispatch(loadProductsFromStorage());
  }, []);

  return (
    <div className="App">
      <ReduxProvider store={store}>
        <ThemeProvider>
          <ThemedApp>{routes}</ThemedApp>
        </ThemeProvider>
      </ReduxProvider>
    </div>
  );
}

// A wrapper component to consume the theme context
const ThemedApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useTheme();
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default App;
