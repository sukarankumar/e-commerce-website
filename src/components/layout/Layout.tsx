import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useScrollToTop } from '../../hooks/useScrollToTop';

function Layout() {
  // Scroll to top on route change
  useScrollToTop();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;