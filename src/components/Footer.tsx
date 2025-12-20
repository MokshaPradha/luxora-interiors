import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export function Footer() {
  const { subscribeNewsletter } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setIsSubmitting(true);
    await subscribeNewsletter(newsletterEmail);
    setNewsletterEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center">
                <span className="text-accent-foreground">L</span>
              </div>
              <div>
                <div className="tracking-wider">LUXORA</div>
                <div className="opacity-60" style={{ fontSize: '10px', letterSpacing: '2px' }}>INTERIORS</div>
              </div>
            </div>
            <p className="opacity-80 mb-4">
              Crafting luxurious living spaces with premium furniture and bespoke interior design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop">
                  <a className="opacity-80 hover:text-accent transition-colors">Shop All</a>
                </Link>
              </li>
              <li>
                <Link href="/interior-services">
                  <a className="opacity-80 hover:text-accent transition-colors">Interior Design</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="opacity-80 hover:text-accent transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="opacity-80 hover:text-accent transition-colors">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="opacity-80 hover:text-accent transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="opacity-80 hover:text-accent transition-colors">My Account</a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:text-accent transition-colors">Order Tracking</a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:text-accent transition-colors">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:text-accent transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:text-accent transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="mb-4">Stay Connected</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 opacity-80">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 opacity-80">
                <Mail className="w-4 h-4" />
                <span>hello@luxora.com</span>
              </div>
              <div className="flex items-center space-x-2 opacity-80">
                <MapPin className="w-4 h-4" />
                <span>123 Design St, NY 10001</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="opacity-80 mb-2">Subscribe to our newsletter</p>
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-primary-foreground text-foreground"
                  required
                />
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center opacity-60">
          <p>&copy; 2025 Luxora Interiors. All rights reserved. Crafted with excellence.</p>
        </div>
      </div>
    </footer>
  );
}