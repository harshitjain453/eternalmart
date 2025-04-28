This is a modern, responsive, and performant **Single Page Application (SPA)** simulating a futuristic self-checkout experience for an automated retail store. Built with **React.js + TypeScript**, state management using **Redux Toolkit**, and animations powered by **Framer Motion**. The application fetches real-time product data from the **FakeStore API** and provides a seamless shopping and checkout flow.

---

## 🌟 Features

### 1. Product Listing Page
- Dynamic product fetching from **FakeStore API**.
- Real-time search filtering without extra API calls.
- Category-based filtering.
- Smooth hover effects and UI animations.

### 2. Product Detail Page
- Detailed view of selected products.
- Display product image, title, description, price, and category.
- Add to Cart directly from the product detail page.
- Responsive and animated transitions for a smooth UX.

### 3. Shopping Cart
- Add/Remove items to/from the cart.
- Real-time updates for cart item count and total price.
- Local storage persistence for cart data (retains cart on refresh).

### 4. Checkout Flow
- Multi-step form:
  - **Step 1**: Shipping Details.
  - **Step 2**: Payment Info.
  - **Step 3**: Order Confirmation.
- Form validation with smooth transitions and feedback.

### 5. Dark Mode Toggle
- Switch between dark and light themes.
- User preference saved in local storage.
- Smooth animated theme transitions.

---

## 🛠️ Tech Stack

- **React.js** + **TypeScript**
- **Redux Toolkit** for state management
- **Framer Motion** for animations
- **MUI (Material-UI)** for UI components and styling
- **Vite** for fast builds and optimizations


---

## 📱 UI/UX Design

- **Mobile-first** responsive design.
- Minimal, sleek, and futuristic aesthetics.
- Accessible: Compliant with **WCAG standards**.
- Designed using **Figma** before development.

---

## ⚡ Performance Optimizations

- Code splitting and lazy loading.
- Memoization for avoiding unnecessary re-renders.
- Lighthouse performance score: **90+**

---

## 🚀 Deployment

- Live demo hosted on  **[Netlify](https://eternalmartt.netlify.app/)**.
- Local storage for cart and theme persistence.


src/
│
├── features/          # Main pages (ProductList, ProductDetail, Checkout)
├── shared/            # Reusable UI components, store
├── infra/             # all api services
├── core/              # utility functions and constant data
└── App.tsx            # Root component with routing

