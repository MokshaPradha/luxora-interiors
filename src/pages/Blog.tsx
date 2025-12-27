import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Badge } from '../components/ui/badge';
import { motion } from 'motion/react';

export function Blog() {
  const posts = [
    {
      id: '1',
      title: '10 Essential Tips for Creating a Luxury Living Room',
      excerpt:
        'Discover the secrets to designing a living room that exudes elegance and comfort. From furniture selection to color palettes, we cover it all.',
      image:
        'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      author: 'Sophia Martinez',
      date: 'Nov 10, 2025',
      category: 'Interior Tips',
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Trending Furniture Styles for 2025',
      excerpt:
        "Stay ahead of the curve with the latest furniture trends. From minimalist designs to bold statement pieces, explore what's hot this year.",
      image:
        'https://images.unsplash.com/photo-1722268994698-b85790171832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      author: 'James Anderson',
      date: 'Nov 8, 2025',
      category: 'Trends',
      readTime: '7 min read',
    },
    {
      id: '3',
      title: 'The Perfect Color Palette Guide for Modern Homes',
      excerpt:
        'Color can transform a space. Learn how to choose and combine colors to create harmonious and stunning interiors.',
      image:
        'https://images.unsplash.com/photo-1594296220371-a34da13ff6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      author: 'Emma Thompson',
      date: 'Nov 5, 2025',
      category: 'Color Guide',
      readTime: '6 min read',
    },
    {
      id: '4',
      title: 'Sustainable Furniture: Beauty Meets Responsibility',
      excerpt:
        "Explore eco-friendly furniture options that don't compromise on style. Learn about sustainable materials and practices.",
      image:
        'https://images.unsplash.com/photo-1631563642459-ae1b71341a5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      author: 'David Chen',
      date: 'Nov 2, 2025',
      category: 'Sustainability',
      readTime: '8 min read',
    },
    {
      id: '5',
      title: 'Small Space, Big Impact: Maximizing Compact Living',
      excerpt:
        'Make the most of limited space with clever furniture choices and design tricks that create the illusion of spaciousness.',
      image:
        'https://images.unsplash.com/photo-1656699170530-21004fb9ec2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      author: 'Sophia Martinez',
      date: 'Oct 28, 2025',
      category: 'Space Planning',
      readTime: '6 min read',
    },
    {
      id: '6',
      title: 'Mixing Textures: The Key to Depth and Interest',
      excerpt:
        'Learn how to layer different textures to add dimension and visual interest to any room in your home.',
      image:
        'https://images.unsplash.com/photo-1673201102066-b0599d45002b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      author: 'Emma Thompson',
      date: 'Oct 25, 2025',
      category: 'Design Tips',
      readTime: '5 min read',
    },
  ];

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4" style={{ fontSize: '2.5rem' }}>
            Interior Design Blog
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert tips, trends, and inspiration for creating beautiful spaces
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card rounded-lg overflow-hidden border border-border">
            <div className="aspect-video lg:aspect-auto">
              <ImageWithFallback
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-accent text-accent-foreground">Featured</Badge>
              <h2 className="mb-4" style={{ fontSize: '2rem' }}>
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredPost.date}</span>
                </div>
              </div>
              <Link href={`/blog/${featuredPost.id}`}>
                <a>
                  <Button>
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <Badge variant="outline" className="mb-3">
                  {post.category}
                </Badge>
                <h3 className="mb-3 group-hover:text-accent transition-colors">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.id}`}>
                  <a>
                    <Button variant="ghost" className="group-hover:text-accent">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <Button variant="outline">Previous</Button>
          <Button variant="outline" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}
