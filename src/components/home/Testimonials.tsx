import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emma Thompson',
    role: 'Fashion Designer',
    content: 'LuxeMarket has completely transformed my shopping experience. The quality of their products is unmatched, and the customer service is exceptional. I especially love their curated collections that make it easy to find exactly what I need.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'James Wilson',
    role: 'Tech Enthusiast',
    content: 'I\'ve been shopping with LuxeMarket for over a year now, and I\'ve never been disappointed. Their electronics section offers cutting-edge products that consistently exceed my expectations. The delivery is always prompt, and their return policy is hassle-free.',
    rating: 5,
    image: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'Sophia Chen',
    role: 'Interior Designer',
    content: 'As an interior designer, I have high standards for home decor. LuxeMarket consistently impresses me with their unique and high-quality home goods. Their curation is impeccable, and I often recommend them to my clients.',
    rating: 4,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-primary-900 md:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Hear from our satisfied customers about their shopping experience
          </p>
        </div>
        
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="relative overflow-hidden rounded-xl bg-white p-8 shadow-lg md:p-12">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonials[activeIndex].name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent-400 text-accent-400" />
                  ))}
                  {[...Array(5 - testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i + testimonials[activeIndex].rating} className="h-5 w-5 text-gray-300" />
                  ))}
                </div>
              </div>
              
              <blockquote className="mt-6">
                <p className="text-lg leading-relaxed text-gray-700">
                  "{testimonials[activeIndex].content}"
                </p>
              </blockquote>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary-900' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={prevTestimonial}
            className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 md:-left-5"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 md:-right-5"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;