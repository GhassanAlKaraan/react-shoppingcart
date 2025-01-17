import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const EditProductPage = () => {
  const product = useLoaderData();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
      setInventory(product.inventory);
      setDescription(product.description);
      setCategoryName(product.category.name);
    }
  }, [product]);

  const updateProduct = async (updatedProduct) => {
    try {
      const token = localStorage.getItem('shops-jwt');
      const res = await fetch(`/api/products/product/${product.id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct)
      });

      if (res.status === 401) {
        navigate('/login');
        toast.error("Please login as admin first.");
        return null;
      }
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Could not update product');
      }

      toast.success("Product Updated Successfully.");
      return data.id;
    } catch (error) {
      toast.error(error.message || "Could Not Update Product. Please try again later.");
      return null;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedProduct = {
        name: name,
        brand: brand,
        price: price,
        inventory: inventory,
        description: description,
        category: categoryName
      };
      await updateProduct(updatedProduct);
      navigate(`/products/${product.id}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        {loading ? <Spinner /> : (
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center font-semibold mb-6">Edit Product Details</h2>

              {/* name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* brand */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Brand"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              {/* price */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* inventory */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Inventory</label>
                <input
                  type="number"
                  id="inventory"
                  name="inventory"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Inventory"
                  required
                  value={inventory}
                  onChange={(e) => setInventory(e.target.value)}
                />
              </div>

              {/* description */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* category */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Category"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditProductPage;
