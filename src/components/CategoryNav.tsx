import { Link } from 'wouter';
import { Sofa, Armchair, Lamp, Bed, BookOpen, Grid3x3 } from 'lucide-react';
import { motion } from 'motion/react';

export function CategoryNav() {
  const categories = [
    { name: 'All Products', icon: Grid3x3, filter: '' },
    { name: 'Sofas', icon: Sofa, filter: 'Sofas' },
    { name: 'Chairs', icon: Armchair, filter: 'Chairs' },
    { name: 'Tables', icon: BookOpen, filter: 'Tables' },
    { name: 'Beds', icon: Bed, filter: 'Beds' },
    { name: 'Lighting', icon: Lamp, filter: 'Lighting' },
  ];

  return (
    <div className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Find exactly what you need for your space</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.filter ? `/shop?category=${category.filter}` : '/shop'}
            >
              <a>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <category.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3>{category.name}</h3>
                  </div>
                </motion.div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
