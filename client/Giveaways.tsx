import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import ThreeBackground from "@/components/ThreeBackground";
import { Giveaway } from "@shared/schema";

const Giveaways = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: giveaways = [], isLoading } = useQuery<Giveaway[]>({
    queryKey: ["/api/giveaways"],
  });

  const enterGiveawayMutation = useMutation({
    mutationFn: async (giveawayId: number) => {
      await apiRequest("POST", `/api/giveaways/${giveawayId}/enter`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/giveaways"] });
      toast({
        title: "Success!",
        description: "You've successfully entered the giveaway!",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to enter giveaway",
        variant: "destructive",
      });
    },
  });

  const handleEnterGiveaway = (giveawayId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to enter giveaways",
        variant: "destructive",
      });
      window.location.href = "/api/login";
      return;
    }
    enterGiveawayMutation.mutate(giveawayId);
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const difference = end - now;
    
    if (difference <= 0) return "Ended";
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return `${days} days remaining`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        <ThreeBackground />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading giveaways...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ThreeBackground />
      
      <div className="relative z-10 pt-32">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-orbitron text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-6">
              LUXURY GIVEAWAYS
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-playfair italic">
              Participate in our exclusive premium giveaways and win extraordinary prizes
            </p>
          </motion.div>

          {giveaways.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl">No active giveaways at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for new opportunities!</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {giveaways.map((giveaway: Giveaway, index: number) => (
                <motion.div
                  key={giveaway.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                >
                  <Card className="bg-gradient-to-br from-white/15 to-white/5 border-2 border-white/20 backdrop-blur-lg hover:bg-white/20 hover:border-white/40 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 shadow-2xl relative">
                    <CardContent className="p-8">
                      <div className="relative">
                        <img
                          src={giveaway.imageUrl}
                          alt={giveaway.title}
                          className="rounded-2xl mb-6 w-full h-56 object-cover border-2 border-white/20 shadow-lg"
                        />
                        <div className="absolute inset-0 bg-red-500/80 rounded-2xl flex items-center justify-center mb-6">
                          <span className="text-white font-bold text-2xl font-orbitron transform -rotate-12">SOLD OUT</span>
                        </div>
                      </div>
                      <h3 className="font-orbitron text-2xl font-bold mb-3 text-white">{giveaway.title}</h3>
                      <p className="text-gray-200 mb-6 font-playfair leading-relaxed">{giveaway.description}</p>
                      <div className="flex justify-between items-center mb-6 bg-white/10 rounded-lg p-3">
                        <span className="text-sm text-white font-semibold">{getTimeRemaining(new Date(giveaway.endDate).toISOString())}</span>
                        <span className="text-sm text-white font-semibold">{giveaway.entryCount || 0} entries</span>
                      </div>
                      <Button
                        disabled
                        className="w-full bg-gray-500 text-gray-300 font-bold py-4 rounded-xl cursor-not-allowed text-lg font-playfair shadow-lg"
                      >
                        Sold Out
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Giveaways;
