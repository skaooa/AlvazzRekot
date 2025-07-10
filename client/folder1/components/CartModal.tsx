import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CartItem, Product } from "@shared/schema";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      await apiRequest("DELETE", `/api/cart/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Success",
        description: "Item removed from cart",
      });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) => {
      await apiRequest("PATCH", `/api/cart/${cartItemId}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  const getProduct = (productId: number): Product | undefined => {
    return products.find((p: Product) => p.id === productId);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: CartItem) => {
      const product = getProduct(item.productId);
      return total + (product ? parseFloat(product.price) * item.quantity : 0);
    }, 0);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCartMutation.mutate(productId);
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Checkout functionality coming soon!",
    });
  };

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-white/20 rounded-2xl p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <ShoppingCart className="mx-auto mb-4 text-white" size={48} />
                <h3 className="font-orbitron text-2xl font-bold mb-4">Login Required</h3>
                <p className="text-gray-300 mb-6">Please log in to view your cart</p>
                <button
                  onClick={() => window.location.href = "/api/login"}
                  className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Login
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg"
          onClick={onClose}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-orbitron text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  SHOPPING CART
                </h3>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                  <p className="mt-4 text-gray-400">Loading cart...</p>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {cartItems.map((item: CartItem) => {
                      const product = getProduct(item.productId);
                      if (!product) return null;

                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-white/5"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-semibold">{product.name}</h4>
                              {item.size && (
                                <p className="text-gray-400 text-sm">Size: {item.size}</p>
                              )}
                              <div className="flex items-center space-x-2 mt-2">
                                <button
                                  onClick={() => updateQuantityMutation.mutate({
                                    cartItemId: item.id,
                                    quantity: Math.max(1, item.quantity - 1)
                                  })}
                                  disabled={item.quantity <= 1 || updateQuantityMutation.isPending}
                                  className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="text-white font-medium px-3">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantityMutation.mutate({
                                    cartItemId: item.id,
                                    quantity: item.quantity + 1
                                  })}
                                  disabled={updateQuantityMutation.isPending}
                                  className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${(parseFloat(product.price) * item.quantity).toFixed(2)}</p>
                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;