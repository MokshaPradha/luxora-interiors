import { getProducts } from '../services/api';
import { Link } from 'wouter';
import { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { useLocation } from 'wouter';
import sampleProducts from '../data/sampleProducts';

export function Shop() {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const [location] = useLocation();
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [backendProducts, setBackendProducts] = useState<any[]>([]);

  const itemsPerPage = 9;

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('search');
    const category = params.get('category');
    if (query) {
      setSearchQuery(query);
    }
    if (category) {
      setSelectedCategories([category]);
    }
  }, [location]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBackendProducts(data);
        }
      })
      .catch((err) => console.error('Backend products error:', err));
  }, []);

  const allProducts = sampleProducts;

  const materials = ['Wood', 'Metal', 'Velvet', 'Leather', 'Marble', 'Glass'];
  const styles = ['Modern', 'Contemporary', 'Minimalist', 'Classic', 'Industrial', 'Scandinavian'];
  const brands = ['Luxora Signature', 'Modern Living', 'Classic Comfort', 'Urban Design'];

  // Toggle filter selections
  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
    setCurrentPage(1);
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
    setCurrentPage(1);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedMaterials([]);
    setSelectedStyles([]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  const sourceProducts = backendProducts.length > 0 ? backendProducts : allProducts;

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = sourceProducts.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          product.title.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query) ||
          product.style.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query);

        if (!matchesSearch) {
          return false;
        }
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Material filter
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
        return false;
      }

      // Style filter
      if (selectedStyles.length > 0 && !selectedStyles.includes(product.style)) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      return true;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    return sorted;
  }, [allProducts, priceRange, selectedMaterials, selectedStyles, selectedBrands, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2" style={{ fontSize: '2.5rem' }}>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Furniture Collection'}
          </h1>
          <p className="text-muted-foreground">
            {searchQuery
              ? `Found ${filteredAndSortedProducts.length} products matching your search`
              : 'Discover our complete range of luxury furniture'}
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                window.history.pushState({}, '', '/shop');
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Clear Search
            </Button>
          )}
        </div>

        {/* Filters & Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <SlidersHorizontal className="mr-2 w-4 h-4" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              Showing {currentProducts.length} of {filteredAndSortedProducts.length} products
            </span>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-64 flex-shrink-0"
            >
              <div className="bg-card p-6 rounded-lg border border-border sticky top-24">
                <h3 className="mb-6">Filters</h3>

                {/* Price Range */}
                <div className="mb-8">
                  <Label className="mb-4 block">Price Range</Label>
                  <Slider
                    max={5000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Material */}
                <div className="mb-8">
                  <Label className="mb-4 block">Material</Label>
                  <div className="space-y-3">
                    {materials.map((material) => (
                      <div key={material} className="flex items-center">
                        <Checkbox
                          id={`material-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => toggleMaterial(material)}
                        />
                        <label htmlFor={`material-${material}`} className="ml-2 cursor-pointer">
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div className="mb-8">
                  <Label className="mb-4 block">Style</Label>
                  <div className="space-y-3">
                    {styles.map((style) => (
                      <div key={style} className="flex items-center">
                        <Checkbox
                          id={`style-${style}`}
                          checked={selectedStyles.includes(style)}
                          onCheckedChange={() => toggleStyle(style)}
                        />
                        <label htmlFor={`style-${style}`} className="ml-2 cursor-pointer">
                          {style}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div className="mb-6">
                  <Label className="mb-4 block">Brand</Label>
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label htmlFor={`brand-${brand}`} className="ml-2 cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </motion.aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentProducts.map((product: any) => {
                    const pid = product._id ?? product.id;
                    const imgs = product.images ?? (product.image ? [product.image] : []);
                    return (
                      <ProductCard
                        key={pid}
                        _id={pid}
                        images={imgs}
                        title={product.title}
                        price={product.price}
                        originalPrice={product.originalPrice ?? product.price}
                        rating={product.rating ?? 5}
                        reviews={product.reviews ?? 0}
                        inWishlist={isInWishlist(pid)}
                        onAddToCart={() => addToCart(product)}
                        onToggleWishlist={() => {
                          if (isInWishlist(pid)) {
                            removeFromWishlist(pid);
                          } else {
                            // ensure product has id field expected by wishlist/context
                            const pForWishlist = { ...product, id: pid, image: imgs[0] };
                            addToWishlist(pForWishlist);
                          }
                        }}
                      />
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant="outline"
                        className={currentPage === page ? 'bg-primary text-primary-foreground' : ''}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">
                  No products found matching your filters.
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
