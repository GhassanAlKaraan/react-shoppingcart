
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
//


const AddProductPage = () => {

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  // const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const addProduct = async (newProduct) => {
    try {
      const res = await fetch(`/api/products/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZW1haWwuY29tIiwiaWQiOjYsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzM2MzI1OTA4LCJleHAiOjE3MzYzOTc5MDh9.jRFadIvV9XxkUS1OfYH4FTY32DP_1PEleSn8l1tZrdk'
        }, body: JSON.stringify(newProduct)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Could not add product');
      }

      toast.success("Product Added Successfully.");
      return data.id;
    } catch (error) {
      toast.error(error.message || "Could Not Add Product. Please try again later.");
      return null;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newProduct = {
        name: name,
        brand: brand,
        price: price,
        inventory: inventory,
        description: description,
        category: categoryName
      };

      const productId = await addProduct(newProduct);

      if (productId) {
        navigate(`/edit-product/${productId}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to add product. Please try again.");
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
              <h2 className="text-3xl text-center font-semibold mb-6">Add Product</h2>

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

              {/* attach images
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Images</label>
              <input
                type="file"
                id="images"
                name="images"
                className="border rounded w-full py-2 px-3 mb-2"
                multiple
                onChange={(e) => setImages([...e.target.files])}
              />
            </div> */}

              {/* Submit Button */}
              <div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add & Continue
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddProductPage;
