import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Premium apparel for every occasion',
    image: 'https://images.pexels.com/photos/5693888/pexels-photo-5693888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Cutting-edge tech for modern living',
    image: 'https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'home',
    name: 'Home & Decor',
    description: 'Elevate your living space',
    image: 'https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Complete your look with our accessories',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];

function FeaturedCategories() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-primary-900 md:text-4xl">
            Shop by Category
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Browse our carefully curated collection of premium products across various categories
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-200">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;