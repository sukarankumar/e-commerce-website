import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 py-12">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <ShoppingBag className="h-24 w-24 text-gray-200" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-4xl font-bold text-primary-900">
              404
            </span>
          </div>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mb-8 text-gray-600">
          The page you are looking for might have been removed or doesn't exist.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-800"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;