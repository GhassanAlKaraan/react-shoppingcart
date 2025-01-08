import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Minus, Plus, Trash2, Loader2 } from 'lucide-react';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [placingOrder, setPlacingOrder] = useState(false);

  const fetchCart = async () => {
    try {
      const cartId = localStorage.getItem('shops-cartId');
      const token = localStorage.getItem('shops-jwt');

      const response = await fetch(`/api/carts/${cartId}/my-cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch cart');

      const data = await response.json();
      setCart(data.data);
    } catch (error) {
      toast.error('Error loading cart');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    const cartId = localStorage.getItem('shops-cartId');
    const token = localStorage.getItem('shops-jwt');

    setUpdatingItems(prev => new Set([...prev, itemId]));

    try {
      const response = await fetch(
        `/api/cartItems/cart/${cartId}/item/${itemId}/update?quantity=${quantity}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to update quantity');

      await fetchCart();
      // toast.success('Quantity updated');
    } catch (error) {
      toast.error('Failed to update quantity: ', error.message);
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  const removeItem = async (itemId) => {
    const cartId = localStorage.getItem('shops-cartId');
    const token = localStorage.getItem('shops-jwt');

    setUpdatingItems(prev => new Set([...prev, itemId]));

    try {
      const response = await fetch(
        `/api/cartItems/cart/${cartId}/item/${itemId}/remove`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to remove item');

      await fetchCart();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item: ', error.message);
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  const placeOrder = async () => {
    const token = localStorage.getItem('shops-jwt');
    setPlacingOrder(true);

    try {
      const response = await fetch('/api/orders/order', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to place order');

      toast.success('Order placed successfully!');
      await fetchCart();
    } catch (error) {
      toast.error('Failed to place order: ', error.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
          <p className="mt-2 text-gray-600">Start shopping to add items to your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          {cart.items.map((item) => (
            <div key={item.id} className="p-6 border-b last:border-b-0">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={`/server${item.product.images[0].downloadUrl}`}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">{item.product.brand}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      disabled={updatingItems.has(item.id)}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      {updatingItems.has(item.id) ?
                        <Loader2 className="h-5 w-5 animate-spin" /> :
                        <Trash2 className="h-5 w-5" />
                      }
                    </button>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || updatingItems.has(item.id)}
                        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="w-8 text-center font-medium">
                        {updatingItems.has(item.id) ?
                          <Loader2 className="h-5 w-5 animate-spin mx-auto" /> :
                          item.quantity
                        }
                      </span>

                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.inventory || updatingItems.has(item.id)}
                        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        ${item.unitPrice} × {item.quantity}
                      </div>
                      <div className="text-lg font-medium text-gray-900">
                        ${item.totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">${cart.totalAmount}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={placingOrder}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 flex justify-center items-center"
          >
            {placingOrder ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Placing Order...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;