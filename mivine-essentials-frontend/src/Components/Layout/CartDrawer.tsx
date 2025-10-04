import { BsCartCheck } from "react-icons/bs";
import { IoEnter } from "react-icons/io5";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/Store";
// import { useNavigate } from "react-router-dom";




interface CartDrawerProps {
  openCart: boolean;
  toggleCartDrawer: () => void;
}

const CartDrawer = ({ openCart, toggleCartDrawer }: CartDrawerProps) => {
  const navigate = useNavigate();
  const {user, guestId} = useSelector((state: RootState) => state.auth);
  const {cart} = useSelector((state: RootState) => state.cart);
  const userId = user ? user._id : null;
  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[23rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        openCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoEnter className="h-6 w-6 text-gray-600 hover:text-blue-600" />
        </button>
      </div>
      {/* close button */}

      {/* Scrollable cart contents */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 cart">Your Cart</h2>
        {/* Components for cart contents */}
       {cart && cart?.products?.length > 0 ? ( <CartContent cart={cart} userId={userId} guestId={guestId} />) : (
        <p>Your cart is empty.</p>)}
      </div>

      {/* check out button at the button */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
          <button onClick={handleCheckout} className="w-full bg-gray-800 py-2 text-white rounded-lg font-semibold hover:bg-black hover:text-blue-100 items-center space-x-1 transition flex justify-center">
          <BsCartCheck /> <span className="mt-0.5">Checkout</span>
        </button>
        <p className="text-xs tracking-tighter text-gray-900 font-serif mt-2 text-center">
          Shipping, taxes, and discount codes calculated at checkout.
        </p>
          </>
        )}
      </div>
      {/* check out button at the button */}
    </div>
  );
};

export default CartDrawer;
