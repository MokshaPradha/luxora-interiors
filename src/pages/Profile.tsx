import { useState } from "react";
import { User, Package, MapPin, Heart, Settings, LogOut, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";
import { Link } from "wouter";
import { toast } from "sonner@2.0.3";

export function Profile() {
  const { user, isAuthenticated, logout, updateUserProfile, orders, cancelOrder } = useApp();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <User className="w-20 h-20 text-muted mx-auto mb-6" />
            <h2 className="mb-4">Please Sign In</h2>
            <p className="text-muted-foreground mb-8">
              You need to be logged in to view your profile
            </p>
            <Link href="/login">
              <a>
                <Button size="lg">
                  Go to Login
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "+1 (555) 123-4567",
    avatar: user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
  });

  const addresses = [
    {
      id: "1",
      type: "Home",
      name: "John Doe",
      address: "123 Design Street",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      default: true
    },
    {
      id: "2",
      type: "Office",
      name: "John Doe",
      address: "456 Business Ave",
      city: "New York, NY 10002",
      phone: "+1 (555) 987-6543",
      default: false
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
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(userData);
  };
  
  const handleCancelOrder = (orderId: string, orderStatus: string) => {
    if (orderStatus === "Delivered") {
      toast.error("Cannot cancel a delivered order");
      return;
    }
    if (orderStatus === "Cancelled") {
      toast.info("Order is already cancelled");
      return;
    }
    if (confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(orderId);
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-8" style={{ fontSize: '2.5rem' }}>My Profile</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <ImageWithFallback
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3>{userData.name}</h3>
                  <p className="text-muted-foreground">{userData.email}</p>
                </div>

                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 w-5 h-5" />
                    Profile Info
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="mr-2 w-5 h-5" />
                    Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="mr-2 w-5 h-5" />
                    Addresses
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="mr-2 w-5 h-5" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 w-5 h-5" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={logout}>
                    <LogOut className="mr-2 w-5 h-5" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-6">Edit Profile</h2>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Package className="w-16 h-16 text-muted mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">No orders yet</p>
                        <Link href="/shop">
                          <a>
                            <Button variant="outline">Start Shopping</Button>
                          </a>
                        </Link>
                      </CardContent>
                    </Card>
                  ) : (
                    orders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-muted-foreground">Order #{order.id}</p>
                                <p className="text-muted-foreground">{order.date}</p>
                              </div>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {order.products.map((product) => (
                                <div key={product.id} className="flex gap-3">
                                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                    <ImageWithFallback
                                      src={product.image}
                                      alt={product.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="line-clamp-2">{product.title}</p>
                                    <p className="text-muted-foreground">Qty: {product.quantity}</p>
                                    <p className="text-accent">${product.price.toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-border">
                              <div>
                                <p className="text-muted-foreground">{order.items} items</p>
                                <p className="text-accent">${order.total.toFixed(2)}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Track Order</Button>
                                {order.status !== "Delivered" && order.status !== "Cancelled" && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleCancelOrder(order.id, order.status)}
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="addresses" className="mt-6">
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <Card key={address.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3>{address.type}</h3>
                              {address.default && (
                                <Badge className="bg-accent text-accent-foreground">Default</Badge>
                              )}
                            </div>
                            <p>{address.name}</p>
                            <p className="text-muted-foreground">{address.address}</p>
                            <p className="text-muted-foreground">{address.city}</p>
                            <p className="text-muted-foreground">{address.phone}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Delete</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button className="w-full bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground">
                    Add New Address
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="wishlist" className="mt-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="w-16 h-16 text-muted mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                    <Button variant="outline">Browse Products</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}