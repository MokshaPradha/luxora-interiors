import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

export function Navbar({ cartCount = 0, wishlistCount = 0 }: { cartCount?: number; wishlistCount?: number }) {
  const [location, setLocation] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/interior-services", label: "Interior Design" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center group-hover:bg-accent transition-colors">
                <span className="text-primary-foreground group-hover:text-accent-foreground">L</span>
              </div>
              <div>
                <div className="tracking-wider">LUXORA</div>
                <div className="opacity-60" style={{ fontSize: '10px', letterSpacing: '2px' }}>INTERIORS</div>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`hover:text-accent transition-colors ${
                    location === link.href ? "text-accent" : ""
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden md:flex"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <a>
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center" style={{ fontSize: '10px' }}>
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </a>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <a>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center" style={{ fontSize: '10px' }}>
                      {cartCount}
                    </span>
                  )}
                </Button>
              </a>
            </Link>

            {/* User */}
            <Link href="/profile">
              <a className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </a>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-6 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block hover:text-accent transition-colors ${
                          location === link.href ? "text-accent" : ""
                        }`}
                      >
                        {link.label}
                      </a>
                    </Link>
                  ))}
                  <Link href="/profile">
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-accent transition-colors"
                    >
                      Profile
                    </a>
                  </Link>
                  <Link href="/login">
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-accent transition-colors"
                    >
                      Login
                    </a>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  setLocation(`/shop?search=${encodeURIComponent(searchQuery)}`);
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }
              }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for furniture, categories..."
                className="pl-10 pr-4"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
