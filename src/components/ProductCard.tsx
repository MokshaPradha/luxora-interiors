import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  inWishlist?: boolean;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
}

export function ProductCard({
  id,
  image,
  title,
  price,
  originalPrice,
  rating,
  reviews,
  inWishlist = false,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const [isWishlist, setIsWishlist] = useState(inWishlist);

  const handleWishlistToggle = () => {
    setIsWishlist(!isWishlist);
    onToggleWishlist?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/product/${id}`}>
        <a className="block relative overflow-hidden aspect-square">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {originalPrice && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full">
              Save {Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </div>
          )}
        </a>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground ${
          isWishlist ? "text-accent" : ""
        }`}
        onClick={handleWishlistToggle}
      >
        <Heart className={`w-5 h-5 ${isWishlist ? "fill-current" : ""}`} />
      </Button>

      <div className="p-4">
        <Link href={`/product/${id}`}>
          <a className="block">
            <h3 className="mb-2 group-hover:text-accent transition-colors line-clamp-2">
              {title}
            </h3>
          </a>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-accent text-accent"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-muted-foreground">({reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-accent">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            size="sm"
            className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground"
            onClick={onAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
