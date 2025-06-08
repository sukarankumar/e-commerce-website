import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronLeft } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);
  
  // Set document title
  useEffect(() => {
    document.title = 'Your Cart';
    
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const totalPrice = getTotalPrice();
  const shippingPrice = totalPrice > 100 ? 0 : 10;
  const estimatedTax = totalPrice * 0.07;
  const orderTotal = totalPrice + shippingPrice + estimatedTax;
  
  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="mx-auto max-w-md text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h1>
            <p className="mt-2 text-gray-500">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center rounded-md bg-primary-900 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container-custom">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Your Cart</h1>
        
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Cart items */}
          <div className="lg:col-span-8">
            <div className="rounded-lg bg-white shadow">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 w-24 rounded-md object-cover"
                        />
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h2 className="text-lg font-medium text-gray-900">
                              <Link to={`/products/${item.id}`} className="hover:text-primary-900">
                                {item.name}
                              </Link>
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex h-9 w-32">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val >= 1) {
                                  updateQuantity(item.id, val);
                                }
                              }}
                              className="w-full border-y border-gray-300 bg-white px-3 text-center text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm font-medium text-error-600 hover:text-error-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center text-sm font-medium text-primary-900 hover:text-primary-800"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">${totalPrice.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">
                    {shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Estimated Tax</p>
                  <p className="text-sm font-medium text-gray-900">${estimatedTax.toFixed(2)}</p>
                </div>
                
                <div className="h-px bg-gray-200"></div>
                
                <div className="flex justify-between">
                  <p className="text-base font-medium text-gray-900">Order Total</p>
                  <p className="text-base font-medium text-primary-900">${orderTotal.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="block w-full rounded-md bg-primary-900 py-3 text-center text-sm font-medium text-white hover:bg-primary-800"
                >
                  Proceed to Checkout
                </Link>
              </div>
              
              <div className="mt-4 text-center text-xs text-gray-500">
                <p>We accept all major credit cards and PayPal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
