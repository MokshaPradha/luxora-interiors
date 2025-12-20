import { Link } from "wouter";
import { ArrowRight, Star, Award, Truck, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CategoryNav } from "../components/CategoryNav";
import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { useApp } from "../context/AppContext";

export function Home() {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();

  const featuredCategories = [
    {
      id: "1",
      title: "Luxury Sofas",
      image: "https://images.unsplash.com/photo-1762803841422-5b8cf8767cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      count: "50+ Designs"
    },
    {
      id: "2",
      title: "Premium Chairs",
      image: "https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      count: "40+ Designs"
    },
    {
      id: "3",
      title: "Elegant Beds",
      image: "https://images.unsplash.com/photo-1762803733564-fecc7669a91a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      count: "35+ Designs"
    },
    {
      id: "4",
      title: "Dining Tables",
      image: "https://images.unsplash.com/photo-1593136596203-7212b076f4d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      count: "30+ Designs"
    },
  ];

  const trendingProducts = [
    {
      id: "1",
      title: "Modern Velvet Sofa - Luxurious Comfort",
      price: 2499,
      originalPrice: 3299,
      rating: 5,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1759229874865-20a8c780c86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
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
    },
    {
      id: "6",
      title: "Designer Floor Lamp",
      price: 449,
      originalPrice: 649,
      rating: 4.9,
      reviews: 103,
      image: "https://images.unsplash.com/photo-1640132219022-e7a98b4c92e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    }
  ];

  const testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Interior Designer",
      rating: 5,
      comment: "Absolutely stunning pieces! The quality and craftsmanship exceeded my expectations. Perfect for my luxury projects.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Homeowner",
      rating: 5,
      comment: "The interior design service transformed our living space into something extraordinary. Highly recommend!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Real Estate Developer",
      rating: 5,
      comment: "We furnish all our luxury properties with Luxora. The premium quality and elegant designs are unmatched.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    }
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Premium Delivery",
      description: "White-glove delivery on all orders"
    },
    {
      icon: Shield,
      title: "10-Year Warranty",
      description: "Complete peace of mind"
    },
    {
      icon: Award,
      title: "Authentic Craftsmanship",
      description: "100% genuine materials"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[600px] md:h-[700px] overflow-hidden"
      >
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt="Luxury Living Room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-primary-foreground"
          >
            <div className="inline-block px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-accent">NEW COLLECTION 2025</span>
            </div>
            <h1 className="mb-6" style={{ fontSize: '3.5rem', lineHeight: '1.1' }}>
              Luxury Furniture for Exceptional Living
            </h1>
            <p className="mb-8 opacity-90" style={{ fontSize: '1.1rem' }}>
              Discover our curated collection of premium furniture and bespoke interior design services that transform spaces into masterpieces.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <a>
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Explore Collection
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </Link>
              <Link href="/interior-services">
                <a>
                  <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Design Services
                  </Button>
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

     {/* Features */}
<section className="py-16 bg-card">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: "easeOut",
          }}
          className="flex items-center space-x-4 p-6 rounded-lg border border-border bg-background hover:shadow-lg transition-shadow"
        >
          <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <feature.icon className="w-6 h-6 text-accent" />
          </div>

          <div>
            <h3 className="mb-1">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our extensive collection of luxury furniture categorized for your convenience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="/shop">
                  <a className="group block relative overflow-hidden rounded-lg aspect-[3/4]">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                      <h3 className="mb-2">{category.title}</h3>
                      <p className="text-accent">{category.count}</p>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>Trending Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the most sought-after pieces in our collection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingProducts.map((product) => (
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

          <div className="text-center mt-12">
            <Link href="/shop">
              <a>
                <Button size="lg" variant="outline">
                  View All Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Interior Design Services Preview */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt="Interior Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ fontSize: '2.5rem' }}>
                Transform Your Space with Professional Design
              </h2>
              <p className="mb-8 opacity-90" style={{ fontSize: '1.1rem' }}>
                Our expert interior designers work with you to create luxurious, functional spaces that reflect your unique style and personality.
              </p>
              <Link href="/interior-services">
                <a>
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Explore Design Services
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their spaces with Luxora
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background p-8 rounded-lg border border-border"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">{testimonial.comment}</p>
                <div className="flex items-center">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p className="text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}