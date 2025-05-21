import { useState, useEffect } from 'react';
import { Product } from '../types';
import { searchProducts } from '../lib/api';

export function useProductSearch(query: string) {
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Don't search for very short queries
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    
    const controller = new AbortController();
    const signal = controller.signal;
    
    const search = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await searchProducts(query);
        
        if (!signal.aborted) {
          setResults(data);
        }
      } catch (err) {
        if (!signal.aborted) {
          setError('Failed to search products');
          console.error(err);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    
    // Debounce the search
    const timeoutId = setTimeout(() => {
      search();
    }, 300);
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);
  
  return { results, isLoading, error };
}