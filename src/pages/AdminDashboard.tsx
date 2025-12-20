import { useState } from "react";
import { Package, Users, DollarSign, TrendingUp, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export function AdminDashboard() {
  const { products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus } = useApp();
  
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    originalPrice: "",
    category: "",
    description: "",
    material: "",
    style: "",
    brand: "",
    image: "",
    rating: "5",
    reviews: "0"
  });
  
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    originalPrice: "",
    category: "",
    description: "",
    material: "",
    style: "",
    brand: "",
    image: "",
    rating: "",
    reviews: ""
  });

  const stats = [
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      positive: true
    },
    {
      icon: Package,
      label: "Total Orders",
      value: orders.length.toString(),
      change: "+8.2%",
      positive: true
    },
    {
      icon: Users,
      label: "Total Customers",
      value: "3,847",
      change: "+15.3%",
      positive: true
    },
    {
      icon: TrendingUp,
      label: "Total Products",
      value: products.length.toString(),
      change: "+2.1%",
      positive: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) {
      return;
    }
    
    addProduct({
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : undefined,
      category: newProduct.category,
      description: newProduct.description,
      material: newProduct.material,
      style: newProduct.style,
      brand: newProduct.brand,
      image: newProduct.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      rating: parseFloat(newProduct.rating) || 5,
      reviews: parseInt(newProduct.reviews) || 0
    });
    
    setNewProduct({
      title: "",
      price: "",
      originalPrice: "",
      category: "",
      description: "",
      material: "",
      style: "",
      brand: "",
      image: "",
      rating: "5",
      reviews: "0"
    });
  };
  
  const handleEditProduct = (product: any) => {
    setEditingProduct(product.id);
    setEditForm({
      title: product.title,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      category: product.category || "",
      description: product.description || "",
      material: product.material || "",
      style: product.style || "",
      brand: product.brand || "",
      image: product.image || "",
      rating: product.rating.toString(),
      reviews: product.reviews.toString()
    });
  };
  
  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    updateProduct(editingProduct, {
      title: editForm.title,
      price: parseFloat(editForm.price),
      originalPrice: editForm.originalPrice ? parseFloat(editForm.originalPrice) : undefined,
      category: editForm.category,
      description: editForm.description,
      material: editForm.material,
      style: editForm.style,
      brand: editForm.brand,
      image: editForm.image,
      rating: parseFloat(editForm.rating),
      reviews: parseInt(editForm.reviews)
    });
    
    setEditingProduct(null);
  };
  
  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };
  
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="py-12 bg-secondary min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2" style={{ fontSize: '2.5rem' }}>Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your furniture store</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-accent" />
                    </div>
                    <Badge className={stat.positive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-accent" style={{ fontSize: '1.75rem' }}>{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3">Order ID</th>
                        <th className="text-left py-3">Date</th>
                        <th className="text-left py-3">Items</th>
                        <th className="text-left py-3">Amount</th>
                        <th className="text-left py-3">Status</th>
                        <th className="text-left py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-border">
                          <td className="py-4">{order.id}</td>
                          <td className="py-4">{order.date}</td>
                          <td className="py-4">{order.items}</td>
                          <td className="py-4">${order.total.toFixed(2)}</td>
                          <td className="py-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="px-2 py-1 border border-border rounded-md"
                            >
                              <option value="Processing">Processing</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-4">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6">Manage Products</h2>
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No products added yet. Add your first product!</p>
                  ) : (
                    products.map((product) => (
                      <div key={product.id} className="border border-border rounded-lg p-4">
                        {editingProduct === product.id ? (
                          <form onSubmit={handleUpdateProduct} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label>Product Name</Label>
                                <Input
                                  value={editForm.title}
                                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label>Price</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={editForm.price}
                                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label>Original Price</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={editForm.originalPrice}
                                  onChange={(e) => setEditForm({ ...editForm, originalPrice: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <Label>Category</Label>
                                <Input
                                  value={editForm.category}
                                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Material</Label>
                                <Input
                                  value={editForm.material}
                                  onChange={(e) => setEditForm({ ...editForm, material: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Style</Label>
                                <Input
                                  value={editForm.style}
                                  onChange={(e) => setEditForm({ ...editForm, style: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Brand</Label>
                                <Input
                                  value={editForm.brand}
                                  onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Description</Label>
                              <textarea
                                className="w-full px-3 py-2 bg-input-background border border-border rounded-md"
                                rows={2}
                                value={editForm.description}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button type="submit" size="sm" className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground">
                                Save Changes
                              </Button>
                              <Button type="button" variant="outline" size="sm" onClick={() => setEditingProduct(null)}>
                                Cancel
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                              {product.image && (
                                <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-md" />
                              )}
                              <div>
                                <h3 className="mb-1">{product.title}</h3>
                                <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
                                <div className="flex gap-2 mt-2">
                                  {product.category && <Badge variant="outline">{product.category}</Badge>}
                                  {product.material && <Badge variant="outline">{product.material}</Badge>}
                                  {product.brand && <Badge variant="outline">{product.brand}</Badge>}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-product" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6">Add New Product</h2>
                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="productName">Product Name *</Label>
                      <Input
                        id="productName"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        placeholder="Modern Velvet Sofa"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="2499.00"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="originalPrice">Original Price</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={newProduct.originalPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                        placeholder="3299.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        className="w-full px-3 py-2 bg-input-background border border-border rounded-md"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      >
                        <option value="">Select Category</option>
                        <option value="Sofas">Sofas</option>
                        <option value="Chairs">Chairs</option>
                        <option value="Tables">Tables</option>
                        <option value="Beds">Beds</option>
                        <option value="Storage">Storage</option>
                        <option value="Lighting">Lighting</option>
                        <option value="Decor">Decor</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="material">Material</Label>
                      <Input
                        id="material"
                        value={newProduct.material}
                        onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                        placeholder="Velvet"
                      />
                    </div>
                    <div>
                      <Label htmlFor="style">Style</Label>
                      <Input
                        id="style"
                        value={newProduct.style}
                        onChange={(e) => setNewProduct({ ...newProduct, style: e.target.value })}
                        placeholder="Modern"
                      />
                    </div>
                    <div>
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                        placeholder="Luxora Signature"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      rows={4}
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-md"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Product description..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="rating">Rating (1-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={newProduct.rating}
                        onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reviews">Number of Reviews</Label>
                      <Input
                        id="reviews"
                        type="number"
                        value={newProduct.reviews}
                        onChange={(e) => setNewProduct({ ...newProduct, reviews: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground">
                    <Plus className="mr-2 w-5 h-5" />
                    Add Product
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6">Dashboard Settings</h2>
                <p className="text-muted-foreground">
                  Configure your dashboard settings and preferences.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}