import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              className="sm:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6 text-gray-500" />
            </button>
            <Link to="/" className="text-2xl font-bold text-[#b4166d]">
              Decena
            </Link>
          </div>

          <div className="hidden sm:flex space-x-8">
            <Link to="/menu" className="text-gray-600 hover:text-[#b4166d]">
              Menu
            </Link>
            <Link to="/orders" className="text-gray-600 hover:text-[#b4166d]">
              Orders
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-[#b4166d]"
                >
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-[#b4166d]"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-[#b4166d]">
                Login
              </Link>
            )}
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#b4166d] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white border-t`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/menu"
            className="block px-3 py-2 text-gray-600 hover:bg-[#b4166d]"
          >
            Menu
          </Link>
          <Link
            to="/orders"
            className="block px-3 py-2 text-gray-600 hover:bg-[#b4166d]"
          >
            Orders
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
