import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  LogOut, 
  MapPin, 
  CreditCard, 
  Settings 
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import AccountLayout from './AccountLayout';

function AccountPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  
  // Set document title
  useEffect(() => {
    document.title = 'My Account | LuxeMarket';
  }, []);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/account');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const accountMenuItems = [
    {
      title: 'Orders',
      description: 'View your order history',
      icon: <ShoppingBag className="h-6 w-6 text-primary-900" />,
      link: '/account/orders',
    },
    {
      title: 'Wishlist',
      description: 'Manage your saved items',
      icon: <Heart className="h-6 w-6 text-primary-900" />,
      link: '/account/wishlist',
    },
    {
      title: 'Addresses',
      description: 'Manage your saved addresses',
      icon: <MapPin className="h-6 w-6 text-primary-900" />,
      link: '/account/addresses',
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment options',
      icon: <CreditCard className="h-6 w-6 text-primary-900" />,
      link: '/account/payment-methods',
    },
    {
      title: 'Account Settings',
      description: 'Update your profile information',
      icon: <Settings className="h-6 w-6 text-primary-900" />,
      link: '/account/settings',
    },
  ];
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <AccountLayout title="My Account">
      <div className="space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-900">
              <User className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accountMenuItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="flex rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mr-4 flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            </Link>
          ))}
          
          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="flex rounded-lg bg-primary-900 p-6 text-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mr-4 flex-shrink-0">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Admin Dashboard</h3>
                <p className="mt-1 text-sm text-gray-200">
                  Manage products, orders, and users
                </p>
              </div>
            </Link>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:w-auto"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </button>
      </div>
    </AccountLayout>
  );
}

export default AccountPage;