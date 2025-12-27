import { Award, Users, Heart, Target } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function About() {
  const team = [
    {
      name: 'Sophia Martinez',
      role: 'Founder & Lead Designer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    },
    {
      name: 'James Anderson',
      role: 'Senior Interior Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    },
    {
      name: 'Emma Thompson',
      role: 'Design Consultant',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    },
    {
      name: 'David Chen',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description:
        'We pursue perfection in every detail, ensuring premium quality in all our products and services.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description:
        'Your satisfaction is our priority. We listen, understand, and deliver beyond expectations.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description:
        'We love what we do, and it shows in the care we put into every project and piece.',
    },
    {
      icon: Target,
      title: 'Innovation',
      description:
        'We constantly evolve, bringing you the latest in design trends and sustainable practices.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1722268994698-b85790171832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt="About Luxora"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-primary-foreground max-w-3xl"
          >
            <h1 className="mb-4" style={{ fontSize: '3rem' }}>
              About Luxora Interiors
            </h1>
            <p className="opacity-90" style={{ fontSize: '1.1rem' }}>
              Crafting exceptional living spaces since 2010
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ fontSize: '2.5rem' }}>
                Our Story
              </h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2010, Luxora Interiors began with a simple vision: to make luxury
                furniture and exceptional interior design accessible to discerning homeowners and
                businesses.
              </p>
              <p className="text-muted-foreground mb-4">
                What started as a small boutique showroom has grown into a premier destination for
                premium furniture and comprehensive interior design services. Our commitment to
                quality, craftsmanship, and customer satisfaction has remained unwavering.
              </p>
              <p className="text-muted-foreground">
                Today, we work with clients across the country, transforming houses into homes and
                spaces into experiences. Every piece we offer and every project we undertake is a
                testament to our dedication to excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                  alt="Our Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>
              Why Choose Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our values guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Talented designers and experts passionate about creating beautiful spaces
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-accent">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '5000+', label: 'Happy Clients' },
              { number: '10000+', label: 'Projects Completed' },
              { number: '50+', label: 'Design Awards' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-accent mb-2" style={{ fontSize: '3rem' }}>
                  {stat.number}
                </div>
                <p className="opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
