import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, ExternalLink } from 'lucide-react';
import { Order } from '../../types';
import AccountLayout from './AccountLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Mock order data for demo
const mockOrders: Order[] = [
  {
    id: 'ORD-1234',
    userId: '1',
    items: [
      {
        id: '1',
        name: 'Premium Wool Coat',
        price: 299.99,
        image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        quantity: 1,
      },
      {
        id: '5',
        name: 'Designer Handbag',
        price: 899.99,
        image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        quantity: 1,
      },
    ],
    total: 1199.98,
    status: 'delivered',
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1-555-123-4567',
    },
    paymentMethod: 'credit_card',
    createdAt: '2023-11-10T00:00:00.000Z',
  },
  {
    id: 'ORD-5678',
    userId: '1',
    items: [
      {
        id: '3',
        name: 'Smart 4K OLED TV',
        price: 1499.99,
        image: 'https://images.pexels.com/photos/6634170/pexels-photo-6634170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        quantity: 1,
      },
    ],
    total: 1499.99,
    status: 'shipped',
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1-555-123-4567',
    },
    paymentMethod: 'paypal',
    createdAt: '2023-11-15T00:00:00.000Z',
  },
  {
    id: 'ORD-9012',
    userId: '1',
    items: [
      {
        id: '6',
        name: 'Premium Noise-Cancelling Headphones',
        price: 349.99,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        quantity: 1,
      },
      {
        id: '7',
        name: 'Luxury Scented Candle Set',
        price: 89.99,
        image: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        quantity: 2,
      },
    ],
    total: 529.97,
    status: 'processing',
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1-555-123-4567',
    },
    paymentMethod: 'credit_card',
    createdAt: '2023-11-20T00:00:00.000Z',
  },
];

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Set document title
  useEffect(() => {
    document.title = 'My Orders | LuxeMarket';
  }, []);
  
  // Fetch orders (simulated)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  // Status badge component
  const StatusBadge = ({ status }: { status: Order['status'] }) => {
    let bgColor;
    let textColor;
    
    switch (status) {
      case 'delivered':
        bgColor = 'bg-success-100';
        textColor = 'text-success-800';
        break;
      case 'shipped':
        bgColor = 'bg-primary-100';
        textColor = 'text-primary-800';
        break;
      case 'processing':
        bgColor = 'bg-warning-100';
        textColor = 'text-warning-800';
        break;
      case 'cancelled':
        bgColor = 'bg-error-100';
        textColor = 'text-error-800';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
    }
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor} ${textColor}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (isLoading) {
    return (
      <AccountLayout title="My Orders">
        <div className="flex h-60 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </AccountLayout>
    );
  }
  
  if (orders.length === 0) {
    return (
      <AccountLayout title="My Orders">
        <div className="rounded-lg bg-white p-8 text-center shadow-sm">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="mt-1 text-gray-500">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center rounded-md bg-primary-900 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </AccountLayout>
    );
  }
  
  return (
    <AccountLayout title="My Orders">
      <div className="space-y-6">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.id}>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Order {order.id}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <StatusBadge status={order.status} />
                      <ChevronRight className="ml-4 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap items-center gap-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Total: ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.items.reduce((total, item) => total + item.quantity, 0)} items
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <Link
                        to={`/account/orders/${order.id}`}
                        className="inline-flex items-center text-sm font-medium text-primary-900 hover:text-primary-800"
                      >
                        View Details
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AccountLayout>
  );
}

export default OrdersPage;