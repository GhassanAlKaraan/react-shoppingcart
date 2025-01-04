/* eslint-disable react/prop-types */
import { useState } from "react";

const SearchDialog = ({ onSearch, onClose }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    onSearch({ name, brand, category });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Search Products</h2>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-4">Cancel</button>
          <button onClick={handleSearch} className="bg-red-700 text-white px-4 py-2 rounded">Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
