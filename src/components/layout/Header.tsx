import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import SearchBar from '../search/SearchBar';
import MobileMenu from './MobileMenu';
import Logo from '../ui/Logo';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { items } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);
  
  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-900 ${
                  isActive ? 'text-primary-900' : 'text-gray-600'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-900 ${
                  isActive ? 'text-primary-900' : 'text-gray-600'
                }`
              }
            >
              Shop
            </NavLink>
            {isAuthenticated && user?.role === 'admin' && (
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-primary-900 ${
                    isActive ? 'text-primary-900' : 'text-gray-600'
                  }`
                }
              >
                Admin
              </NavLink>
            )}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search toggle */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {/* Account */}
            <div className="hidden md:block">
              <Link 
                to={isAuthenticated ? "/account" : "/login"}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label={isAuthenticated ? "Account" : "Login"}
              >
                <User size={20} />
              </Link>
            </div>
            
            {/* Wishlist */}
            <div className="hidden md:block">
              <Link 
                to="/account/wishlist"
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>
            </div>
            
            {/* Cart */}
            <Link 
              to="/cart"
              className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-400 text-[10px] font-medium text-white">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Search bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-3">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </div>
      
      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}

export default Header;