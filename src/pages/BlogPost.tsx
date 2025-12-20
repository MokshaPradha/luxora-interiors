import { useRoute, Link } from "wouter";
import { Calendar, User, ArrowLeft, Share2, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";

export function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  
  // Mock blog posts database
  const blogPosts = {
    "1": {
      id: "1",
      title: "10 Essential Tips for Creating a Luxury Living Room",
      content: `
        <p>Creating a luxury living room is an art that combines elegance, comfort, and functionality. Whether you're starting from scratch or renovating an existing space, these essential tips will help you achieve a sophisticated and inviting atmosphere that reflects your personal style.</p>
        
        <h2>1. Start with a Cohesive Color Palette</h2>
        <p>The foundation of any luxury living room is a well-thought-out color scheme. Opt for neutral tones like cream, beige, gray, or taupe as your base, then add depth with rich accent colors such as emerald green, navy blue, or burgundy. This creates a timeless elegance that won't go out of style.</p>
        
        <h2>2. Invest in Quality Furniture</h2>
        <p>Luxury is synonymous with quality. Choose furniture pieces that are not only beautiful but also built to last. Look for solid wood frames, premium upholstery fabrics, and superior craftsmanship. A well-made sofa or armchair will serve you for decades while maintaining its beauty.</p>
        
        <h2>3. Layer Your Lighting</h2>
        <p>Proper lighting is crucial in creating ambiance. Combine ambient lighting (overhead fixtures), task lighting (reading lamps), and accent lighting (wall sconces or picture lights) to create depth and flexibility. Consider installing dimmer switches to adjust the mood throughout the day.</p>
        
        <h2>4. Add Texture and Depth</h2>
        <p>Mix different materials and textures to create visual interest. Combine velvet cushions with leather furniture, add a plush area rug over hardwood floors, or place a silk throw over a linen sofa. These layered textures add sophistication and warmth to your space.</p>
        
        <h2>5. Curate Art and Accessories</h2>
        <p>Select artwork and decorative objects that speak to you personally. Large-scale art pieces can serve as focal points, while smaller accessories should be thoughtfully arranged. Remember, in luxury design, less is often more – each piece should have purpose and meaning.</p>
        
        <h2>6. Embrace Symmetry</h2>
        <p>Symmetrical arrangements create a sense of order and balance that's inherently luxurious. Consider matching table lamps on either side of a sofa, or flanking a fireplace with identical armchairs. This classical approach never goes out of style.</p>
        
        <h2>7. Incorporate Natural Elements</h2>
        <p>Bring the outdoors in with natural materials like marble, wood, stone, or plants. These elements add organic beauty and help create a connection with nature, making your space feel more grounded and serene.</p>
        
        <h2>8. Focus on Scale and Proportion</h2>
        <p>Ensure your furniture is appropriately sized for your space. Oversized furniture in a small room feels cramped, while small pieces in a large room can look lost. Aim for balance and harmony in your furniture placement.</p>
        
        <h2>9. Install Window Treatments</h2>
        <p>Custom drapery adds instant luxury to any room. Choose quality fabrics like silk, velvet, or linen, and hang them high and wide to make windows appear larger. Layering sheers with heavier drapes provides flexibility for light control.</p>
        
        <h2>10. Don't Forget the Details</h2>
        <p>Small touches make a big difference. Upgrade your switch plates, door hardware, and curtain rods to high-quality finishes. Add fresh flowers, scented candles, and beautiful coffee table books. These finishing touches complete the luxury experience.</p>
        
        <p>Remember, creating a luxury living room is a journey, not a destination. Take your time to source pieces you truly love, and don't be afraid to invest in quality over quantity. The result will be a space that not only looks beautiful but feels authentically you.</p>
      `,
      excerpt: "Discover the secrets to designing a living room that exudes elegance and comfort. From furniture selection to color palettes, we cover it all.",
      image: "https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      author: "Sophia Martinez",
      date: "Nov 10, 2025",
      category: "Interior Tips",
      readTime: "5 min read"
    },
    "2": {
      id: "2",
      title: "Trending Furniture Styles for 2025",
      content: `
        <p>As we move through 2025, the furniture industry continues to evolve with fresh trends that balance aesthetics, functionality, and sustainability. Here's what's defining the furniture landscape this year.</p>
        
        <h2>Curved and Organic Shapes</h2>
        <p>Sharp edges are giving way to soft, rounded forms. From curved sofas to circular dining tables, organic shapes are dominating living spaces. This trend brings a sense of flow and comfort, creating more inviting and less rigid interiors.</p>
        
        <h2>Sustainable Materials</h2>
        <p>Eco-consciousness is no longer optional. Furniture made from recycled materials, reclaimed wood, and sustainable fabrics is at the forefront. Consumers are increasingly seeking pieces that are both beautiful and environmentally responsible.</p>
        
        <h2>Multifunctional Pieces</h2>
        <p>With urban living spaces becoming more compact, furniture that serves multiple purposes is essential. Look for storage ottomans, extendable dining tables, and sofa beds that maximize functionality without compromising style.</p>
        
        <h2>Bold Colors and Patterns</h2>
        <p>After years of neutral minimalism, vibrant colors are making a comeback. Rich jewel tones like emerald, sapphire, and ruby are appearing in upholstery, while bold geometric patterns add visual interest to contemporary spaces.</p>
        
        <h2>Artisanal Craftsmanship</h2>
        <p>There's a growing appreciation for handcrafted furniture that tells a story. Pieces featuring visible joinery, hand-carved details, and unique finishes are highly sought after, celebrating the human touch in an increasingly automated world.</p>
        
        <h2>Mixed Materials</h2>
        <p>Combining different materials in a single piece creates depth and interest. Expect to see metal and wood combinations, marble with brass accents, and glass paired with natural fibers.</p>
      `,
      excerpt: "Stay ahead of the curve with the latest furniture trends. From minimalist designs to bold statement pieces, explore what's hot this year.",
      image: "https://images.unsplash.com/photo-1722268994698-b85790171832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      author: "James Anderson",
      date: "Nov 8, 2025",
      category: "Trends",
      readTime: "7 min read"
    },
    "3": {
      id: "3",
      title: "The Perfect Color Palette Guide for Modern Homes",
      content: `
        <p>Color has the power to transform any space, affecting mood, perception, and overall ambiance. Creating the perfect color palette for your modern home requires understanding color theory, your personal preferences, and how different hues work together.</p>
        
        <h2>Understanding Color Temperature</h2>
        <p>Colors are divided into warm (reds, oranges, yellows) and cool (blues, greens, purples) tones. Warm colors create energy and intimacy, while cool colors promote calm and spaciousness. Modern homes often balance both temperatures for dynamic yet harmonious spaces.</p>
        
        <h2>The 60-30-10 Rule</h2>
        <p>This classic design principle suggests using 60% of a dominant color, 30% of a secondary color, and 10% of an accent color. This creates balance and visual interest while maintaining cohesion throughout your space.</p>
        
        <h2>Popular Modern Palettes</h2>
        <p>Monochromatic schemes using varying shades of one color create sophisticated, streamlined spaces. Analogous schemes combine colors next to each other on the color wheel for harmonious flow. Complementary schemes pair opposite colors for dramatic impact.</p>
        
        <h2>Testing Before Committing</h2>
        <p>Always test paint colors in your actual space. Light changes throughout the day, affecting how colors appear. Paint large swatches on different walls and observe them in morning, afternoon, and evening light before making your final decision.</p>
      `,
      excerpt: "Color can transform a space. Learn how to choose and combine colors to create harmonious and stunning interiors.",
      image: "https://images.unsplash.com/photo-1594296220371-a34da13ff6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      author: "Emma Thompson",
      date: "Nov 5, 2025",
      category: "Color Guide",
      readTime: "6 min read"
    },
    "4": {
      id: "4",
      title: "Sustainable Furniture: Beauty Meets Responsibility",
      content: `
        <p>Sustainable furniture represents the intersection of environmental consciousness and exceptional design. Today's eco-friendly options prove that you don't have to sacrifice style for sustainability.</p>
        
        <h2>What Makes Furniture Sustainable?</h2>
        <p>Sustainable furniture is created with minimal environmental impact. This includes using responsibly sourced materials, employing eco-friendly manufacturing processes, ensuring fair labor practices, and designing for longevity and recyclability.</p>
        
        <h2>Materials to Look For</h2>
        <p>Reclaimed wood, bamboo, FSC-certified timber, recycled metals, organic cotton, hemp, and natural latex are excellent sustainable choices. These materials reduce environmental impact while offering unique character and durability.</p>
        
        <h2>The True Cost of Cheap Furniture</h2>
        <p>Fast furniture contributes to landfill waste and environmental degradation. Investing in quality, sustainable pieces may cost more initially but saves money long-term and reduces your environmental footprint.</p>
        
        <h2>Supporting Sustainable Brands</h2>
        <p>Research brands' sustainability practices. Look for transparency in sourcing, manufacturing, and business practices. Many companies now offer detailed information about their environmental initiatives and certifications.</p>
      `,
      excerpt: "Explore eco-friendly furniture options that don't compromise on style. Learn about sustainable materials and practices.",
      image: "https://images.unsplash.com/photo-1631563642459-ae1b71341a5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      author: "David Chen",
      date: "Nov 2, 2025",
      category: "Sustainability",
      readTime: "8 min read"
    },
    "5": {
      id: "5",
      title: "Small Space, Big Impact: Maximizing Compact Living",
      content: `
        <p>Living in a small space doesn't mean compromising on style or functionality. With smart design choices and creative solutions, even the most compact areas can feel spacious, organized, and beautiful.</p>
        
        <h2>Multi-Functional Furniture</h2>
        <p>Choose pieces that serve multiple purposes: a dining table that doubles as a workspace, a storage ottoman that provides seating, or a murphy bed that folds away. These versatile pieces maximize functionality without cluttering your space.</p>
        
        <h2>Vertical Thinking</h2>
        <p>When floor space is limited, look up. Wall-mounted shelves, tall bookcases, and hanging storage utilize vertical space effectively. This keeps floors clear and draws the eye upward, making rooms feel taller and more spacious.</p>
        
        <h2>Light and Color Strategy</h2>
        <p>Light colors reflect natural light and make spaces feel larger. White, cream, and pale gray are excellent choices for walls. Add depth with darker accent colors in accessories and artwork.</p>
        
        <h2>Strategic Mirror Placement</h2>
        <p>Mirrors reflect light and create the illusion of more space. Place large mirrors opposite windows to maximize natural light, or use mirrored furniture for subtle space expansion.</p>
      `,
      excerpt: "Make the most of limited space with clever furniture choices and design tricks that create the illusion of spaciousness.",
      image: "https://images.unsplash.com/photo-1656699170530-21004fb9ec2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      author: "Sophia Martinez",
      date: "Oct 28, 2025",
      category: "Space Planning",
      readTime: "6 min read"
    },
    "6": {
      id: "6",
      title: "Mixing Textures: The Key to Depth and Interest",
      content: `
        <p>Texture is one of the most powerful yet underutilized tools in interior design. By thoughtfully combining different textures, you can create spaces with remarkable depth, warmth, and visual interest.</p>
        
        <h2>Understanding Texture Types</h2>
        <p>Textures can be rough or smooth, shiny or matte, hard or soft. Each type affects how we perceive and interact with a space. Combining contrasting textures creates dynamic, engaging environments.</p>
        
        <h2>Starting with a Base</h2>
        <p>Begin with larger furniture pieces and architectural elements as your texture foundation. A leather sofa, wooden floors, or plaster walls establish your base. Then layer additional textures through accessories and textiles.</p>
        
        <h2>Layering Soft Textures</h2>
        <p>Textiles offer endless opportunities for texture play. Mix velvet cushions with linen throws, wool rugs with silk curtains, or cotton bedding with faux fur accents. These soft layers add comfort and visual richness.</p>
        
        <h2>Balancing Rough and Smooth</h2>
        <p>Pair rough textures like reclaimed wood or concrete with smooth surfaces like glass or polished metal. This contrast creates tension and interest while maintaining harmony in your design.</p>
      `,
      excerpt: "Learn how to layer different textures to add dimension and visual interest to any room in your home.",
      image: "https://images.unsplash.com/photo-1673201102066-b0599d45002b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      author: "Emma Thompson",
      date: "Oct 25, 2025",
      category: "Design Tips",
      readTime: "5 min read"
    }
  };

  const postId = params?.id || "1";
  const post = blogPosts[postId as keyof typeof blogPosts] || blogPosts["1"];

  // Get related posts (other posts excluding current)
  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.id !== postId)
    .slice(0, 3);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/blog">
          <a>
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </a>
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="mb-6" style={{ fontSize: '2.5rem' }}>{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <span>{post.readTime}</span>
            </div>

            <div className="flex gap-2 mb-8">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related Posts */}
          <section className="border-t border-border pt-12">
            <h2 className="mb-8" style={{ fontSize: '2rem' }}>Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <a className="block group">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <ImageWithFallback
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <Badge className="mb-2">{relatedPost.category}</Badge>
                    <h3 className="mb-2 group-hover:text-accent transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground">{relatedPost.readTime}</p>
                  </a>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
