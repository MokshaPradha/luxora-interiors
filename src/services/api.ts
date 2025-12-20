const API_URL = "http://localhost:5000";

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`);
  return response.json();
};


