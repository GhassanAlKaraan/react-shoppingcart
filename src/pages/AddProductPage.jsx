/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductPage = ({ addProductSubmit = () => { } }) => {

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      brand,
      price: parseFloat(price),
      inventory: parseInt(inventory),
      description,
      category: {
        name: categoryName
      },
      images: images.length > 0 ? images : null
    };

    addProductSubmit(newProduct);
    console.log('New Product:', newProduct);
    return navigate('/products');
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Product</h2>

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
            </div>

            <div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProductPage;
