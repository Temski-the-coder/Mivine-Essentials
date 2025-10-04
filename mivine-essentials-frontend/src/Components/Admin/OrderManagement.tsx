import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../Redux/Store";
import { useEffect } from "react";
import { fetchAdminOrders, updateOrderStatus } from "../../Redux/Slices/adminOrderSlice";


const OrderManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {user} = useSelector((state: RootState) => state.auth);
  const { orders, loading, error} = useSelector((state: RootState) => state.adminOrder);

  useEffect(() => {
    if(!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAdminOrders());
    }
  }, [dispatch, user, navigate])

  const handleStatusChange = (orderId: string, status: string) => {
    dispatch(updateOrderStatus({ orderId, status}))
  };

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}...</p>

  return (
    <div className="max-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-300 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((orders) => (
                <tr key={orders._id} className="border-b cursor-pointer">
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{orders._id}
                  </td>
                  <td className="p-4">{orders.user.name}</td>
                  <td className="p-4">₦{orders.totalPrice.toFixed(2)}</td>
                  <td className="p-4">
                    {" "}
                    <select
                      value={orders.status}
                      onChange={(e) =>
                        handleStatusChange(orders._id, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleStatusChange(orders._id, "Delivered")
                      }
                      className="bg-green-500 text-xs md:text-md flex text-white px-15 md:px-4 py-0.5 md:py-2 rounded hover:bg-green-700"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">
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

export default OrderManagement;
