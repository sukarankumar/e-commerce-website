import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Filter, Search } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Product } from '../../types';
import { getProducts } from '../../lib/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Set document title
  useEffect(() => {
    document.title = 'Manage Products | Admin Dashboard';
  }, []);
  
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { products: fetchedProducts, totalPages } = await getProducts({
          category,
          search: searchTerm,
          page: currentPage,
          limit: 10,
        });
        
        setProducts(fetchedProducts);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, searchTerm, currentPage]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setCategory('');
    setCurrentPage(1);
  };
  
  return (
    <AdminLayout title="Products">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <button
            className="inline-flex items-center rounded-md bg-primary-900 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </button>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:w-64"
              />
            </form>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white pl-10 pr-10 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:w-40"
              >
                <option value="">All Categories</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="home">Home & Decor</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            
            {(searchTerm || category) && (
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
                      Product
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Price
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Stock
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-md object-cover" src={product.thumbnail} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-900 capitalize">
                        {product.category}
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-900">
                        ${product.price.toFixed(2)}
                        {product.discountPercentage > 0 && (
                          <span className="ml-2 text-xs text-error-600">
                            {Math.round(product.discountPercentage)}% OFF
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm">
                        <span className={`${
                          product.stock > 10 ? 'text-success-600' : product.stock > 0 ? 'text-warning-600' : 'text-error-600'
                        }`}>
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                        <div className="flex space-x-3">
                          <button
                            className="rounded-md bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="rounded-md bg-gray-100 p-1 text-error-600 hover:bg-error-100"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {products.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No products found</p>
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

export default Products;