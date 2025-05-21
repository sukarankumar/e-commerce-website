import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import AdminLayout from './AdminLayout';

function Dashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  // Set document title
  useEffect(() => {
    document.title = 'Admin Dashboard | LuxeMarket';
  }, []);
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/admin');
      return;
    }
    
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }
  
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,489.75',
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign className="h-6 w-6 text-white" />,
      bgColor: 'bg-primary-900',
    },
    {
      title: 'Orders',
      value: '356',
      change: '+8.2%',
      isPositive: true,
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
      bgColor: 'bg-accent-400',
    },
    {
      title: 'Customers',
      value: '1,245',
      change: '+5.7%',
      isPositive: true,
      icon: <Users className="h-6 w-6 text-white" />,
      bgColor: 'bg-success-600',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.4%',
      isPositive: false,
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      bgColor: 'bg-warning-500',
    },
  ];
  
  const recentOrders = [
    { id: 'ORD-1234', customer: 'John Doe', total: '$1,199.98', status: 'Delivered', date: '12 Nov 2023' },
    { id: 'ORD-5678', customer: 'Jane Smith', total: '$1,499.99', status: 'Shipped', date: '15 Nov 2023' },
    { id: 'ORD-9012', customer: 'Robert Johnson', total: '$529.97', status: 'Processing', date: '20 Nov 2023' },
    { id: 'ORD-3456', customer: 'Emily Brown', total: '$789.50', status: 'Pending', date: '22 Nov 2023' },
    { id: 'ORD-7890', customer: 'Michael Wilson', total: '$249.99', status: 'Delivered', date: '23 Nov 2023' },
  ];
  
  const topProducts = [
    { id: '1', name: 'Premium Wool Coat', sales: 45, revenue: '$13,499.55' },
    { id: '3', name: 'Smart 4K OLED TV', sales: 32, revenue: '$47,999.68' },
    { id: '2', name: 'Luxury Watch', sales: 28, revenue: '$36,399.72' },
    { id: '6', name: 'Premium Noise-Cancelling Headphones', sales: 25, revenue: '$8,749.75' },
    { id: '5', name: 'Designer Handbag', sales: 22, revenue: '$19,799.78' },
  ];
  
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.title} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <div className={`mr-4 rounded-lg ${stat.bgColor} p-3`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-2">
                <span className={`inline-flex items-center text-sm font-medium ${stat.isPositive ? 'text-success-600' : 'text-error-600'}`}>
                  {stat.change}
                  <span className="ml-1">vs last month</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
              <a href="/admin/orders" className="text-sm font-medium text-primary-900 hover:text-primary-800">
                View all
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 text-xs font-medium uppercase text-gray-500">
                  <tr>
                    <th className="py-3 px-4 text-left">Order ID</th>
                    <th className="py-3 px-4 text-left">Customer</th>
                    <th className="py-3 px-4 text-left">Total</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-3 px-4 text-sm font-medium text-primary-900">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap py-3 px-4 text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="whitespace-nowrap py-3 px-4 text-sm text-gray-900">
                        {order.total}
                      </td>
                      <td className="whitespace-nowrap py-3 px-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-success-100 text-success-800'
                            : order.status === 'Shipped'
                            ? 'bg-primary-100 text-primary-800'
                            : order.status === 'Processing'
                            ? 'bg-warning-100 text-warning-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-3 px-4 text-sm text-gray-500">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Top Products */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Top Products</h2>
              <a href="/admin/products" className="text-sm font-medium text-primary-900 hover:text-primary-800">
                View all
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 text-xs font-medium uppercase text-gray-500">
                  <tr>
                    <th className="py-3 px-4 text-left">Product</th>
                    <th className="py-3 px-4 text-left">Sales</th>
                    <th className="py-3 px-4 text-left">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {product.sales} units
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {product.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;