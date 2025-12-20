import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";

export function InteriorServices() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const packages = [
    {
      id: "basic",
      name: "Basic Room Design",
      price: 1499,
      duration: "2-3 weeks",
      features: [
        "Single room consultation",
        "Mood board creation",
        "Color palette selection",
        "Furniture recommendations",
        "Shopping list",
        "Email support"
      ],
      image: "https://images.unsplash.com/photo-1594296220371-a34da13ff6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
    {
      id: "premium",
      name: "Premium Living Space",
      price: 3999,
      duration: "4-6 weeks",
      popular: true,
      features: [
        "Up to 3 rooms",
        "3D visualization",
        "Custom furniture design",
        "Material & finish selection",
        "Shopping assistance",
        "Project management",
        "On-site consultation",
        "Priority support"
      ],
      image: "https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
    {
      id: "luxury",
      name: "Full Home Interiors",
      price: 9999,
      duration: "8-12 weeks",
      features: [
        "Complete home design",
        "Architectural consultation",
        "Custom furniture & fixtures",
        "Lighting design",
        "Art curation",
        "Contractor coordination",
        "Installation supervision",
        "Dedicated designer",
        "24/7 support"
      ],
      image: "https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    }
  ];

  const portfolio = [
    {
      id: "1",
      title: "Modern Luxury Living Room",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
    {
      id: "2",
      title: "Elegant Bedroom Suite",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1594296220371-a34da13ff6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
    {
      id: "3",
      title: "Contemporary Office Space",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1617403493677-a0cbfc484010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
    {
      id: "4",
      title: "Luxury Kitchen Design",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1620086464194-5127366b51ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
    {
      id: "5",
      title: "Minimalist Dining Space",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1593136596203-7212b076f4d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    },
    {
      id: "6",
      title: "Premium Home Office",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1617403493677-a0cbfc484010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We'll contact you within 24 hours.");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt="Interior Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-primary-foreground"
          >
            <h1 className="mb-4" style={{ fontSize: '3rem' }}>
              Professional Interior Design Services
            </h1>
            <p className="mb-6 opacity-90" style={{ fontSize: '1.1rem' }}>
              Transform your space with our expert designers. From concept to completion, we create interiors that inspire.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>Design Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect package for your project needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden h-full ${pkg.popular ? "border-accent border-2" : ""}`}>
                  {pkg.popular && (
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2">{pkg.name}</h3>
                    <div className="mb-2">
                      <span className="text-accent" style={{ fontSize: '2rem' }}>${pkg.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{pkg.duration}</p>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground">
                      Choose Package
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>Our Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our recent projects and get inspired
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                    <Badge className="mb-2 bg-accent text-accent-foreground">{item.category}</Badge>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>Book Free Consultation</h2>
              <p className="text-muted-foreground">
                Tell us about your project and we'll get back to you within 24 hours
              </p>
            </motion.div>

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="service">Service Package</Label>
                    <select
                      id="service"
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-md"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      required
                    >
                      <option value="">Select a package</option>
                      <option value="basic">Basic Room Design</option>
                      <option value="premium">Premium Living Space</option>
                      <option value="luxury">Full Home Interiors</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Project Details</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground">
                    Submit Consultation Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
