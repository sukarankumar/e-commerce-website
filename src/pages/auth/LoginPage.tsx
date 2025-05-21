import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

type LoginForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
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
    document.title = 'Sign In | LuxeMarket';
  }, []);
  
  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      toast.success('Signed in successfully');
      navigate(redirect);
    } catch (error) {
      toast.error('Invalid email or password');
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
              <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
              <p className="mt-2 text-gray-600">
                Sign in to your account to continue
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  autoComplete="current-password"
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    {...register('rememberMe')}
                    className="h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-500"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <Link to="/forgot-password" className="text-sm font-medium text-primary-900 hover:text-primary-800">
                  Forgot your password?
                </Link>
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
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to={`/register${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
                    className="font-medium text-primary-900 hover:text-primary-800"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>
                For demo purposes, use any email and password (min 6 characters).
              </p>
              <p className="mt-1">
                Use an email containing "admin" to access the admin dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;