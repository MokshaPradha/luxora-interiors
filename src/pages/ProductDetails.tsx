import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { getProductById, getProducts } from '../services/api';
import sampleProducts from '../data/sampleProducts';
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export function ProductDetails() {
  const [, params] = useRoute<{ id: string }>('/product/:id');
  const id = params?.id;

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specifications' | 'reviews'>('features');
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    let mounted = true;

    getProductById(id)
      .then((data) => {
        if (!mounted) return;
        if (data && Object.keys(data).length > 0) {
          setProduct(data);
          setLoading(false);
        } else {
          // fallback to client sample products (when product comes from local list)
          const local = sampleProducts.find((p) => p.id === id || String(p.id) === String(id));
          if (local) {
            // adapt shape to backend-like structure
            setProduct({ ...local, images: local.image ? [local.image] : [] });
          }
          setLoading(false);
        }
      })
      .catch(() => {
        const local = sampleProducts.find((p) => p.id === id || String(p.id) === String(id));
        if (local) setProduct({ ...local, images: local.image ? [local.image] : [] });
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  // compute related products after product is loaded
  useEffect(() => {
    if (!product) return;

    let mounted = true;

    const normalize = (p: any) => {
      const pid = p._id ?? p.id ?? String(p.id ?? p._id ?? '');
      const imgs = p.images ?? (p.image ? [p.image] : []);
      return {
        id: pid,
        _id: pid,
        title: p.title,
        price: p.price,
        originalPrice: p.originalPrice ?? p.price,
        images: imgs,
        image: imgs[0] ?? '',
        rating: p.rating ?? 5,
        reviews: p.reviews ?? p.reviewsList?.length ?? 0,
        category: p.category,
        style: p.style,
        brand: p.brand,
      };
    };

    // try backend first, then fallback to sampleProducts
    getProducts()
      .then((res: any) => {
        const list = Array.isArray(res) && res.length > 0 ? res : sampleProducts;
        const pool = [...list.map(normalize), ...sampleProducts.map(normalize)];

        const score = (p: any) => {
          let s = 0;
          if (!p) return -1;
          if (product.category && p.category && p.category === product.category) s += 3;
          if (product.style && p.style && p.style === product.style) s += 2;
          if (product.brand && p.brand && p.brand === product.brand) s += 2;
          // small boost for similar price range
          try {
            const diff = Math.abs((p.price || 0) - (product.price || 0));
            if (diff < (product.price || 1) * 0.2) s += 1;
          } catch {}
          return s;
        };

        const relatedList = pool
          .filter((p) => p.id !== (product._id ?? product.id))
          .map((p) => ({ ...p, score: score(p) }))
          .filter((p) => p.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 6);

        if (mounted) setRelated(relatedList);
      })
      .catch(() => {
        const pool = sampleProducts.map(normalize);
        const relatedList = pool.filter((p) => p.id !== (product._id ?? product.id)).slice(0, 6);
        if (mounted) setRelated(relatedList);
      });

    return () => {
      mounted = false;
    };
  }, [product]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!product) return <p className="p-10">Product not found</p>;

  return (
    <div className="py-12 bg-[#faf7f2]">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ================= LEFT : IMAGES ================= */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-white">
            <ImageWithFallback
              src={product.images?.[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-black' : 'border-gray-200'
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ================= RIGHT : DETAILS ================= */}
        <div>
          <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating || 0)
                    ? 'fill-[#d4a259] text-[#d4a259]'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({product.reviewsList?.length || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-semibold text-[#d4a259]">₹{product.price}</span>
            {product.originalPrice && (
              <span className="line-through text-gray-400">₹{product.originalPrice}</span>
            )}
          </div>

          {/* Description */}
          <p className="mb-6 text-gray-600 leading-relaxed">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus />
            </Button>
            <span className="text-lg">{quantity}</span>
            <Button size="icon" variant="outline" onClick={() => setQuantity(quantity + 1)}>
              <Plus />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              className="flex-1 h-12 text-lg"
              onClick={() => {
                for (let i = 0; i < quantity; i++) addToCart(product);
              }}
            >
              <ShoppingCart className="mr-2" /> Add to Cart
            </Button>

            <Button
              variant="outline"
              className="h-12 w-12"
              onClick={() =>
                isInWishlist(product._id) ? removeFromWishlist(product._id) : addToWishlist(product)
              }
            >
              <Heart className={isInWishlist(product._id) ? 'fill-red-500 text-red-500' : ''} />
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-white rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Truck className="text-[#d4a259]" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-gray-500">White-glove service</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#d4a259]" />
              <div>
                <p className="font-medium">10 Year Warranty</p>
                <p className="text-sm text-gray-500">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="text-[#d4a259]" />
              <div>
                <p className="font-medium">30-Day Returns</p>
                <p className="text-sm text-gray-500">Easy process</p>
              </div>
            </div>
          </div>

          {/* ================= TABS ================= */}
          <div className="flex bg-gray-200 rounded-full p-1 mb-6">
            {['features', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2 rounded-full text-sm capitalize transition-all ${
                  activeTab === tab ? 'bg-white shadow font-semibold' : 'text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ================= TAB CONTENT ================= */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            {activeTab === 'features' && (
              <ul className="space-y-3">
                {product.features?.map((f: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-[#d4a259]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-3">
                {Object.entries(product.specifications || {}).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{k}</span>
                    <span className="text-gray-600">{String(v)}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {product.reviewsList?.length > 0 ? (
                  product.reviewsList.map((r: any, i: number) => (
                    <div key={i} className="border rounded-xl p-4 bg-[#faf7f2]">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">{r.name}</span>
                        <span className="text-[#d4a259]">⭐ {r.rating}</span>
                      </div>
                      <p className="text-gray-600">{r.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {related && related.length > 0 && (
        <div className="container mx-auto px-4 mt-12">
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                _id={p.id}
                images={p.images}
                title={p.title}
                price={p.price}
                originalPrice={p.originalPrice}
                rating={p.rating}
                reviews={p.reviews}
                inWishlist={isInWishlist(p.id)}
                onAddToCart={() => addToCart(p)}
                onToggleWishlist={() => {
                  if (isInWishlist(p.id)) removeFromWishlist(p.id);
                  else addToWishlist({ ...p, id: p.id, image: p.image });
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
