export interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    deliveryTime: string;
    priceRange: '$' | '$$' | '$$$' | '$$$$';
    status: 'open' | 'closed' | 'busy';
    address: string;
    phone: string;
    imageUrl: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface MenuItem {
    id: string;
    restaurantId: string;
    restaurantName: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    available: boolean;
    vegetarian: boolean;
    vegan: boolean;
    spicy: boolean;
    popular: boolean;
    calories?: number;
    allergens: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    id: string;
    customerId: string;
    customerName: string;
    restaurantId: string;
    restaurantName: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    paymentMethod: 'cash' | 'card' | 'digital_wallet';
    deliveryAddress: string;
    deliveryTime: string;
    orderDate: string;
    estimatedDelivery: string;
    actualDelivery?: string;
    notes?: string;
}

export interface OrderItem {
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    specialInstructions?: string;
}

export interface Review {
    id: string;
    customerId: string;
    customerName: string;
    restaurantId: string;
    restaurantName: string;
    orderId?: string;
    rating: number;
    title: string;
    comment: string;
    helpful: number;
    verified: boolean;
    response?: RestaurantResponse;
    createdAt: string;
    updatedAt: string;
}

export interface RestaurantResponse {
    message: string;
    date: string;
    respondedBy: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
    memberSince: string;
    preferredCuisines: string[];
    status: 'active' | 'inactive' | 'vip';
}