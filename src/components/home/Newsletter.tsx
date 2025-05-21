import { useState } from 'react';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section className="bg-primary-900 py-16">
      <div className="container-custom">
        <div className="rounded-xl bg-primary-800 p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <Mail className="mx-auto h-12 w-12 text-accent-400" />
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Stay updated with our latest products, exclusive offers, and style inspiration.
            </p>
            
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-accent-400 px-6 py-3 font-medium text-white transition-colors hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
            
            <p className="mt-4 text-sm text-gray-400">
              By subscribing, you agree to our Privacy Policy. We promise not to spam your inbox!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;