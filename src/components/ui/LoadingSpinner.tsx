import { Circle as CircleNotch } from 'lucide-react';
import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <CircleNotch 
      className={clsx(
        'animate-spin text-primary-900',
        {
          'h-4 w-4': size === 'sm',
          'h-6 w-6': size === 'md',
          'h-8 w-8': size === 'lg',
        },
        className
      )} 
    />
  );
}

export default LoadingSpinner;