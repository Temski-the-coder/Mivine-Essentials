import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../Redux/Store";
import { fetchUserOrders } from "../Redux/Slices/orderSlice";


const MyOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {orders, loading, error} = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch])
  

  const handleRowClick = (orderId: string) => {
    navigate(`/order/${orderId}`)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return (
  <div className="w-full p-3 sm:p-6">
    <h2 className="text-2xl md:text-xl font-bold mb-6">My Orders</h2>

    {/* 🔹 Scrollable container to prevent overflow */}
    <div className="w-full overflow-x-auto rounded-lg shadow-md">
      <table className="w-full text-left text-gray-500 border-collapse">
        <thead className="bg-gray-200 text-xs uppercase text-gray-700">
          <tr>
            <th className="py-3 px-4 md:px-6 whitespace-nowrap">Image</th>
            <th className="py-3 px-4 md:px-6 whitespace-nowrap">Order ID</th>
            <th className="py-3 px-4 md:px-6 whitespace-nowrap">Created</th>
            <th className="py-3 px-4 md:px-6 whitespace-nowrap">Shipping Address</th>
            <th className="py-3 px-4 md:px-6 whitespace-nowrap">Items</th>
            <th className="py-3 px-4 md:px-6 whitespace-nowrap">Total Price</th>
            <th className="py-3 px-4 md:px-6 whitespace-nowrap">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders?.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-3 px-4 md:px-6">
                  <img
                    src={order.orderItems[0].image}
                    alt={order.orderItems[0].name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4 md:px-6 font-medium text-gray-600">
                  #{order._id}
                </td>
                <td className="py-3 px-4 md:px-6 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleDateString()}
                  <br />
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>
                <td className="py-3 px-4 md:px-6 break-words max-w-[200px]">
                  {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`}
                </td>
                <td className="py-3 px-4 md:px-6">
                  {order.orderItems.map((item, index) => (
                    <div key={index}>{item.name}</div>
                  ))}
                </td>
                <td className="py-3 px-4 md:px-6">₦{order.totalPrice}</td>
                <td className="py-3 px-4 md:px-6">
                  <span
                    className={`font-semibold ${
                      order.isPaid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-3 px-4 text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};


export default MyOrderPage;
