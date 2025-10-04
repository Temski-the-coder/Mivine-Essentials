import { IoPricetags } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../Redux/Slices/cartSlice";
import type { AppDispatch } from "../../Redux/Store";
import type { Cart } from "../../Redux/Slices/cartSlice";

const CartContent = ({ cart, userId, guestId }: { cart: Cart; userId: string | null; guestId: string | null }) => {
const dispatch = useDispatch<AppDispatch>();

// Handling adding and subtracting to cart
const handleAddToCart = (productId: string, delta: number, quantity: number, size: string, color: string) => {
  const newQuantity = quantity + delta;
  if (newQuantity < 1) return; // Prevent quantity from going below 1

  dispatch(updateCartItemQuantity({
    productId,
    quantity: newQuantity,
    size: size,
    color: color,
    userId: userId,
    guestId: guestId,
  }));
};

// handling removing from cart
const handleRemoveFromCart = (productId: string, name: string, price: number, image: string, size: string, color: string, quantity: number) => {
  dispatch(removeFromCart({productId, name, price, image, size, quantity, color, userId, guestId}));
}
// const cartTotal = cart.products.reduce((sum, product) => {
//   return sum + product.price * product.quantity;
// }, 0);

return (
  <div>
    {cart.products.length === 0 ? (
      <div className="text-center py-10 text-gray-500">Your cart is empty.</div>
    ) : (
      <>
        {cart.products.map((product) => {
          return (
            <div
              key={product.productId}
              className="flex items-start justify-between py-4 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4 rounded"
                />
                <div>
                  <h3>{product.name}</h3>
                  <p className="text-sm text-gray-500">Size: {product.size}</p>
                  <div className="flex items-start mt-2 gap-0.5">
                    <button
                      className="border rounded px-2 py-1 text-xl font-medium"
                      onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)}
                    >
                      -
                    </button>
                    <span className="mx-4 mt-2">{product.quantity}</span>
                    <button
                      className="border rounded px-2 py-1 text-xl font-medium"
                      onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(product.productId, product.name, product.price, product.image, product.size, product.color, product.quantity)}
                    className="mt-3 text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p>
                  ₦{(product.price * product.quantity).toLocaleString("en-NG", {
                    minimumFractionDigits: 0,
                  })}
                </p>
                <IoPricetags className="h-6 w-6 mt-2 ml-auto" />
              </div>
            </div>
          );
        })}
        <div className="mt-6 border-t pt-4 text-right">
          <p className="text-lg font-semibold">
            Total: ₦
            {cart.products.reduce((sum, product) => {
              return sum + product.price * product.quantity;
            }, 0).toLocaleString("en-NG", { minimumFractionDigits: 0 })}
          </p>
        </div>
      </>
    )}
  </div>
);
};

export default CartContent;
