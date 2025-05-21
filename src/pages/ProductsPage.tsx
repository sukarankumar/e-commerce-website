import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, XCircle } from 'lucide-react';
import ProductsList from '../components/products/ProductsList';
import FilterSidebar from '../components/products/FilterSidebar';
import { getProducts } from '../lib/api';
import { Product } from '../types';

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');
  
  useEffect(() => {
    document.title = search 
      ? `Search: ${search} | LuxeMarket` 
      : category 
        ? `${category.charAt(0).toUpperCase() + category.slice(1)} | LuxeMarket` 
        : 'Shop All Products | LuxeMarket';
  }, [category, search]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { products: fetchedProducts, totalPages: total } = await getProducts({
          category,
          search,
          sort,
          page,
        });
        
        setProducts(fetchedProducts);
        setTotalPages(total);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, search, sort, page]);
  
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSortChange = (newSort: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', newSort);
    newParams.delete('page');
    setSearchParams(newParams);
  };
  
  const handleCategoryChange = (newCategory: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newCategory) {
      newParams.set('category', newCategory);
    } else {
      newParams.delete('category');
    }
    newParams.delete('page');
    setSearchParams(newParams);
    setIsMobileFilterOpen(false);
  };
  
  const handleClearFilters = () => {
    const newParams = new URLSearchParams();
    if (search) {
      newParams.set('search', search);
    }
    setSearchParams(newParams);
  };
  
  const hasActiveFilters = category !== '';
  
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">
            {search 
              ? `Search Results for "${search}"` 
              : category 
                ? `${category.charAt(0).toUpperCase() + category.slice(1)}` 
                : 'All Products'}
          </h1>
          
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 lg:hidden"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </button>
            
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Clear Filters
              </button>
            )}
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:col-span-3 lg:block">
            <FilterSidebar 
              selectedCategory={category}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          
          {/* Filters - Mobile */}
          <FilterSidebar 
            isMobile={true}
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
          />
          
          {/* Product grid */}
          <div className="lg:col-span-9">
            <ProductsList
              products={products}
              isLoading={isLoading}
              error={error}
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;