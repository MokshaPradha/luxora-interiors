import { Link } from 'wouter';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  // Accept either backend (_id, images) or frontend (id, image) shapes
  _id?: string;
  id?: string;
  images?: string[];
  image?: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  inWishlist?: boolean;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}

export function ProductCard({
  _id,
  id,
  images,
  image,
  title,
  price,
  originalPrice,
  rating = 5,
  reviews = 0,
  inWishlist = false,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const productId = _id ?? id ?? '';
  const src = images?.[0] ?? image ?? '';
  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-xl transition">
      {/* IMAGE */}
      <Link href={`/product/${productId}`}>
        <div className="block aspect-square overflow-hidden rounded-t-xl">
          <ImageWithFallback src={src} alt={title} className="w-full h-full object-cover" />
        </div>
      </Link>

      {/* WISHLIST */}
      <button
        onClick={onToggleWishlist}
        className="absolute top-3 right-3 bg-white p-2 rounded-full"
      >
        <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* DETAILS */}
      <div className="p-4">
        <h3 className="font-medium mb-2">{title}</h3>

        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating as number)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm">({reviews})</span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">₹{price}</span>
            {originalPrice && (
              <span className="ml-2 line-through text-gray-400">₹{originalPrice}</span>
            )}
          </div>

          <Button size="sm" onClick={onAddToCart}>
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
