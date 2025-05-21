import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import Logo from '../ui/Logo';

function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About */}
          <div className="space-y-6">
            <Logo color="white" />
            <p className="max-w-xs text-gray-300">
              Discover premium quality products with LuxeMarket. We bring you the finest selection from around the world.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-primary-800 p-2 text-white hover:bg-primary-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-primary-800 p-2 text-white hover:bg-primary-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-primary-800 p-2 text-white hover:bg-primary-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Shopping</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-gray-300 hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="text-gray-300 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=home" className="text-gray-300 hover:text-white transition-colors">
                  Home & Decor
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-gray-300 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Account */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-300 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="text-gray-300 hover:text-white transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/account/wishlist" className="text-gray-300 hover:text-white transition-colors">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin size={20} className="mr-2 flex-shrink-0 text-accent-400" />
                <span className="text-gray-300">
                  123 Luxury Avenue, Fashion District, 10001 New York
                </span>
              </li>
              <li className="flex">
                <Phone size={20} className="mr-2 flex-shrink-0 text-accent-400" />
                <a href="tel:+11234567890" className="text-gray-300 hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex">
                <Mail size={20} className="mr-2 flex-shrink-0 text-accent-400" />
                <a href="mailto:support@luxemarket.com" className="text-gray-300 hover:text-white transition-colors">
                  support@luxemarket.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-primary-800 pt-8">
          <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} LuxeMarket. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;