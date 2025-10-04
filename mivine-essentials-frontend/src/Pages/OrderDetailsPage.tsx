import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Redux/Store";
import { fetchOrderDetails } from "../Redux/Slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { orderDetails, loading, error } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    if (id) dispatch(fetchOrderDetails(id));
  }, [id, dispatch]);

  if (loading) return <p>Loading order...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orderDetails) return <p>No order details found</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      <div className="p-6 md:p-4 rounded-lg border">
        <div className="flex justify-between mb-8">
          <h3 className="text-lg font-semibold">Order #{orderDetails._id}</h3>
          <p>{new Date(orderDetails.createdAt).toLocaleString()}</p>
        </div>

        {/* Order Items */}
        <table className="min-w-full text-gray-600 mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Qty</th>
              <th className="py-2 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.orderItems.map((item) => (
              <tr key={item.productId} className="border-b">
                <td className="py-2 px-4 flex items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 mr-3 rounded" />
                  <Link to={`/product/${item.productId}`} className="text-blue-600 hover:underline">
                    {item.name}
                  </Link>
                </td>
                <td className="py-2 px-4">₦{item.price.toLocaleString()}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">₦{(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/my-orders" className="text-blue-500 hover:underline">
          Back To My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;