/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaBullseye } from "react-icons/fa";

const ProductListing = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg relative overflow-hidden">
      <div className="p-6">
        {/* Product Details */}
        <div className="flex justify-between align-bottom">
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-500">{product.brand}</span>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{product.name}</h3>
          </div>
          <Link
            to="/"
            className="inline-block py-4"
          >
            <FaBullseye className="text-2xl text-indigo-700" />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative mb-6">
          {product.images.length > 0 ? (
            <div className="relative w-full h-48 overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`/server${image.downloadUrl}`}
                    alt={image.imageName}
                    className="w-full h-48 object-contain flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          ) : <div className="flex justify-center align-middle text-sm text-gray-400">No Image</div>}

          {
            product.images.length > 1 ? (<>
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-black"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md hover:bg-red-600"
              >
                ›
              </button>
            </>) : null}


        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg text-indigo-700 font-semibold">
              ${product.price}
            </h3>
            <span className="text-sm text-gray-500">{product.inventory} left</span>
          </div>
          <div className="text-orange-700 font-medium text-sm">
            {product.category.name}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full h-[42px] bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg shadow-md flex justify-center items-center transition-all duration-200">
          Add to Cart <FaCartShopping className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
