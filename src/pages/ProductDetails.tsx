import { useState } from "react";
import { useRoute } from "wouter";
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Share2, Minus, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCard } from "../components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: params?.id || "1",
    title: "Modern Velvet Sofa - Luxurious Comfort",
    price: 2499,
    originalPrice: 3299,
    rating: 5,
    reviews: 128,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1759229874865-20a8c780c86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1762803841422-5b8cf8767cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1722268994698-b85790171832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1758977403341-0104135995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    ],
    description: "Experience unparalleled comfort and luxury with our Modern Velvet Sofa. Meticulously crafted with premium materials and featuring elegant design, this sofa is the perfect centerpiece for your living room. The soft velvet upholstery and sturdy hardwood frame ensure both comfort and durability.",
    features: [
      "Premium velvet upholstery",
      "Solid hardwood frame",
      "High-density foam cushions",
      "Removable cushion covers",
      "Available in multiple colors",
      "Hand-crafted details"
    ],
    specifications: {
      "Dimensions": "85\" W x 36\" D x 32\" H",
      "Material": "Velvet, Hardwood",
      "Weight": "120 lbs",
      "Color": "Emerald Green",
      "Assembly": "Minimal assembly required",
      "Warranty": "10 years"
    }
  };

  const relatedProducts = [
    {
      id: "2",
      title: "Designer Wooden Armchair",
      price: 899,
      originalPrice: 1199,
      rating: 4.5,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1631563642459-ae1b71341a5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
    {
      id: "3",
      title: "Minimalist Coffee Table",
      price: 549,
      originalPrice: 799,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1656699170530-21004fb9ec2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
    {
      id: "4",
      title: "Marble Side Table with Gold Frame",
      price: 699,
      originalPrice: 999,
      rating: 4.7,
      reviews: 88,
      image: "https://images.unsplash.com/photo-1762856490803-8e200418973a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
    {
      id: "5",
      title: "Elegant Ottoman - Premium Fabric",
      price: 399,
      originalPrice: 599,
      rating: 4.6,
      reviews: 72,
      image: "https://images.unsplash.com/photo-1565374369705-acde12f3caa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-24">
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-card">
                <ImageWithFallback
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-accent" : "border-border"
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-accent text-accent-foreground">
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
              {product.inStock && (
                <Badge variant="outline" className="border-green-500 text-green-600">
                  In Stock
                </Badge>
              )}
            </div>

            <h1 className="mb-4" style={{ fontSize: '2rem' }}>{product.title}</h1>

            <div className="flex items-center mb-6">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-accent" style={{ fontSize: '2rem' }}>${product.price}</span>
              <span className="text-muted-foreground line-through" style={{ fontSize: '1.25rem' }}>
                ${product.originalPrice}
              </span>
            </div>

            <p className="text-muted-foreground mb-8">
              {product.description}
            </p>

            {/* Quantity & Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-6">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button 
                size="lg" 
                className="flex-1 bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground"
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(product);
                  }
                }}
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  if (isInWishlist(product.id)) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product);
                  }
                }}
                className={isInWishlist(product.id) ? "border-accent text-accent" : ""}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              </Button>

              <Button size="lg" variant="outline">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-accent" />
                <div>
                  <div>Free Delivery</div>
                  <div className="text-muted-foreground">White-glove service</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-accent" />
                <div>
                  <div>10 Year Warranty</div>
                  <div className="text-muted-foreground">Full coverage</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-accent" />
                <div>
                  <div>30-Day Returns</div>
                  <div className="text-muted-foreground">Easy process</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="mt-6">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <p className="text-muted-foreground">
                  {product.reviews} customer reviews with an average rating of {product.rating} stars.
                </p>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="mb-8" style={{ fontSize: '2rem' }}>You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                {...product}
                inWishlist={isInWishlist(product.id)}
                onAddToCart={() => addToCart(product)}
                onToggleWishlist={() => {
                  if (isInWishlist(product.id)) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product);
                  }
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
