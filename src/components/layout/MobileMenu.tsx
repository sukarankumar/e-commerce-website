import { NavLink, Link } from 'react-router-dom';
import { User, ShoppingBag, Heart, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-white md:hidden">
      <div className="container-custom py-6">
        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <NavLink 
              to="/" 
              onClick={onClose}
              className={({ isActive }) => 
                `block py-2 text-base font-medium ${
                  isActive ? 'text-primary-900' : 'text-gray-600'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              onClick={onClose}
              className={({ isActive }) => 
                `block py-2 text-base font-medium ${
                  isActive ? 'text-primary-900' : 'text-gray-600'
                }`
              }
            >
              Shop
            </NavLink>
            {isAuthenticated && user?.role === 'admin' && (
              <NavLink 
                to="/admin" 
                onClick={onClose}
                className={({ isActive }) => 
                  `block py-2 text-base font-medium ${
                    isActive ? 'text-primary-900' : 'text-gray-600'
                  }`
                }
              >
                Admin
              </NavLink>
            )}
          </div>
          
          <div className="h-px bg-gray-200"></div>
          
          {isAuthenticated ? (
            <div className="space-y-3">
              <Link 
                to="/account" 
                onClick={onClose}
                className="flex items-center py-2 text-base font-medium text-gray-600"
              >
                <User size={20} className="mr-3" />
                My Account
              </Link>
              <Link 
                to="/account/orders" 
                onClick={onClose}
                className="flex items-center py-2 text-base font-medium text-gray-600"
              >
                <ShoppingBag size={20} className="mr-3" />
                My Orders
              </Link>
              <Link 
                to="/account/wishlist" 
                onClick={onClose}
                className="flex items-center py-2 text-base font-medium text-gray-600"
              >
                <Heart size={20} className="mr-3" />
                My Wishlist
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  onClick={onClose}
                  className="flex items-center py-2 text-base font-medium text-gray-600"
                >
                  <Settings size={20} className="mr-3" />
                  Admin Dashboard
                </Link>
              )}
              <button 
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex w-full items-center py-2 text-base font-medium text-gray-600"
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link 
                to="/login" 
                onClick={onClose}
                className="block w-full rounded-md bg-primary-900 py-2 text-center text-base font-medium text-white"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                onClick={onClose}
                className="block w-full rounded-md border border-gray-300 bg-white py-2 text-center text-base font-medium text-primary-900"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;