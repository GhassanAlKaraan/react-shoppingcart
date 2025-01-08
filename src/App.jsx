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
import NotFoundPage from "./pages/NotFound.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";


const App = () => {

  // const updateProduct = async (id, updatedJob) => {
  //   const res = await fetch(`/api/jobs/${id}`, { method: 'PUT', body: JSON.stringify(updatedJob) });
  //   const success = res.ok;
  //   console.log(success ? `Job updated successfully: ${id}` : `Could not update job: ${id}`);
  //   if (!success) { toast.error("Could Not Update Job. Please try again later."); }
  //   else { toast.success("Job Updated Successfully."); }
  // };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
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