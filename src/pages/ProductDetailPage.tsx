import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { getProductById, getRelatedProducts } from '../lib/api';
import { Product } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProductsList from '../components/products/ProductsList';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useAuthStore } from '../stores/authStore';

function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  
  const isWishlisted = productId ? isInWishlist(productId) : false;
  
  useEffect(() => {
    if (!productId) return;
    
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(productId);
        
        if (!data) {
          setError('Product not found');
          return;
        }
        
        setProduct(data);
        document.title = `${data.name} | LuxeMarket`;
        
        // Fetch related products
        const related = await getRelatedProducts(data.id, data.category);
        setRelatedProducts(related);
        
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.thumbnail,
      quantity,
    });
    
    toast.success(`${product.name} added to cart`);
  };
  
  const handleToggleWishlist = () => {
    if (!product) return;
    
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
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      }).then(() => {
        console.log('Successfully shared');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container-custom py-12">
        <div className="mx-auto max-w-md text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            {error || 'Product not found'}
          </h1>
          <p className="mb-6 text-gray-600">
            We couldn't find the product you're looking for.
          </p>
          <Link
            to="/products"
            className="rounded-md bg-primary-900 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white py-8 md:py-12">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-gray-700">
                Products
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link 
                to={`/products?category=${product.category}`} 
                className="text-gray-500 hover:text-gray-700"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li className="truncate text-gray-900">
              {product.name}
            </li>
          </ol>
        </nav>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {/* Product images */}
          <div className="md:col-span-1 lg:col-span-7">
            <div className="grid gap-4 md:grid-cols-12">
              {/* Thumbnails */}
              <div className="order-2 flex md:order-1 md:col-span-2 md:flex-col md:space-y-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative mr-3 h-16 w-16 overflow-hidden rounded-md border-2 md:mr-0 ${
                      selectedImage === index ? 'border-primary-900' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Main image */}
              <div className="order-1 md:order-2 md:col-span-10">
                <div className="overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Product info */}
          <div className="md:col-span-1 lg:col-span-5">
            <div className="sticky top-20 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="mt-1 text-gray-500 capitalize">{product.category}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-accent-400 text-accent-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-primary-900">${product.price.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                    <span className="rounded-md bg-error-600 px-2 py-1 text-xs font-bold text-white">
                      {Math.round(product.discountPercentage)}% OFF
                    </span>
                  </>
                )}
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Availability:</span>
                  {product.stock > 0 ? (
                    <span className="text-sm font-medium text-success-600">
                      In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-error-600">Out of Stock</span>
                  )}
                </div>
                
                {product.stock > 0 && (
                  <div className="flex items-center">
                    <div className="mr-6">
                      <label htmlFor="quantity" className="block mb-1 text-sm font-medium text-gray-700">
                        Quantity:
                      </label>
                      <div className="flex h-9 w-32">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <input
                          id="quantity"
                          type="number"
                          min="1"
                          max={product.stock}
                          value={quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val >= 1 && val <= product.stock) {
                              setQuantity(val);
                            }
                          }}
                          className="w-full border-y border-gray-300 bg-white px-3 text-center text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                          className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {product.stock > 0 && (
                  <div className="flex space-x-4 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className="btn-primary btn-lg flex-1"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </button>
                    
                    <button
                      onClick={handleToggleWishlist}
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-md border ${
                        isWishlisted
                          ? 'border-error-500 bg-error-500 text-white'
                          : 'border-gray-300 text-gray-600 hover:border-error-500 hover:bg-error-500 hover:text-white'
                      } transition-colors`}
                      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                      aria-label="Share product"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Related Products
            </h2>
            <ProductsList
              products={relatedProducts}
              isLoading={false}
              error={null}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;