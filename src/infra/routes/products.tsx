import { lazy } from "react";
import ProductLayout from "../../shared/layout/product";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../core/paths";

// Lazy load components
const ProductListing = lazy(() => import("../../feature/product-listing"));
const ProductDetail = lazy(() => import("../../feature/product-detail"));
const CheckoutPage = lazy(() => import("../../feature/checkout-page"));
const ViewCartPage = lazy(() => import("../../feature/cart"));
const OrderSummary = lazy(() => import("../../feature/order-success"));

export const productRoutes = [
  {
    path: "/", // Redirect root to /product
    element: <Navigate to={paths.productListing.allProducts} replace />,
  },
  {
    path: "product",
    element: (
      <ProductLayout>
        <Outlet />
      </ProductLayout>
    ),
    children: [
      { path: paths.productListing.allProducts, element: <ProductListing /> },
      { path: paths.productDetail.singleProduct, element: <ProductDetail /> },
    ],
  },
  {
    path: "cart",
    element: (
      <ProductLayout>
        <Outlet />
      </ProductLayout>
    ),
    children: [{ path: paths.cart.cartPage, element: <ViewCartPage /> }],
  },
  {
    path: "checkout",
    element: (
      <ProductLayout>
        <Outlet />
      </ProductLayout>
    ),
    children: [
      { path: paths.checkOut.checkOutPage, element: <CheckoutPage /> },
    ],
  },
  {
    path: "orderSummary",
    element: (
      <ProductLayout>
        <Outlet />
      </ProductLayout>
    ),
    children: [{ path: paths.order.orderSummary, element: <OrderSummary /> }],
  },
];
