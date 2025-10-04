import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../Redux/Store";
import { fetchOrderDetails } from "../Redux/Slices/orderSlice";
import { clearCart } from "../Redux/Slices/cartSlice";

const OrderConfirmationPage = () => {
  const { id: orderId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { orderDetails, loading, error } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetails(orderId));
    } else {
      navigate("/my-orders");
    }
  }, [orderId, dispatch, navigate]);

  // Clear cart once we have a confirmed order
  useEffect(() => {
    if (orderDetails?._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    }
  }, [orderDetails, dispatch]);

  const subtotal = useMemo(() => {
    if (!orderDetails?.orderItems) return 0;
    return orderDetails.orderItems.reduce(
      (acc: number, item) => acc + item.price * item.quantity,
      0
    );
  }, [orderDetails]);

  if (loading) return <p>Loading order...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orderDetails) return <p>No order found</p>;

  const calculateEstimatedDelivery = (createdAt: Date | string) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); // 10 days
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank you for your Purchase!
      </h1>

      <div className="p-6 rounded-lg border shadow-sm">
        <div className="flex justify-between mb-10">
          <div>
            <h2 className="text-xl font-semibold">Order ID: {orderDetails._id}</h2>
            <p className="text-gray-500">
              Order Date: {new Date(orderDetails.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-emerald-700 text-sm">
              Estimated Delivery: {calculateEstimatedDelivery(orderDetails.createdAt)}
            </p>
          </div>
        </div>

        {/* ✅ Use orderItems */}
        <div className="mb-10">
          {orderDetails.orderItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center mb-4 border-b pb-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover mr-4"
              />
              <div>
                <h4 className="text-md font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.color} | {item.size}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-md font-semibold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment</h4>
            <p className="text-gray-700">{orderDetails.paymentMethod}</p>
            <p className="font-medium">Total Paid: ₦{subtotal.toLocaleString()}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
            <p className="text-gray-500">{orderDetails.shippingAddress.address}</p>
            <p className="text-gray-500">
              {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

