
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@shared/schema";
import ThreeBackground from "@/components/ThreeBackground";

const Merchandise = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, size }: { productId: number; size?: string }) => {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1, size }),
      });
      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to Cart",
        description: "Item successfully added to your cart!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = (product: Product) => {
    const needsSize = product.category === 'clothing';
    const selectedSize = selectedSizes[product.id];
    
    if (needsSize && !selectedSize) {
      toast({
        title: "Select Size",
        description: "Please select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    addToCartMutation.mutate({ 
      productId: product.id, 
      size: needsSize ? selectedSize : undefined 
    });
  };

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        <ThreeBackground />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading merchandise...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ThreeBackground />
      
      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-orbitron text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              PREMIUM MERCHANDISE
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-playfair italic">
              Exclusive luxury gaming apparel and accessories for the elite
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.8 }}
              >
                <Card className="bg-gradient-to-br from-white/15 to-white/5 border-2 border-white/30 backdrop-blur-lg hover:border-white/50 transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white font-bold">
                        SOLD OUT
                      </Badge>
                    </div>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Heart 
                        size={20} 
                        className={`${favorites.has(product.id) ? 'text-red-500 fill-current' : 'text-white'}`} 
                      />
                    </button>
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-300 text-sm font-playfair mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        <Badge variant="outline" className="border-white/30 text-white">
                          {product.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Size Selection for Clothing */}
                    {product.category === 'clothing' && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-white mb-2">Size:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                                selectedSizes[product.id] === size
                                  ? 'bg-white text-black border-white'
                                  : 'bg-transparent text-white border-white/30 hover:border-white/60 hover:bg-white/10'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={addToCartMutation.isPending}
                      className="w-full bg-white text-black hover:bg-gray-200 transition-colors font-semibold py-3 disabled:opacity-50"
                    >
                      <ShoppingCart size={20} className="mr-2" />
                      {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                    </Button>

                    <div className="mt-3 text-center">
                      <p className="text-xs text-gray-400">Free shipping on orders over $100</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Merchandise;
