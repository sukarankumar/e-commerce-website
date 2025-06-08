import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

function HomePage() {
  // Update document title
  useEffect(() => {
    document.title = 'Premium E-commerce';
  }, []);
  
  return (
    <div>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

export default HomePage;
