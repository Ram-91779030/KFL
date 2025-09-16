// Mock API for when backend is not available
export const mockApi = {
  // Mock categories
  getCategories: () => Promise.resolve([
    { id: 1, name: 'Grains', slug: 'grains', description: 'Premium grains' },
    { id: 2, name: 'Vegetables', slug: 'vegetables', description: 'Fresh vegetables' },
    { id: 3, name: 'Fruits', slug: 'fruits', description: 'Organic fruits' },
    { id: 4, name: 'Dry Fruits', slug: 'dry-fruits', description: 'Premium dry fruits' },
    { id: 5, name: 'Protein Bars', slug: 'protein-bars', description: 'Healthy protein bars' },
    { id: 6, name: 'Healthy Chips', slug: 'healthy-chips', description: 'Nutritious snacks' }
  ]),

  // Mock products
  getProducts: () => Promise.resolve({
    results: [
      {
        id: 1,
        name: 'Premium Almonds',
        slug: 'premium-almonds',
        price: 450,
        category: 'Dry Fruits',
        description: 'Premium quality almonds',
        image: '/assets/almonds.jpg',
        stock: 100,
        rating: 4.5,
        reviews: 25
      },
      {
        id: 2,
        name: 'Organic Quinoa',
        slug: 'organic-quinoa',
        price: 350,
        category: 'Grains',
        description: 'Organic quinoa grains',
        image: '/assets/quinoa.jpg',
        stock: 50,
        rating: 4.8,
        reviews: 15
      },
      {
        id: 3,
        name: 'Protein Bar - Chocolate',
        slug: 'protein-bar-chocolate',
        price: 120,
        category: 'Protein Bars',
        description: 'High protein chocolate bar',
        image: '/assets/protein-bar.jpg',
        stock: 200,
        rating: 4.3,
        reviews: 40
      }
    ],
    count: 3,
    next: null,
    previous: null
  }),

  // Mock banners
  getBanners: () => Promise.resolve([
    {
      id: 1,
      title: 'Premium Natural Foods',
      subtitle: 'From Farm to Table',
      image: '/assets/banner1.jpg',
      link: '/products',
      is_active: true
    },
    {
      id: 2,
      title: 'Healthy Living',
      subtitle: 'Start Your Journey Today',
      image: '/assets/banner2.jpg',
      link: '/healthy-living',
      is_active: true
    }
  ]),

  // Mock health check
  healthCheck: () => Promise.resolve({
    status: 'success',
    message: 'Mock API is working',
    timestamp: new Date().toISOString()
  })
};
