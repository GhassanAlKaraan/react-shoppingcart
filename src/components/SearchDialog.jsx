/* eslint-disable react/prop-types */
import { useState } from 'react';

const SearchDialog = ({ onSearch, onClose }) => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    brand: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);

  const getFieldStatus = () => {
    return {
      name: searchParams.category !== '',
      category: searchParams.name !== '',
      brand: false
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const searchProducts = async () => {
    setLoading(true);
    let apiUrl = '/api/products/all';

    // Only construct search URL if at least one field has a value
    if (searchParams.name || searchParams.brand || searchParams.category) {
      if (searchParams.name && searchParams.brand) {
        apiUrl = `/api/products/products/by/brand-and-name?brandName=${searchParams.brand}&productName=${searchParams.name}`;
      } else if (searchParams.category && searchParams.brand) {
        apiUrl = `/api/products/products/by/category-and-brand?category=${searchParams.category}&brand=${searchParams.brand}`;
      } else if (searchParams.name) {
        apiUrl = `/api/products/products/${searchParams.name}/products`;
      } else if (searchParams.brand) {
        apiUrl = `/api/products/product/by-brand?brand=${searchParams.brand}`;
      } else if (searchParams.category) {
        apiUrl = `/api/products/product/${searchParams.category}/all/products`;
      }
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      onSearch(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      onSearch([]); // Return empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fieldStatus = getFieldStatus();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search Products</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full text-xl px-3"
          > X
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={searchParams.name}
              onChange={handleInputChange}
              disabled={fieldStatus.name}
              className="w-full p-2 border rounded-md disabled:bg-gray-100"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={searchParams.brand}
              onChange={handleInputChange}
              disabled={fieldStatus.brand}
              className="w-full p-2 border rounded-md disabled:bg-gray-100"
              placeholder="Enter brand name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={searchParams.category}
              onChange={handleInputChange}
              disabled={fieldStatus.category}
              className="w-full p-2 border rounded-md disabled:bg-gray-100"
              placeholder="Enter category"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={searchProducts}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;