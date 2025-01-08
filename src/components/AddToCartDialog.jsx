/* eslint-disable react/prop-types */
import { useState } from 'react';

const AddToCartDialog = ({ isOpen, onClose, onAdd, product }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const incrementQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(q => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleSubmit = async () => {
    await onAdd(product.id, quantity);
    setQuantity(1); // Reset quantity
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add to Cart</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full text-xl"
          >
            X
          </button>
        </div>

        {/* Product Preview */}
        <div className="flex gap-4 mb-6">
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={product.images.length > 0 ? `/server${product.images[0].downloadUrl}` : ''}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <p className="text-indigo-700 font-semibold mt-1">${product.price}</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity ({product.inventory} available)
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 text-xl"
            >
              -
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= product.inventory}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 text-xl"
            >
              +
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-gray-700">Total:</span>
          <span className="text-lg font-bold text-indigo-700">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartDialog;