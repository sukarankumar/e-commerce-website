import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-16 md:py-24">
      <div className="container-custom">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl font-bold leading-tight text-primary-900 md:text-5xl lg:text-6xl">
              Discover Luxury <span className="text-accent-400">Redefined</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 md:text-xl">
              Explore our carefully curated collection of premium products designed to elevate your lifestyle.
            </p>
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to="/products" className="btn-primary btn-lg inline-flex items-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/products?category=new" className="btn-secondary btn-lg">
                New Arrivals
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Luxury products showcase" 
              className="w-full rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;