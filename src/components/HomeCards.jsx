import { Link } from "react-router-dom";
import Card from "./Card";
const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">


          <Card>
            <h2 className="text-2xl font-bold">For Users</h2>
            <p className="mt-2 mb-4">
              Browse our products and find the perfect one for you
            </p>
            <Link
              to="/products"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Products
            </Link>
          </Card>


          <Card bg="bg-red-100">
            <h2 className="text-2xl font-bold">For Admins</h2>
            <p className="mt-2 mb-4">
              Manage products and users in the admin panel
            </p>
            <Link
              to="/add-product"
              className="inline-block bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
            >
              Add Product
            </Link>
            <Link
              to="/add-user"
              className="inline-block bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 ml-2"
            >
              Add User
            </Link>
          </Card>


        </div>
      </div>
    </section>
  );
};

export default HomeCards;
