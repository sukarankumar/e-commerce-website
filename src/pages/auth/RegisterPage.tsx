import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });
  
  // Get redirect URL from query parameters
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, redirect]);
  
  // Set document title
  useEffect(() => {
    document.title = 'Create Account | LuxeMarket';
  }, []);
  
  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      await registerUser(data.email, data.password, data.name);
      toast.success('Account created successfully');
      navigate(redirect);
    } catch (error) {
      toast.error('Failed to create account');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
              <p className="mt-2 text-gray-600">
                Sign up to start shopping with us
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.name ? 'border-error-500' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Please enter a valid email',
                    },
                  })}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.email ? 'border-error-500' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.password ? 'border-error-500' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.confirmPassword ? 'border-error-500' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error-600">{errors.confirmPassword.message}</p>
                )}
              </div>
              
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    {...register('acceptTerms', {
                      required: 'You must accept the terms and conditions',
                    })}
                    className="h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <Link to="/terms-of-service" className="text-primary-900 hover:text-primary-800">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="text-primary-900 hover:text-primary-800">
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.acceptTerms && (
                    <p className="mt-1 text-sm text-error-600">{errors.acceptTerms.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-md bg-primary-900 py-2 px-4 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Creating account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to={`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
                className="font-medium text-primary-900 hover:text-primary-800"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;