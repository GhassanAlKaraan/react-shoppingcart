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
import { jobLoader } from "./pages/JobPage.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import EditJobPage from "./pages/EditJobPage.jsx";

//
import { toast } from "react-toastify";
//

const App = () => {

  const addProduct = async (newProduct) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    const data = await res.json();
    const success = res.ok;

    console.log('Product Added:', data);
    if (!success) { toast.error("Could Not Add Product. Please try again later."); }
    else { toast.success("Product Added Successfully."); }
  };

  // const deleteJob = async (id) => {
  //   const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
  //   const success = res.ok;
  //   console.log(success ? `Job deleted successfully: ${id}` : `Could not delete job: ${id}`);
  //   if (!success) { toast.error("Could Not Delete Job. Please try again later."); }
  //   else { toast.success("Job Deleted Successfully."); }
  // };

  const updateJob = async (id, updatedJob) => {
    const res = await fetch(`/api/jobs/${id}`, { method: 'PUT', body: JSON.stringify(updatedJob) });
    const success = res.ok;
    console.log(success ? `Job updated successfully: ${id}` : `Could not update job: ${id}`);
    if (!success) { toast.error("Could Not Update Job. Please try again later."); }
    else { toast.success("Job Updated Successfully."); }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/add-product" element={<AddProductPage addJobSubmit={addProduct} />} />
        {/* <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} /> */}
        <Route path="/edit-product/:id" element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;