import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreditCard, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Address } from '../types';

type CheckoutForm = Address & {
  paymentMethod: 'credit_card' | 'paypal';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  saveInfo?: boolean;
};

function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutForm>({
    defaultValues: {
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
      phone: '',
      paymentMethod: 'credit_card',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      saveInfo: true,
    },
  });
  
  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  // Set document title
  useEffect(() => {
    document.title = 'Checkout | LuxeMarket';
  }, []);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    }
  }, [isAuthenticated, navigate]);
  
  const totalPrice = getTotalPrice();
  const shippingPrice = totalPrice > 100 ? 0 : 10;
  const estimatedTax = totalPrice * 0.07;
  const orderTotal = totalPrice + shippingPrice + estimatedTax;
  
  const onSubmit = async (data: CheckoutForm) => {
    try {
      setIsProcessing(true);
      
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      if (step === 'shipping') {
        setStep('payment');
        setIsProcessing(false);
        return;
      }
      
      if (step === 'payment') {
        // Here we would normally process the payment
        // For demo purposes, we're just moving to confirmation
        setStep('confirmation');
        
        // Clear cart after successful order
        clearCart();
        
        toast.success('Order placed successfully!');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container-custom">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>
        
        {step === 'confirmation' ? (
          <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
                <Check className="h-8 w-8 text-success-600" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Thank You For Your Order!</h2>
              <p className="mt-2 text-gray-600">
                Your order has been placed and will be processed soon.
              </p>
              
              <div className="mt-8">
                <p className="text-sm text-gray-500">Order number:</p>
                <p className="font-medium">#ORD-{Math.floor(Math.random() * 10000)}</p>
              </div>
              
              <div className="mt-8">
                <button
                  onClick={() => navigate('/account/orders')}
                  className="rounded-md bg-primary-900 px-6 py-3 font-medium text-white hover:bg-primary-800"
                >
                  View Order Status
                </button>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={() => navigate('/products')}
                  className="text-sm font-medium text-primary-900 hover:text-primary-800"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-lg bg-white p-6 shadow-md">
                {/* Checkout steps */}
                <div className="mb-8 flex justify-center">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-900 text-white">
                      1
                    </div>
                    <div className="ml-2 text-sm font-medium text-gray-900">Shipping</div>
                  </div>
                  <div className="mx-4 h-px w-16 bg-gray-300"></div>
                  <div className="flex items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      step === 'payment' 
                        ? 'bg-primary-900 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      2
                    </div>
                    <div className={`ml-2 text-sm font-medium ${
                      step === 'payment' 
                        ? 'text-gray-900' 
                        : 'text-gray-500'
                    }`}>
                      Payment
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  {step === 'shipping' && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                      
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            {...register('fullName', { required: 'Full name is required' })}
                            className={`mt-1 block w-full rounded-md border ${
                              errors.fullName ? 'border-error-500' : 'border-gray-300'
                            } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                          />
                          {errors.fullName && (
                            <p className="mt-1 text-sm text-error-600">{errors.fullName.message}</p>
                          )}
                        </div>
                        
                        <div className="sm:col-span-2">
                          <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            id="addressLine1"
                            {...register('addressLine1', { required: 'Address is required' })}
                            className={`mt-1 block w-full rounded-md border ${
                              errors.addressLine1 ? 'border-error-500' : 'border-gray-300'
                            } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                          />
                          {errors.addressLine1 && (
                            <p className="mt-1 text-sm text-error-600">{errors.addressLine1.message}</p>
                          )}
                        </div>
                        
                        <div className="sm:col-span-2">
                          <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                            Address Line 2 (Optional)
                          </label>
                          <input
                            type="text"
                            id="addressLine2"
                            {...register('addressLine2')}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            {...register('city', { required: 'City is required' })}
                            className={`mt-1 block w-full rounded-md border ${
                              errors.city ? 'border-error-500' : 'border-gray-300'
                            } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                          />
                          {errors.city && (
                            <p className="mt-1 text-sm text-error-600">{errors.city.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                            State / Province
                          </label>
                          <input
                            type="text"
                            id="state"
                            {...register('state', { required: 'State is required' })}
                            className={`mt-1 block w-full rounded-md border ${
                              errors.state ? 'border-error-500' : 'border-gray-300'
                            } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                          />
                          {errors.state && (
                            <p className="mt-1 text-sm text-error-600">{errors.state.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            {...register('postalCode', { required: 'Postal code is required' })}
                            className={`mt-1 block w-full rounded-md border ${
                              errors.postalCode ? 'border-error-500' : 'border-gray-300'
                            } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                          />
                          {errors.postalCode && (
                            <p className="mt-1 text-sm text-error-600">{errors.postalCode.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <select
                            id="country"
                            {...register('country', { required: 'Country is required' })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            {...register('phone', { required: 'Phone number is required' })}
                            className={`mt-1 block w-full rounded-md border ${
                              errors.phone ? 'border-error-500' : 'border-gray-300'
                            } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-error-600">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="rounded-md bg-primary-900 px-6 py-3 font-medium text-white hover:bg-primary-800 disabled:opacity-70"
                        >
                          {isProcessing ? (
                            <span className="flex items-center">
                              <LoadingSpinner size="sm" className="mr-2" />
                              Processing...
                            </span>
                          ) : (
                            'Continue to Payment'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {step === 'payment' && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
                      
                      <div className="space-y-4">
                        <div className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4">
                          <input
                            id="credit_card"
                            type="radio"
                            value="credit_card"
                            {...register('paymentMethod')}
                            className="h-4 w-4 border-gray-300 text-primary-900 focus:ring-primary-500"
                            defaultChecked
                          />
                          <label htmlFor="credit_card" className="ml-3 flex flex-1 cursor-pointer">
                            <div className="flex w-full items-center justify-between">
                              <div>
                                <span className="block text-sm font-medium text-gray-900">
                                  Credit / Debit Card
                                </span>
                                <span className="mt-1 flex items-center text-xs text-gray-500">
                                  <CreditCard className="mr-1 h-4 w-4" />
                                  We accept Visa, Mastercard, and American Express
                                </span>
                              </div>
                              <div className="flex space-x-2">
                                <img src="https://via.placeholder.com/40x25?text=Visa" alt="Visa" className="h-6" />
                                <img src="https://via.placeholder.com/40x25?text=MC" alt="Mastercard" className="h-6" />
                                <img src="https://via.placeholder.com/40x25?text=Amex" alt="American Express" className="h-6" />
                              </div>
                            </div>
                          </label>
                        </div>
                        
                        {watch('paymentMethod') === 'credit_card' && (
                          <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <div>
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                                Card Number
                              </label>
                              <input
                                type="text"
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                {...register('cardNumber', { 
                                  required: 'Card number is required',
                                  pattern: {
                                    value: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
                                    message: 'Invalid card number format'
                                  }
                                })}
                                className={`mt-1 block w-full rounded-md border ${
                                  errors.cardNumber ? 'border-error-500' : 'border-gray-300'
                                } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                              />
                              {errors.cardNumber && (
                                <p className="mt-1 text-sm text-error-600">{errors.cardNumber.message}</p>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                                  Expiration Date
                                </label>
                                <input
                                  type="text"
                                  id="cardExpiry"
                                  placeholder="MM/YY"
                                  {...register('cardExpiry', { 
                                    required: 'Expiration date is required',
                                    pattern: {
                                      value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                      message: 'Invalid format (MM/YY)'
                                    }
                                  })}
                                  className={`mt-1 block w-full rounded-md border ${
                                    errors.cardExpiry ? 'border-error-500' : 'border-gray-300'
                                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                                />
                                {errors.cardExpiry && (
                                  <p className="mt-1 text-sm text-error-600">{errors.cardExpiry.message}</p>
                                )}
                              </div>
                              <div>
                                <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
                                  CVC / CVV
                                </label>
                                <input
                                  type="text"
                                  id="cardCvc"
                                  placeholder="123"
                                  {...register('cardCvc', { 
                                    required: 'CVC is required',
                                    pattern: {
                                      value: /^\d{3,4}$/,
                                      message: 'Invalid CVC format'
                                    }
                                  })}
                                  className={`mt-1 block w-full rounded-md border ${
                                    errors.cardCvc ? 'border-error-500' : 'border-gray-300'
                                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                                />
                                {errors.cardCvc && (
                                  <p className="mt-1 text-sm text-error-600">{errors.cardCvc.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4">
                          <input
                            id="paypal"
                            type="radio"
                            value="paypal"
                            {...register('paymentMethod')}
                            className="h-4 w-4 border-gray-300 text-primary-900 focus:ring-primary-500"
                          />
                          <label htmlFor="paypal" className="ml-3 flex flex-1 cursor-pointer">
                            <div className="flex w-full items-center justify-between">
                              <div>
                                <span className="block text-sm font-medium text-gray-900">
                                  PayPal
                                </span>
                                <span className="mt-1 text-xs text-gray-500">
                                  Pay with your PayPal account
                                </span>
                              </div>
                              <div>
                                <img src="https://via.placeholder.com/60x25?text=PayPal" alt="PayPal" className="h-6" />
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <input
                          id="saveInfo"
                          type="checkbox"
                          {...register('saveInfo')}
                          className="h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-500"
                        />
                        <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
                          Save this payment information for future purchases
                        </label>
                      </div>
                      
                      <div className="mt-8 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep('shipping')}
                          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Back to Shipping
                        </button>
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="rounded-md bg-primary-900 px-6 py-3 font-medium text-white hover:bg-primary-800 disabled:opacity-70"
                        >
                          {isProcessing ? (
                            <span className="flex items-center">
                              <LoadingSpinner size="sm" className="mr-2" />
                              Processing...
                            </span>
                          ) : (
                            'Place Order'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-4">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                
                <div className="mt-6 max-h-64 overflow-y-auto">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="flex py-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                        />
                        <div className="ml-4 flex flex-1 flex-col">
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;