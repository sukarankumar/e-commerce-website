import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useAuthStore } from '../../stores/authStore';
import { Product } from '../../types';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  
  const isWishlisted = isInWishlist(product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.thumbnail,
      quantity: 1,
    });
    
    toast.success(`${product.name} added to cart`);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your wishlist');
      return;
    }
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };
  
  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {product.discountPercentage > 0 && (
          <span className="absolute left-0 top-0 bg-error-600 px-2 py-1 text-xs font-bold text-white">
            {Math.round(product.discountPercentage)}% OFF
          </span>
        )}
        
        <div className="absolute right-0 top-0 m-2 flex flex-col space-y-2">
          <button
            onClick={handleToggleWishlist}
            className={`rounded-full p-2 transition-colors ${
              isWishlisted 
                ? 'bg-error-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-error-500 hover:text-white'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} />
          </button>
        </div>
        
        <div 
          className={`absolute inset-x-0 bottom-0 flex justify-center p-4 transition-all duration-200 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center rounded-md bg-primary-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-800"
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-sm text-gray-500">{product.category}</h3>
        <h2 className="mb-2 line-clamp-1 flex-1 text-base font-medium text-gray-900">
          {product.name}
        </h2>
        
        <div className="flex items-baseline">
          <span className="text-lg font-bold text-primary-900">${product.price.toFixed(2)}</span>
          
          {product.discountPercentage > 0 && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;