import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export function Wishlist() {
  const { wishlistItems, removeFromWishlist, addToCart, isInWishlist } = useApp();

  if (wishlistItems.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <Heart className="w-20 h-20 text-muted mx-auto mb-6" />
            <h2 className="mb-4">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mb-8">
              Save items you love to your wishlist
            </p>
            <Link href="/shop">
              <a>
                <Button size="lg">
                  Start Shopping
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-8" style={{ fontSize: '2.5rem' }}>My Wishlist</h1>
          <p className="text-muted-foreground mb-8">
            You have {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              inWishlist={isInWishlist(product.id)}
              onAddToCart={() => addToCart(product)}
              onToggleWishlist={() => removeFromWishlist(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}