import { Product, Order, User } from '../types';

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wool Coat',
    description: 'Stay warm and stylish with this premium wool coat. Features a classic design with modern touches for a timeless look.',
    price: 299.99,
    discountPercentage: 0,
    rating: 4.8,
    stock: 15,
    category: 'clothing',
    thumbnail: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-08-15T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Luxury Watch',
    description: 'A timeless luxury watch that combines elegant design with precision engineering. Perfect for any occasion.',
    price: 1299.99,
    discountPercentage: 5,
    rating: 4.9,
    stock: 8,
    category: 'accessories',
    thumbnail: 'https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-09-10T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Smart 4K OLED TV',
    description: 'Experience stunning picture quality with this Smart 4K OLED TV. Features HDR, AI-powered picture enhancement, and built-in streaming apps.',
    price: 1499.99,
    discountPercentage: 10,
    rating: 4.7,
    stock: 12,
    category: 'electronics',
    thumbnail: 'https://images.pexels.com/photos/6634170/pexels-photo-6634170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/6634170/pexels-photo-6634170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-07-22T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Italian Leather Sofa',
    description: 'Elevate your living space with this luxurious Italian leather sofa. Handcrafted with premium materials for comfort and style.',
    price: 2499.99,
    discountPercentage: 0,
    rating: 4.8,
    stock: 5,
    category: 'home',
    thumbnail: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-06-18T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Designer Handbag',
    description: 'A statement designer handbag made from premium materials. Features multiple compartments and an adjustable strap.',
    price: 899.99,
    discountPercentage: 15,
    rating: 4.6,
    stock: 10,
    category: 'accessories',
    thumbnail: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1270015/pexels-photo-1270015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-08-05T00:00:00.000Z'
  },
  {
    id: '6',
    name: 'Premium Noise-Cancelling Headphones',
    description: 'Experience exceptional sound quality with these premium noise-cancelling headphones. Features comfortable ear cups and long battery life.',
    price: 349.99,
    discountPercentage: 0,
    rating: 4.9,
    stock: 18,
    category: 'electronics',
    thumbnail: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4325048/pexels-photo-4325048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-09-02T00:00:00.000Z'
  },
  {
    id: '7',
    name: 'Luxury Scented Candle Set',
    description: 'A set of luxury scented candles made with natural ingredients. Perfect for creating a relaxing atmosphere in your home.',
    price: 89.99,
    discountPercentage: 0,
    rating: 4.7,
    stock: 25,
    category: 'home',
    thumbnail: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3867530/pexels-photo-3867530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6957383/pexels-photo-6957383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-07-15T00:00:00.000Z'
  },
  {
    id: '8',
    name: 'Silk Dress',
    description: 'An elegant silk dress perfect for special occasions. Features a flattering cut and premium fabric.',
    price: 399.99,
    discountPercentage: 5,
    rating: 4.8,
    stock: 7,
    category: 'clothing',
    thumbnail: 'https://images.pexels.com/photos/7679731/pexels-photo-7679731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/7679731/pexels-photo-7679731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6776538/pexels-photo-6776538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-08-25T00:00:00.000Z'
  }
];

// Simulate API calls with delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  await delay(800);
  return mockProducts.slice(0, 4);
};

// Get products with filtering, pagination and sorting
export const getProducts = async ({
  category = '',
  search = '',
  sort = 'newest',
  page = 1,
  limit = 8
}: {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; totalPages: number }> => {
  await delay(800);
  
  let filteredProducts = [...mockProducts];
  
  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }
  
  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  switch (sort) {
    case 'price_asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
    default:
      filteredProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    totalPages,
  };
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  await delay(500);
  const product = mockProducts.find((p) => p.id === id);
  return product || null;
};

// Get related products
export const getRelatedProducts = async (
  productId: string,
  category: string
): Promise<Product[]> => {
  await delay(600);
  const relatedProducts = mockProducts
    .filter((p) => p.id !== productId && p.category === category)
    .slice(0, 4);
  return relatedProducts;
};

// Mock search functionality for the search bar
export const searchProducts = async (query: string): Promise<Product[]> => {
  await delay(300);
  
  if (!query.trim()) {
    return [];
  }
  
  const queryLower = query.toLowerCase();
  return mockProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(queryLower) ||
        product.description.toLowerCase().includes(queryLower) ||
        product.category.toLowerCase().includes(queryLower)
    )
    .slice(0, 5);
};