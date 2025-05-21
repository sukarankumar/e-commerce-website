import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

const categories = [
  { id: '', name: 'All Products' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'home', name: 'Home & Decor' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'new', name: 'New Arrivals' },
  { id: 'featured', name: 'Featured Products' },
  { id: 'sale', name: 'Sale Items' },
];

interface FilterSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function FilterSidebar({
  isMobile = false,
  isOpen = false,
  onClose = () => {},
  selectedCategory,
  onCategoryChange,
}: FilterSidebarProps) {
  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
        <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`block w-full text-left py-2 text-sm ${
                  selectedCategory === category.id
                    ? 'font-semibold text-primary-900'
                    : 'text-gray-600 hover:text-primary-900'
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
  if (isMobile) {
    return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                <div className="mt-4 px-4">
                  {filterContent}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }
  
  return <div className="sticky top-20 px-4">{filterContent}</div>;
}

export default FilterSidebar;