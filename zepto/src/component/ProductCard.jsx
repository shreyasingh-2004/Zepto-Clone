import { useState } from "react";
import { Plus, Minus, ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = cart.find((item) => item.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setQuantity(1);
    setTimeout(() => setIsAdding(false), 300);
  };

  // Fake Store API returns prices in USD; convert to INR for display
  const USD_TO_INR = 83;

  const formatPrice = (usdPrice) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(usdPrice * USD_TO_INR);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {currentQuantity > 0 && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-lg">
            {currentQuantity} in cart
          </div>
        )}
        {product.rating && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium">{product.rating.rate}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <p className="text-xs text-gray-500 capitalize">{product.category}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.price * 1.3)}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {product.rating?.count || 0} sold
          </span>
        </div>

        {/* Quantity stepper — only shown before the item is in the cart */}
        {currentQuantity === 0 && (
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Decrease quantity to add"
            >
              <Minus className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <span className="text-sm font-medium min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Increase quantity to add"
            >
              <Plus className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Add to Cart / Quantity Controls */}
        {currentQuantity > 0 ? (
          <div className="flex items-center justify-between bg-primary/5 rounded-lg p-1.5 border border-primary/20">
            <button
              onClick={() => {
                if (currentQuantity === 1) {
                  removeFromCart(product.id);
                } else {
                  updateQuantity(product.id, currentQuantity - 1);
                }
              }}
              className="p-1.5 hover:bg-primary/20 rounded-full transition-colors"
            >
              <Minus className="w-4 h-4 text-primary" />
            </button>
            <span className="font-medium text-sm min-w-[24px] text-center">
              {currentQuantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, currentQuantity + 1)}
              className="p-1.5 hover:bg-primary/20 rounded-full transition-colors"
            >
              <Plus className="w-4 h-4 text-primary" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-2.5 bg-primary text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
              isAdding ? "opacity-70 scale-95" : "hover:bg-primary/90 hover:scale-105"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
