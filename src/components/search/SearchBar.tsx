import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProductSearch } from '../../hooks/useProductSearch';
import SearchResults from './SearchResults';

interface SearchBarProps {
  onClose: () => void;
}

function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { results, isLoading } = useProductSearch(query);
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Add event listener for escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };
  
  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full rounded-md border-gray-300 bg-gray-100 py-2 pl-10 pr-10 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>
      
      {isFocused && query.trim().length > 1 && (
        <SearchResults 
          results={results} 
          isLoading={isLoading} 
          onSelect={onClose}
        />
      )}
    </div>
  );
}

export default SearchBar;