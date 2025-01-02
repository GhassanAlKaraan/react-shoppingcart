/* eslint-disable react/prop-types */
import { FaCartShopping } from "react-icons/fa6";

const ProductListing = ({ product }) => {

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{product.brand}</div>
          <h3 className="text-xl font-bold">{product.name}</h3>
        </div>

        <div className="mb-5">
          {product.description}
        </div>

        <h3 className="text-indigo-500 mb-2">${product.price}</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3 flex">
            {product.category.name}
          </div>
          <button
            className="h-[36px] bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md text-center text-sm inline-flex items-center">
            Add <span className="ml-2"><FaCartShopping /></span>
          </button>
        </div>
      </div>
      <div className="absolute top-4 right-4 flex space-x-2">
        {product.images.map((image) => (
          <img
            key={image.imageId}
            src={image.downloadUrl}
            alt={image.imageName}
            className="w-16 h-16 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
