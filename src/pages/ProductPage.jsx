import { useState } from "react";
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const product = useLoaderData();

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

  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`/api/products/product/${productId}/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZW1haWwuY29tIiwiaWQiOjYsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzM2MzI1OTA4LCJleHAiOjE3MzYzOTc5MDh9.jRFadIvV9XxkUS1OfYH4FTY32DP_1PEleSn8l1tZrdk'
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Could not delete product');
      }
      toast.success("Product Deleted Successfully.");
    } catch (error) {
      toast.error(error.message || "Could Not Delete Product. Please try again later.");
      return null;
    }
  };

  const onDeleteClick = (productId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this listing?');
      if (!confirm) return;
      deleteProduct(productId);
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };

  // const handleImageUpload = async (event) => {
  //   const files = event.target.files;
  //   if (!files) return;

  //   const formData = new FormData();
  //   formData.append('image', files);

  //   try {
  //     const res = await fetch(`/api/images/upload?productId=${product.id}`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZW1haWwuY29tIiwiaWQiOjYsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzM2MzI1OTA4LCJleHAiOjE3MzYzOTc5MDh9.jRFadIvV9XxkUS1OfYH4FTY32DP_1PEleSn8l1tZrdk'
  //       },
  //       body: formData
  //     });

  //     const data = await res.json();
  //     if (!res.ok) {
  //       throw new Error(data.message || 'Could not upload image');
  //     }

  //     toast.success("Image Uploaded Successfully.");
  //     navigate(`/product/${product.id}`);
  //   } catch (error) {
  //     toast.error(error.message || "Could Not Upload Image. Please try again later.");
  //   }
  // };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const formData = new FormData();
    // For single file upload
    // formData.append('image', files[0]);

    // For multiple files upload, use this instead:
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const res = await fetch(`/api/images/upload?productId=${product.id}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZW1haWwuY29tIiwiaWQiOjYsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzM2MzI1OTA4LCJleHAiOjE3MzYzOTc5MDh9.jRFadIvV9XxkUS1OfYH4FTY32DP_1PEleSn8l1tZrdk'
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Could not upload image');
      }

      toast.success("Image Uploaded Successfully.");
      navigate(`/products/${product.id}`);
    } catch (error) {
      toast.error(error.message || "Could Not Upload Image. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-br">
      <div className="from-white to-gray-100 rounded-2xl shadow-lg relative overflow-hidden max-w-[600px] mx-auto mt-2">
        <div className="p-6">
          {/* Product Details */}
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-500">{product.brand}</span>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{product.name}</h3>
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
              </div>) : <div className="flex justify-center align-middle text-sm text-gray-400">No Image</div>}

            {product.images.length > 1 && (
              <>
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
              </>
            )}
            <div className="flex justify-end mt-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                multiple
                onChange={handleImageUpload}
              />
              <label
                htmlFor="imageUpload"
                className="flex text-gray-500 text-sm justify-end max-w-max hover:text-red-600 cursor-pointer border-2 border-gray-500 hover:border-red-600 rounded-xl px-2"
              >
                Add Photos <IoMdCloudUpload className="text-xl ml-2 mt-0" />
              </label>
            </div>

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

          <div className="flex gap-3">
            {/* Delete Button */}
            <button onClick={() => onDeleteClick(product.id)}
              className="w-full h-[42px] text-red-600 hover:bg-red-100 font-bold rounded-lg border-2 border-red-600 flex justify-center items-center transition-all duration-200 mt-4"
            >
              Delete Product
            </button>

            {/* Edit Link */}
            <Link
              to={`/edit-product/${product.id}`}
              className="w-full h-[42px] bg-black hover:bg-gray-800 text-white font-medium rounded-lg shadow-md flex justify-center items-center transition-all duration-200 mt-4"
            >
              Edit Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const productLoader = async ({ params }) => {
  const res = await fetch(`/api/products/product/${params.id}/product`);
  const data = await res.json();
  return data.data;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ProductPage as default, productLoader };
