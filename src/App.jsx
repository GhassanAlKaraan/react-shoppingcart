import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage.jsx";
import LoginPage from "./pages//LoginPage.jsx";
import ProductPage, { productLoader } from "./pages/ProductPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/my-cart" element={<CartPage />} />
        <Route path="/my-orders" element={<OrdersPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/products/:id" element={<ProductPage />} loader={productLoader} />
        <Route path="/edit-product/:id" element={<EditProductPage />} loader={productLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;