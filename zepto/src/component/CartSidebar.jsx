import { useCartStore } from "../store/cartStore";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } =
    useCartStore();
  const totalPrice = getTotalPrice();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full sm:w-96 w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {totalItems} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-xl"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-24 h-24 mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg font-medium">
                Your cart is empty
              </p>
              <p className="text-sm text-gray-400">
                Start adding some products!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl hover:shadow-sm transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-white rounded-lg p-1"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">
                    {item.title}
                  </h4>
                  <p className="text-primary font-semibold text-sm">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <button
                      onClick={() => {
                        if (item.quantity === 1) {
                          removeFromCart(item.id);
                        } else {
                          updateQuantity(item.id, item.quantity - 1);
                        }
                      }}
                      className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors border border-gray-200 font-bold w-6 h-6 flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3 text-gray-700" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors border border-gray-200 font-bold w-6 h-6 flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3 text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <p className="text-sm font-bold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-lg font-bold">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
