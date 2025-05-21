import { useState } from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Product } from '../../types';
import Pagination from '../ui/Pagination';

interface ProductsListProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

function ProductsList({ 
  products, 
  isLoading, 
  error, 
  totalPages = 1, 
  currentPage = 1, 
  onPageChange 
}: ProductsListProps) {
  
  if (isLoading) {
    return (
      <div className="flex h-60 w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex h-60 w-full items-center justify-center">
        <p className="text-center text-error-600">{error}</p>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="flex h-60 w-full items-center justify-center">
        <p className="text-center text-gray-500">No products found</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          onPageChange={onPageChange} 
        />
      )}
    </div>
  );
}

export default ProductsList;