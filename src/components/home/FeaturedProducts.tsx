import { useState, useEffect } from 'react';
import ProductsList from '../products/ProductsList';
import { Product } from '../../types';
import { getFeaturedProducts } from '../../lib/api';

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getFeaturedProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load featured products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-primary-900 md:text-4xl">
            Featured Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover our handpicked selection of premium products that define luxury and quality
          </p>
        </div>
        
        <ProductsList
          products={products}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </section>
  );
}

export default FeaturedProducts;