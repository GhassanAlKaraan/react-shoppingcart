import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/OrderCard';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Separate useEffect for user data
  useEffect(() => {
    const token = localStorage.getItem('shops-jwt');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedData = JSON.parse(atob(payload));
        setUserData(decodedData);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserData(null);
        toast.error('Error decoding authentication token');
      }
    } else {
      toast.error('No authentication token found');
      setLoading(false);
    }
  }, []);

  // Separate useEffect for fetching orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userData || !userData.id) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('shops-jwt');
        const response = await fetch(`/api/orders/user/${userData.id}/order`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data.data);
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userData]);

  // Rest of the component remains the same
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">No orders found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Order #{order.id}</span>
                  <span className="text-sm font-normal">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">{order.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">
                      ${order.totalAmount?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  {order.items && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Items:</h4>
                      <ul className="space-y-2">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;