import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Heart, Settings } from 'lucide-react';

interface AccountLayoutProps {
  children: ReactNode;
  title: string;
}

function AccountLayout({ children, title }: AccountLayoutProps) {
  const location = useLocation();
  
  const accountLinks = [
    {
      title: 'Account Overview',
      path: '/account',
      icon: <User className="h-5 w-5" />,
    },
    {
      title: 'Orders',
      path: '/account/orders',
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: 'Wishlist',
      path: '/account/wishlist',
      icon: <Heart className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      path: '/account/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container-custom">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">{title}</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="hidden lg:col-span-3 lg:block">
            <nav className="sticky top-20 space-y-1">
              {accountLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === link.path
                      ? 'bg-primary-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Mobile navigation */}
          <div className="mb-6 lg:hidden">
            <div className="overflow-x-auto">
              <div className="flex space-x-4 px-1 py-2">
                {accountLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex min-w-fit flex-shrink-0 items-center rounded-md px-3 py-2 text-sm font-medium ${
                      location.pathname === link.path
                        ? 'bg-primary-900 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;