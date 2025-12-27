import { Link } from 'wouter';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'motion/react';

export function OrderSuccess() {
  const orderId = 'LX' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="mb-4" style={{ fontSize: '2.5rem' }}>
              🎉 Your Shopping Was Successfully Completed!
            </h1>
            <p className="text-muted-foreground" style={{ fontSize: '1.1rem' }}>
              Thank you for choosing us. Your order has been placed successfully.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground mb-2">Order ID</p>
                    <p className="text-accent" style={{ fontSize: '1.25rem' }}>
                      {orderId}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">Estimated Delivery</p>
                    <p style={{ fontSize: '1.25rem' }}>
                      {estimatedDelivery.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-secondary rounded-lg">
                  <div className="flex items-start gap-4">
                    <Package className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="mb-2">What's Next?</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• You'll receive an order confirmation email shortly</li>
                        <li>• We'll notify you when your items are shipped</li>
                        <li>• Track your order anytime from your profile</li>
                        <li>• Our white-glove delivery team will contact you before delivery</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profile">
                <a>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground"
                  >
                    View Orders
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </Link>
              <Link href="/shop">
                <a>
                  <Button size="lg" variant="outline">
                    Continue Shopping
                  </Button>
                </a>
              </Link>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Need help with your order? Contact us at{' '}
              <a href="mailto:support@luxora.com" className="text-accent hover:underline">
                support@luxora.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
