import { useState, useEffect } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import AdminLayout from './AdminLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Mock order data
const mockOrders = [
  { id: 'ORD-1234', customer: 'John Doe', email: 'john@example.com', total: '$1,199.98', status: 'Delivered', date: '12 Nov 2023' },
  { id: 'ORD-5678', customer: 'Jane Smith', email: 'jane@example.com', total: '$1,499.99', status: 'Shipped', date: '15 Nov 2023' },
  { id: 'ORD-9012', customer: 'Robert Johnson', email: 'robert@example.com', total: '$529.97', status: 'Processing', date: '20 Nov 2023' },
  { id: 'ORD-3456', customer: 'Emily Brown', email: 'emily@example.com', total: '$789.50', status: 'Pending', date: '22 Nov 2023' },
  { id: 'ORD-7890', customer: 'Michael Wilson', email: 'michael@example.com', total: '$249.99', status: 'Delivered', date: '23 Nov 2023' },
  { id: 'ORD-2345', customer: 'Sarah Lee', email: 'sarah@example.com', total: '$359.99', status: 'Shipped', date: '24 Nov 2023' },
  { id: 'ORD-6789', customer: 'David Clark', email: 'david@example.com', total: '$899.98', status: 'Processing', date: '25 Nov 2023' },
  { id: 'ORD-0123', customer: 'Jennifer White', email: 'jennifer@example.com', total: '$1,299.97', status: 'Pending', date: '26 Nov 2023' },
  { id: 'ORD-4567', customer: 'Thomas Moore', email: 'thomas@example.com', total: '$459.99', status: 'Delivered', date: '27 Nov 2023' },
  { id: 'ORD-8901', customer: 'Jessica Harris', email: 'jessica@example.com', total: '$679.99', status: 'Shipped', date: '28 Nov 2023' },
];

type OrderStatus = 'All' | 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

function Orders() {
  const [orders, setOrders] = useState<typeof mockOrders>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Set document title
  useEffect(() => {
    document.title = 'Manage Orders | Admin Dashboard';
  }, []);
  
  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Filter orders
        let filteredOrders = [...mockOrders];
        
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredOrders = filteredOrders.filter(
            (order) =>
              order.id.toLowerCase().includes(term) ||
              order.customer.toLowerCase().includes(term) ||
              order.email.toLowerCase().includes(term)
          );
        }
        
        if (statusFilter !== 'All') {
          filteredOrders = filteredOrders.filter(
            (order) => order.status === statusFilter
          );
        }
        
        // Paginate
        const itemsPerPage = 6;
        const totalFilteredPages = Math.ceil(filteredOrders.length / itemsPerPage);
        setTotalPages(totalFilteredPages);
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);
        
        setOrders(paginatedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [searchTerm, statusFilter, currentPage]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setCurrentPage(1);
  };
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor;
    let textColor;
    
    switch (status) {
      case 'Delivered':
        bgColor = 'bg-success-100';
        textColor = 'text-success-800';
        break;
      case 'Shipped':
        bgColor = 'bg-primary-100';
        textColor = 'text-primary-800';
        break;
      case 'Processing':
        bgColor = 'bg-warning-100';
        textColor = 'text-warning-800';
        break;
      case 'Pending':
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        break;
      case 'Cancelled':
        bgColor = 'bg-error-100';
        textColor = 'text-error-800';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
    }
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };
  
  return (
    <AdminLayout title="Orders">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="text-sm text-gray-500">
            Showing orders from all time
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:w-64"
              />
            </form>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as OrderStatus);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white pl-10 pr-10 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:w-40"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            {(searchTerm || statusFilter !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-lg bg-white p-6 shadow-sm">
          {isLoading ? (
            <div className="flex h-60 items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Order ID
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Customer
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Date
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Total
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-primary-900">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap py-4 px-4">
                        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900">
                        {order.total}
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                        <button
                          className="rounded-md bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {orders.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
              
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing page {currentPage} of {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Orders;