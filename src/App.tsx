import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const AccountPage = lazy(() => import('./pages/account/AccountPage'));
const OrdersPage = lazy(() => import('./pages/account/OrdersPage'));
const WishlistPage = lazy(() => import('./pages/account/WishlistPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));

function App() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><LoadingSpinner size="lg" /></div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Account routes */}
          <Route path="account" element={<AccountPage />} />
          <Route path="account/orders" element={<OrdersPage />} />
          <Route path="account/wishlist" element={<WishlistPage />} />
          
          {/* Admin routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/users" element={<AdminUsers />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;