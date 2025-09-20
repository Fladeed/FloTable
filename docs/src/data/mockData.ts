import { Restaurant, MenuItem, Order, Review, Customer } from '@/types';

// Mock Restaurants Data
export const restaurants: Restaurant[] = [
    {
        id: 'rest-1',
        name: 'Mario\'s Italian Kitchen',
        cuisine: 'Italian',
        rating: 4.5,
        deliveryTime: '25-35 min',
        priceRange: '$$',
        status: 'open',
        address: '123 Main St, Downtown',
        phone: '+1 (555) 123-4567',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300',
        featured: true,
        createdAt: '2023-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
    },
    {
        id: 'rest-2',
        name: 'Dragon Palace Chinese',
        cuisine: 'Chinese',
        rating: 4.2,
        deliveryTime: '30-40 min',
        priceRange: '$',
        status: 'open',
        address: '456 Oak Ave, Chinatown',
        phone: '+1 (555) 234-5678',
        imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300',
        featured: false,
        createdAt: '2023-02-20T14:30:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
    },
    {
        id: 'rest-3',
        name: 'Burger Haven',
        cuisine: 'American',
        rating: 4.0,
        deliveryTime: '15-25 min',
        priceRange: '$',
        status: 'busy',
        address: '789 Elm St, Midtown',
        phone: '+1 (555) 345-6789',
        imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300',
        featured: true,
        createdAt: '2023-03-10T09:15:00Z',
        updatedAt: '2024-01-10T09:15:00Z',
    },
    {
        id: 'rest-4',
        name: 'Sakura Sushi',
        cuisine: 'Japanese',
        rating: 4.7,
        deliveryTime: '40-50 min',
        priceRange: '$$$',
        status: 'open',
        address: '321 Cherry Blossom Rd, Eastside',
        phone: '+1 (555) 456-7890',
        imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300',
        featured: true,
        createdAt: '2023-04-05T16:45:00Z',
        updatedAt: '2024-01-05T16:45:00Z',
    },
    {
        id: 'rest-5',
        name: 'Spice Route Indian',
        cuisine: 'Indian',
        rating: 4.3,
        deliveryTime: '35-45 min',
        priceRange: '$$',
        status: 'open',
        address: '654 Curry Lane, Westside',
        phone: '+1 (555) 567-8901',
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300',
        featured: false,
        createdAt: '2023-05-12T11:20:00Z',
        updatedAt: '2024-01-12T11:20:00Z',
    },
    {
        id: 'rest-6',
        name: 'Taco Fiesta',
        cuisine: 'Mexican',
        rating: 4.1,
        deliveryTime: '20-30 min',
        priceRange: '$',
        status: 'closed',
        address: '987 Salsa Street, Southside',
        phone: '+1 (555) 678-9012',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300',
        featured: false,
        createdAt: '2023-06-18T13:10:00Z',
        updatedAt: '2024-01-18T13:10:00Z',
    },
    {
        id: 'rest-7',
        name: 'Le Petit Bistro',
        cuisine: 'French',
        rating: 4.6,
        deliveryTime: '45-55 min',
        priceRange: '$$$$',
        status: 'open',
        address: '147 Provence Ave, Uptown',
        phone: '+1 (555) 789-0123',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300',
        featured: true,
        createdAt: '2023-07-22T08:30:00Z',
        updatedAt: '2024-01-22T08:30:00Z',
    },
    {
        id: 'rest-8',
        name: 'Green Garden Salads',
        cuisine: 'Healthy',
        rating: 4.4,
        deliveryTime: '15-20 min',
        priceRange: '$$',
        status: 'open',
        address: '258 Organic Blvd, Green District',
        phone: '+1 (555) 890-1234',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300',
        featured: false,
        createdAt: '2023-08-15T12:00:00Z',
        updatedAt: '2024-01-15T12:00:00Z',
    }
];

// Mock Menu Items Data
export const menuItems: MenuItem[] = [
    // Mario's Italian Kitchen
    {
        id: 'item-1',
        restaurantId: 'rest-1',
        restaurantName: 'Mario\'s Italian Kitchen',
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
        price: 18.99,
        category: 'Pizza',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300',
        available: true,
        vegetarian: true,
        vegan: false,
        spicy: false,
        popular: true,
        calories: 780,
        allergens: ['gluten', 'dairy'],
        createdAt: '2023-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
    },
    {
        id: 'item-2',
        restaurantId: 'rest-1',
        restaurantName: 'Mario\'s Italian Kitchen',
        name: 'Chicken Alfredo',
        description: 'Creamy pasta with grilled chicken and parmesan cheese',
        price: 22.50,
        category: 'Pasta',
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d65e?w=300',
        available: true,
        vegetarian: false,
        vegan: false,
        spicy: false,
        popular: true,
        calories: 920,
        allergens: ['gluten', 'dairy'],
        createdAt: '2023-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
    },
    // Dragon Palace Chinese
    {
        id: 'item-3',
        restaurantId: 'rest-2',
        restaurantName: 'Dragon Palace Chinese',
        name: 'Sweet and Sour Pork',
        description: 'Crispy pork with pineapple and bell peppers in sweet sauce',
        price: 16.80,
        category: 'Main Course',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03246963d049?w=300',
        available: true,
        vegetarian: false,
        vegan: false,
        spicy: false,
        popular: true,
        calories: 650,
        allergens: ['soy'],
        createdAt: '2023-02-20T14:30:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
    },
    {
        id: 'item-4',
        restaurantId: 'rest-2',
        restaurantName: 'Dragon Palace Chinese',
        name: 'Vegetable Spring Rolls',
        description: 'Crispy spring rolls filled with fresh vegetables',
        price: 8.99,
        category: 'Appetizer',
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300',
        available: true,
        vegetarian: true,
        vegan: true,
        spicy: false,
        popular: false,
        calories: 320,
        allergens: ['gluten'],
        createdAt: '2023-02-20T14:30:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
    },
    // Burger Haven
    {
        id: 'item-5',
        restaurantId: 'rest-3',
        restaurantName: 'Burger Haven',
        name: 'Classic Cheeseburger',
        description: 'Beef patty with cheese, lettuce, tomato, and special sauce',
        price: 12.99,
        category: 'Burgers',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
        available: true,
        vegetarian: false,
        vegan: false,
        spicy: false,
        popular: true,
        calories: 680,
        allergens: ['gluten', 'dairy'],
        createdAt: '2023-03-10T09:15:00Z',
        updatedAt: '2024-01-10T09:15:00Z',
    },
    // Add more menu items for other restaurants...
];

// Mock Orders Data  
export const orders: Order[] = [
    {
        id: 'order-1',
        customerId: 'cust-1',
        customerName: 'John Smith',
        restaurantId: 'rest-1',
        restaurantName: 'Mario\'s Italian Kitchen',
        items: [
            {
                menuItemId: 'item-1',
                name: 'Margherita Pizza',
                price: 18.99,
                quantity: 1,
            },
            {
                menuItemId: 'item-2',
                name: 'Chicken Alfredo',
                price: 22.50,
                quantity: 1,
            }
        ],
        totalAmount: 41.49,
        status: 'delivered',
        paymentStatus: 'paid',
        paymentMethod: 'card',
        deliveryAddress: '123 Customer St, Downtown',
        deliveryTime: '30 min',
        orderDate: '2024-01-20T19:30:00Z',
        estimatedDelivery: '2024-01-20T20:00:00Z',
        actualDelivery: '2024-01-20T19:58:00Z',
        notes: 'Please ring doorbell',
    },
    {
        id: 'order-2',
        customerId: 'cust-2',
        customerName: 'Sarah Johnson',
        restaurantId: 'rest-3',
        restaurantName: 'Burger Haven',
        items: [
            {
                menuItemId: 'item-5',
                name: 'Classic Cheeseburger',
                price: 12.99,
                quantity: 2,
            }
        ],
        totalAmount: 25.98,
        status: 'preparing',
        paymentStatus: 'paid',
        paymentMethod: 'digital_wallet',
        deliveryAddress: '456 Oak Lane, Midtown',
        deliveryTime: '20 min',
        orderDate: '2024-01-21T12:15:00Z',
        estimatedDelivery: '2024-01-21T12:35:00Z',
        notes: '',
    },
    // Add more orders...
];

// Mock Reviews Data
export const reviews: Review[] = [
    {
        id: 'review-1',
        customerId: 'cust-1',
        customerName: 'John Smith',
        restaurantId: 'rest-1',
        restaurantName: 'Mario\'s Italian Kitchen',
        orderId: 'order-1',
        rating: 5,
        title: 'Excellent Italian food!',
        comment: 'The pizza was amazing and the alfredo was creamy and delicious. Fast delivery too!',
        helpful: 12,
        verified: true,
        response: {
            message: 'Thank you for your wonderful review! We appreciate your business.',
            date: '2024-01-21T10:00:00Z',
            respondedBy: 'Mario\'s Team',
        },
        createdAt: '2024-01-21T08:30:00Z',
        updatedAt: '2024-01-21T10:00:00Z',
    },
    {
        id: 'review-2',
        customerId: 'cust-2',
        customerName: 'Sarah Johnson',
        restaurantId: 'rest-3',
        restaurantName: 'Burger Haven',
        rating: 4,
        title: 'Great burgers',
        comment: 'The cheeseburger was tasty, though it took a bit longer than expected.',
        helpful: 8,
        verified: true,
        createdAt: '2024-01-21T14:45:00Z',
        updatedAt: '2024-01-21T14:45:00Z',
    },
    // Add more reviews...
];

// Mock Customers Data
export const customers: Customer[] = [
    {
        id: 'cust-1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 111-2222',
        address: '123 Customer St, Downtown',
        totalOrders: 15,
        totalSpent: 387.50,
        lastOrderDate: '2024-01-20T19:30:00Z',
        memberSince: '2023-06-15T10:00:00Z',
        preferredCuisines: ['Italian', 'American'],
        status: 'vip',
    },
    {
        id: 'cust-2',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 222-3333',
        address: '456 Oak Lane, Midtown',
        totalOrders: 8,
        totalSpent: 156.80,
        lastOrderDate: '2024-01-21T12:15:00Z',
        memberSince: '2023-09-20T14:30:00Z',
        preferredCuisines: ['American', 'Mexican'],
        status: 'active',
    },
    // Add more customers...
];

// Utility function to simulate API delays
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockAPI = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getRestaurants(params: Record<string, any>) {
        await delay(500);
        let filteredData = [...restaurants];

        // Apply filters
        if (params.status) {
            filteredData = filteredData.filter(r => r.status === params.status);
        }
        if (params.cuisine) {
            filteredData = filteredData.filter(r => r.cuisine === params.cuisine);
        }
        if (params.featured !== undefined) {
            filteredData = filteredData.filter(r => r.featured === params.featured);
        }
        if (params.keyword) {
            const keyword = params.keyword.toLowerCase();
            filteredData = filteredData.filter(r =>
                r.name.toLowerCase().includes(keyword) ||
                r.cuisine.toLowerCase().includes(keyword) ||
                r.address.toLowerCase().includes(keyword)
            );
        }

        // Apply pagination
        const { current = 1, pageSize = 10 } = params;
        const start = (current - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = filteredData.slice(start, end);

        return {
            data: paginatedData,
            success: true,
            total: filteredData.length,
        };
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getMenuItems(params: Record<string, any>) {
        await delay(400);
        let filteredData = [...menuItems];

        if (params.restaurantId) {
            filteredData = filteredData.filter(item => item.restaurantId === params.restaurantId);
        }
        if (params.category) {
            filteredData = filteredData.filter(item => item.category === params.category);
        }
        if (params.vegetarian !== undefined) {
            filteredData = filteredData.filter(item => item.vegetarian === params.vegetarian);
        }
        if (params.available !== undefined) {
            filteredData = filteredData.filter(item => item.available === params.available);
        }
        if (params.keyword) {
            const keyword = params.keyword.toLowerCase();
            filteredData = filteredData.filter(item =>
                item.name.toLowerCase().includes(keyword) ||
                item.description.toLowerCase().includes(keyword) ||
                item.category.toLowerCase().includes(keyword)
            );
        }

        const { current = 1, pageSize = 10 } = params;
        const start = (current - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = filteredData.slice(start, end);

        return {
            data: paginatedData,
            success: true,
            total: filteredData.length,
        };
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getOrders(params: Record<string, any>) {
        await delay(600);
        let filteredData = [...orders];

        if (params.status) {
            filteredData = filteredData.filter(order => order.status === params.status);
        }
        if (params.paymentStatus) {
            filteredData = filteredData.filter(order => order.paymentStatus === params.paymentStatus);
        }
        if (params.customerId) {
            filteredData = filteredData.filter(order => order.customerId === params.customerId);
        }
        if (params.keyword) {
            const keyword = params.keyword.toLowerCase();
            filteredData = filteredData.filter(order =>
                order.customerName.toLowerCase().includes(keyword) ||
                order.restaurantName.toLowerCase().includes(keyword) ||
                order.id.toLowerCase().includes(keyword)
            );
        }

        const { current = 1, pageSize = 10 } = params;
        const start = (current - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = filteredData.slice(start, end);

        return {
            data: paginatedData,
            success: true,
            total: filteredData.length,
        };
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getReviews(params: Record<string, any>) {
        await delay(350);
        let filteredData = [...reviews];

        if (params.rating) {
            filteredData = filteredData.filter(review => review.rating >= params.rating);
        }
        if (params.restaurantId) {
            filteredData = filteredData.filter(review => review.restaurantId === params.restaurantId);
        }
        if (params.verified !== undefined) {
            filteredData = filteredData.filter(review => review.verified === params.verified);
        }
        if (params.keyword) {
            const keyword = params.keyword.toLowerCase();
            filteredData = filteredData.filter(review =>
                review.title.toLowerCase().includes(keyword) ||
                review.comment.toLowerCase().includes(keyword) ||
                review.customerName.toLowerCase().includes(keyword)
            );
        }

        const { current = 1, pageSize = 10 } = params;
        const start = (current - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = filteredData.slice(start, end);

        return {
            data: paginatedData,
            success: true,
            total: filteredData.length,
        };
    },
};