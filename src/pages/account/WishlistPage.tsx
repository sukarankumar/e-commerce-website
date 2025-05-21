import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useCartStore } from '../../stores/cartStore';
import AccountLayout from './AccountLayout';

function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  
  // Set document title
  useEffect(() => {
    document.title = 'My Wishlist | LuxeMarket';
  }, []);
  
  const handleAddToCart = (productId: string) => {
    const product = items.find((item) => item.id === productId);
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.thumbnail,
      quantity: 1,
    });
    
    toast.success(`${product.name} added to cart`);
  };
  
  const handleRemoveFromWishlist = (productId: string) => {
    const product = items.find((item) => item.id === productId);
    if (!product) return;
    
    removeFromWishlist(productId);
    toast.success(`${product.name} removed from wishlist`);
  };
  
  return (
    <AccountLayout title="My Wishlist">
      {items.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow-sm">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
          <p className="mt-1 text-gray-500">
            Save your favorite items to come back to them later.
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
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
            <button
              onClick={() => {
                clearWishlist();
                toast.success('Wishlist cleared');
              }}
              className="text-sm font-medium text-error-600 hover:text-error-500"
            >
              Clear Wishlist
            </button>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <Link to={`/products/${item.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-1 text-sm text-gray-500">{item.category}</h3>
                  <Link to={`/products/${item.id}`} className="block">
                    <h2 className="line-clamp-1 text-base font-medium text-gray-900">
                      {item.name}
                    </h2>
                  </Link>
                  
                  <div className="mt-2 flex items-baseline">
                    <span className="text-lg font-bold text-primary-900">${item.price.toFixed(2)}</span>
                    
                    {item.discountPercentage > 0 && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between space-x-2">
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className="flex flex-1 items-center justify-center rounded-md bg-primary-900 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800"
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      Add to Cart
                    </button>
                    
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AccountLayout>
  );
}

export default WishlistPage;