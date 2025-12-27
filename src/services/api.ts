const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const getProductById = async (id: string) => {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};
