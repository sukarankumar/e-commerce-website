import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  BarChart,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

function AdminLayout({ children, title }: AdminLayoutProps) {
  const location = useLocation();
  const { logout } = useAuthStore();
  
  const adminLinks = [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: 'Products',
      path: '/admin/products',
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: 'Orders',
      path: '/admin/orders',
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: 'Users',
      path: '/admin/users',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      path: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 hidden h-screen w-64 bg-primary-900 pt-16 lg:block">
          <div className="px-4 py-3">
            <h2 className="mb-4 px-4 text-lg font-semibold text-white">Admin Panel</h2>
            <nav className="space-y-1">
              {adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                    location.pathname === link.path
                      ? 'bg-primary-800 text-white'
                      : 'text-gray-300 hover:bg-primary-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.title}
                </Link>
              ))}
            </nav>
            
            <div className="mt-10 space-y-1">
              <Link
                to="/"
                className="flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-primary-800 hover:text-white"
              >
                <span className="mr-3">
                  <Home className="h-5 w-5" />
                </span>
                Back to Store
              </Link>
              <button
                onClick={() => logout()}
                className="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-primary-800 hover:text-white"
              >
                <span className="mr-3">
                  <LogOut className="h-5 w-5" />
                </span>
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 lg:ml-64">
          <div className="p-6 pt-20">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;