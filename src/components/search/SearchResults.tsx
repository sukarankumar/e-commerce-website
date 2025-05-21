import { Link } from 'react-router-dom';
import { Product } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';

interface SearchResultsProps {
  results: Product[];
  isLoading: boolean;
  onSelect: () => void;
}

function SearchResults({ results, isLoading, onSelect }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="absolute top-full z-10 mt-1 w-full rounded-md border border-gray-200 bg-white p-4 shadow-lg">
        <div className="flex items-center justify-center py-4">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="absolute top-full z-10 mt-1 w-full rounded-md border border-gray-200 bg-white p-4 shadow-lg">
        <p className="py-2 text-center text-gray-500">No products found</p>
      </div>
    );
  }
  
  return (
    <div className="absolute top-full z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
      <ul className="max-h-[300px] overflow-y-auto py-2">
        {results.map((product) => (
          <li key={product.id}>
            <Link 
              to={`/products/${product.id}`}
              className="flex items-center px-4 py-2 hover:bg-gray-100"
              onClick={onSelect}
            >
              <img 
                src={product.thumbnail} 
                alt={product.name} 
                className="h-12 w-12 rounded-md object-cover"
              />
              <div className="ml-3">
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;