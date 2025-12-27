import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description?: string;
  category?: string;
  material?: string;
  style?: string;
  brand?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  products: CartItem[];
}

interface AppContextType {
  // Cart
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist
  wishlistItems: Product[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;

  // Products (Admin)
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
  cancelOrder: (orderId: string) => void;

  // Newsletter
  subscribeNewsletter: (email: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();

  // Initialize state from localStorage with default values
  const getInitialCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('luxora_cart');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    // Default cart items for first visit
    return [
      {
        id: '1',
        title: 'Modern Velvet Sofa',
        price: 2499,
        quantity: 1,
        rating: 5,
        reviews: 128,
        image:
          'https://images.unsplash.com/photo-1759229874865-20a8c780c86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
      {
        id: '2',
        title: 'Designer Wooden Armchair',
        price: 899,
        quantity: 2,
        rating: 4.5,
        reviews: 95,
        image:
          'https://images.unsplash.com/photo-1631563642459-ae1b71341a5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
      {
        id: '3',
        title: 'Minimalist Coffee Table',
        price: 549,
        quantity: 1,
        rating: 4.8,
        reviews: 156,
        image:
          'https://images.unsplash.com/photo-1656699170530-21004fb9ec2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
    ];
  };

  const getInitialWishlist = (): Product[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('luxora_wishlist');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    // Default wishlist items for first visit
    return [
      {
        id: '4',
        title: 'Marble Side Table with Gold Frame',
        price: 699,
        originalPrice: 999,
        rating: 4.7,
        reviews: 88,
        image:
          'https://images.unsplash.com/photo-1762856490803-8e200418973a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      },
      {
        id: '5',
        title: 'Elegant Ottoman - Premium Fabric',
        price: 399,
        originalPrice: 599,
        rating: 4.6,
        reviews: 72,
        image:
          'https://images.unsplash.com/photo-1565374369705-acde12f3caa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      },
      {
        id: '6',
        title: 'Designer Floor Lamp',
        price: 449,
        originalPrice: 649,
        rating: 4.9,
        reviews: 103,
        image:
          'https://images.unsplash.com/photo-1640132219022-e7a98b4c92e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      },
      {
        id: '11',
        title: 'Luxury King Size Bed Frame',
        price: 1899,
        originalPrice: 2499,
        rating: 4.8,
        reviews: 142,
        image:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      },
    ];
  };

  const getInitialUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('luxora_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  };

  const getInitialProducts = (): Product[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('luxora_products');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  };

  const getInitialOrders = (): Order[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('luxora_orders');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    // Default orders
    return [
      {
        id: 'LX2X9K8P7',
        date: 'Nov 14, 2025',
        status: 'Delivered',
        total: 4262.76,
        items: 3,
        products: [
          {
            id: '1',
            title: 'Modern Velvet Sofa',
            price: 2499,
            quantity: 1,
            rating: 5,
            reviews: 128,
            image:
              'https://images.unsplash.com/photo-1759229874865-20a8c780c86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
          },
          {
            id: '2',
            title: 'Designer Wooden Armchair',
            price: 899,
            quantity: 2,
            rating: 4.5,
            reviews: 95,
            image:
              'https://images.unsplash.com/photo-1631563642459-ae1b71341a5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
          },
        ],
      },
      {
        id: 'LX7F3M1Q2',
        date: 'Nov 10, 2025',
        status: 'In Transit',
        total: 1548.0,
        items: 2,
        products: [
          {
            id: '3',
            title: 'Minimalist Coffee Table',
            price: 549,
            quantity: 1,
            rating: 4.8,
            reviews: 156,
            image:
              'https://images.unsplash.com/photo-1656699170530-21004fb9ec2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
          },
        ],
      },
      {
        id: 'LX5K8N4R6',
        date: 'Nov 5, 2025',
        status: 'Processing',
        total: 699.0,
        items: 1,
        products: [
          {
            id: '4',
            title: 'Marble Side Table',
            price: 699,
            quantity: 1,
            rating: 4.7,
            reviews: 88,
            image:
              'https://images.unsplash.com/photo-1762856490803-8e200418973a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
          },
        ],
      },
    ];
  };

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);

  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState<Product[]>(getInitialWishlist);

  // Auth State
  const [user, setUser] = useState<User | null>(getInitialUser);

  // Products State (Admin)
  const [products, setProducts] = useState<Product[]>(getInitialProducts);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(getInitialOrders);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('luxora_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('luxora_wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('luxora_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('luxora_user');
      }
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('luxora_products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('luxora_orders', JSON.stringify(orders));
    }
  }, [orders]);

  // Computed Values
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const isAuthenticated = user !== null;

  // Cart Functions
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        toast.success('Quantity updated in cart');
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success('Added to cart successfully!');
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    toast.success('Removed from cart');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Wishlist Functions
  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.some((item) => item.id === product.id)) {
        toast.info('Already in wishlist');
        return prevItems;
      }
      toast.success('Added to wishlist!');
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  // Auth Functions
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    };

    setUser(mockUser);
    toast.success(`Welcome back, ${mockUser.name}!`);
    setLocation('/');
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    };

    setUser(newUser);
    toast.success(`Welcome to LUXORA, ${newUser.name}!`);
    setLocation('/');
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
    setLocation('/');
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      setUser((prevUser) => ({ ...prevUser, ...userData }));
      toast.success('Profile updated successfully');
    }
  };

  // Products (Admin) Functions
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...product,
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    toast.success('Product added successfully');
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === id ? { ...p, ...product } : p))
    );
    toast.success('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    toast.success('Product deleted successfully');
  };

  // Orders Functions
  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      ...order,
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    toast.success('Order added successfully');
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders((prevOrders) => prevOrders.map((o) => (o.id === orderId ? { ...o, status } : o)));
    toast.success('Order status updated successfully');
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((o) => o.id !== orderId));
    toast.success('Order cancelled successfully');
  };

  // Newsletter Functions
  const subscribeNewsletter = async (email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success(`Subscribed to newsletter with email: ${email}`);
  };

  const value: AppContextType = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUserProfile,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    addOrder,
    updateOrderStatus,
    cancelOrder,
    subscribeNewsletter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
