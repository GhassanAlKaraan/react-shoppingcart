import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
const MainLayout = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;