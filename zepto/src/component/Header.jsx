import { useState } from "react";
import {
  ShoppingCart,
  Search,
  MapPin,
  Menu,
  X,
  User,
  Package,
} from "lucide-react";

import { useCartStore } from "../store/cartStore";
import CartSidebar from "./CartSidebar";

const Header = ({ onSearch }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = useCartStore((state) => state.getTotalItems());

  const handleSearch = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container-custom">
          {/* ================= HEADER TOP ================= */}
          <div className="flex items-center justify-between h-16">
            {/* ================= LEFT SIDE ================= */}
            <div className="flex items-center space-x-3">
              {/* Hamburger - MOBILE ONLY */}
              <button
                type="button"
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* Logo */}
              <div className="flex items-center space-x-2">
                <Package className="w-6 h-6 text-primary" />
                <span className="text-2xl font-bold text-primary">Zepto</span>
                <span className="text-xs text-gray-400 ml-1">clone</span>
              </div>
            </div>

            {/* ================= LOCATION ================= */}
            {/* DESKTOP ONLY */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-gray-600">Deliver to</span>
              <span className="font-semibold">New York</span>
            </div>

            {/* ================= DESKTOP SEARCH ================= */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xl mx-4"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </form>

            {/* ================= RIGHT SIDE ================= */}
            <div className="flex items-center space-x-2">
              {/* MOBILE SEARCH BUTTON */}
              <button
                type="button"
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                {isMobileSearchOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </button>

              {/* CART - ALL DEVICES */}
              <button
                type="button"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* SIGN IN - DESKTOP ONLY */}
              <button
                type="button"
                className="hidden md:flex items-center space-x-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>
          </div>

          {/* ================= MOBILE MENU ================= */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col gap-3 text-sm">
                <button
                  type="button"
                  className="text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Home
                </button>
                <button
                  type="button"
                  className="text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Categories
                </button>
                <button
                  type="button"
                  className="text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Orders
                </button>
                <button
                  type="button"
                  className="text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          {/* ================= MOBILE SEARCH ================= */}
          {isMobileSearchOpen && (
            <div className="md:hidden pb-4 pt-2">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* CART SIDEBAR */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
