import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  color?: 'dark' | 'white';
}

function Logo({ color = 'dark' }: LogoProps) {
  return (
    <Link 
      to="/" 
      className={`flex items-center font-bold text-xl ${color === 'white' ? 'text-white' : 'text-primary-900'}`}
    >
      <ShoppingBag className={`mr-2 ${color === 'white' ? 'text-accent-400' : 'text-accent-400'}`} size={24} />
      <span>LuxeMarket</span>
    </Link>
  );
}

export default Logo;