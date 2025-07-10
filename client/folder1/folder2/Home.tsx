
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Plus } from "lucide-react";
import ThreeBackground from "@/components/ThreeBackground";
import Timer from "@/components/Timer";
import { Giveaway } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const [, setLocation] = useLocation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const { user } = useAuth();

  const heroTexts = [
    "Enter the world of luxury gaming. Exclusive giveaways, premium merchandise, and unforgettable experiences.",
    "Where elegance meets gaming excellence. Premium setups, exclusive rewards, and elite community.",
    "Redefining the gaming experience. Luxury merchandise, high-end giveaways, and premium events.",
    "The ultimate destination for sophisticated gamers. Exclusive prizes, luxury goods, and elite tournaments."
  ];

  const { data: giveaways = [], isLoading: giveawaysLoading } = useQuery<Giveaway[]>({
    queryKey: ["/api/giveaways"],
  });

  const currentGiveaway = giveaways[0] as Giveaway | undefined;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroTexts.length]);

  // Mock stories data
  const stories = [
    {
      id: 1,
      username: "You",
      profileImage: user?.profileImageUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      isOwn: true,
      hasStory: false
    },
    {
      id: 2,
      username: "alvazz_official",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      hasStory: true,
      isOnline: true
    },
    {
      id: 3,
      username: "gaming_pro",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      hasStory: true,
      isOnline: false,
      isAway: true
    },
    {
      id: 4,
      username: "speedster_91",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      hasStory: true,
      isOnline: true
    },
    {
      id: 5,
      username: "drift_king",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      hasStory: true,
      isOnline: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ThreeBackground />
      
      <div className="relative z-10 pt-20">
        {/* Stories Section */}
        <div className="container mx-auto px-6 py-6">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center min-w-[80px]">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full p-1 ${
                    story.hasStory ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
                  }`}>
                    <img
                      src={story.profileImage}
                      alt={story.username}
                      className="w-full h-full rounded-full object-cover border-2 border-black"
                    />
                  </div>
                  {story.isOwn && !story.hasStory && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                      <Plus size={10} className="text-white" />
                    </div>
                  )}
                  {story.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                  )}
                  {story.isAway && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-500 rounded-full border-2 border-black flex items-center justify-center">
                      <span className="text-xs">🌙</span>
                    </div>
                  )}
                </div>
                <p className="text-xs mt-2 text-center max-w-[80px] truncate">
                  {story.isOwn ? "Your story" : story.username}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-orbitron text-6xl md:text-8xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6"
            >
              ALVAZZ REKOT
            </motion.h1>
            
            <motion.div
              key={currentTextIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl text-gray-300 max-w-4xl mx-auto mb-12 font-playfair leading-relaxed"
            >
              {heroTexts[currentTextIndex]}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => setLocation("/giveaways")}
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Join Giveaways
              </Button>
              <Button
                onClick={() => setLocation("/merchandise")}
                variant="outline"
                className="border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Shop Merchandise
              </Button>
            </motion.div>
          </motion.div>

          {/* Current Giveaway Timer */}
          {currentGiveaway && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="max-w-4xl mx-auto mb-20"
            >
              <Card className="bg-black/30 border-white/20 backdrop-blur-lg">
                <CardContent className="p-8 text-center">
                  <h3 className="font-orbitron text-2xl font-bold mb-4">CURRENT GIVEAWAY</h3>
                  <p className="text-gray-300 mb-6">{currentGiveaway.title}</p>
                  <Timer endDate={new Date(currentGiveaway.endDate).toISOString()} className="mb-6" />
                  <Button
                    onClick={() => setLocation("/giveaways")}
                    className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Enter Giveaway
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Featured Sections */}
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Latest Merch */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg hover:bg-white/8 hover:border-white/20 transform hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <img
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop"
                  alt="Premium gaming merchandise"
                  className="rounded-xl mb-6 w-full h-48 object-cover"
                />
                <h3 className="font-orbitron text-xl font-bold mb-4">PREMIUM MERCH</h3>
                <p className="text-gray-300 mb-6">
                  Exclusive hoodies, t-shirts, and accessories for true gamers.
                </p>
                <Button
                  onClick={() => setLocation("/merchandise")}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Shop Now
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg hover:bg-white/8 hover:border-white/20 transform hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
                  alt="Gaming tournament event"
                  className="rounded-xl mb-6 w-full h-48 object-cover"
                />
                <h3 className="font-orbitron text-xl font-bold mb-4">EVENTS</h3>
                <p className="text-gray-300 mb-6">
                  Join our exclusive gaming tournaments and meetups.
                </p>
                <Button
                  onClick={() => setLocation("/events")}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  View Events
                </Button>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg hover:bg-white/8 hover:border-white/20 transform hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <img
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
                  alt="Gaming community"
                  className="rounded-xl mb-6 w-full h-48 object-cover"
                />
                <h3 className="font-orbitron text-xl font-bold mb-4">FOLLOW US</h3>
                <p className="text-gray-300 mb-6">
                  Join our community and stay updated with latest news.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-white hover:text-gray-300 transition-colors">
                    <i className="fab fa-discord text-2xl"></i>
                  </a>
                  <a href="#" className="text-white hover:text-gray-300 transition-colors">
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                  <a href="#" className="text-white hover:text-gray-300 transition-colors">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a href="#" className="text-white hover:text-gray-300 transition-colors">
                    <i className="fab fa-youtube text-2xl"></i>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
