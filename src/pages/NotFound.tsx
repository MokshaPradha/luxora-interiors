import { Link } from "wouter";
import { Home, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block"
            >
              <svg
                className="w-64 h-64 mx-auto text-accent/20"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M70 80 L70 120 M130 80 L130 120 M60 100 L140 100"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="mb-4" style={{ fontSize: '4rem', color: 'var(--accent)' }}>404</h1>
            <h2 className="mb-4" style={{ fontSize: '2rem' }}>Page Not Found</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <a>
                  <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground">
                    <Home className="mr-2 w-5 h-5" />
                    Back to Home
                  </Button>
                </a>
              </Link>
              <Link href="/shop">
                <a>
                  <Button size="lg" variant="outline">
                    <Search className="mr-2 w-5 h-5" />
                    Browse Products
                  </Button>
                </a>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <p className="text-muted-foreground">
              Need help?{" "}
              <Link href="/contact">
                <a className="text-accent hover:underline">Contact us</a>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
