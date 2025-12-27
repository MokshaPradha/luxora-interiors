import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export function Wishlist() {
  const { wishlistItems, removeFromWishlist, addToCart, isInWishlist } = useApp();

  // EMPTY STATE
  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold mb-3">Your Wishlist is Empty</h2>
          <p className="text-gray-500 mb-8">Save products you love and find them here anytime.</p>

          <Link href="/shop">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  // WISHLIST WITH ITEMS
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-semibold mb-2">My Wishlist</h1>
          <p className="text-gray-500">
            You have {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your
            wishlist
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product: any) => {
            const pid = product._id ?? product.id;
            const imgs = product.images ?? (product.image ? [product.image] : []);
            return (
              <ProductCard
                key={pid}
                _id={pid}
                images={imgs}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating || 0}
                reviews={product.reviews || product.reviewsList?.length || 0}
                inWishlist={isInWishlist(pid)}
                onAddToCart={() => addToCart(product)}
                onToggleWishlist={() => removeFromWishlist(pid)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
