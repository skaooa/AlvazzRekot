
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingCart, User, LogOut, MessageSquare, Home, Plus, Mail, Instagram, Youtube, Facebook, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { CartItem } from "@shared/schema";
import SearchOverlay from "./SearchOverlay";
import CartModal from "./CartModal";

const Navigation = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  const { data: cartItems = [] } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  const cartItemCount = cartItems.length;

  const [isFollowUsOpen, setIsFollowUsOpen] = useState(false);
  const [isMerchandiseOpen, setIsMerchandiseOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/giveaways", label: "Giveaways" },
  ];

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const handleNavClick = (href: string) => {
    setLocation(href);
    setIsSideNavOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setLocation("/profile");
    } else {
      window.location.href = "/api/login";
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsSideNavOpen(true)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* Logo - Made Smaller */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <h1 className="font-orbitron text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent cursor-pointer">
                  ALVAZZ REKOT
                </h1>
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLocation("/messages")}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <MessageSquare size={20} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-white hover:text-gray-300 transition-colors relative"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation - Made Smaller */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-white/10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between max-w-sm mx-auto">
            {/* Home Button */}
            <button
              onClick={() => setLocation("/")}
              className="flex flex-col items-center text-white hover:text-gray-300 transition-colors p-1"
            >
              <Home size={18} />
              <span className="text-xs mt-1">Home</span>
            </button>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex flex-col items-center text-white hover:text-gray-300 transition-colors p-1"
            >
              <Search size={18} />
              <span className="text-xs mt-1">Search</span>
            </button>

            {/* Post-Reels Button (Center) */}
            <button
              onClick={() => setLocation("/post-reels")}
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/40"
            >
              <Plus size={20} />
            </button>

            {/* Video Feed Button */}
            <button
              onClick={() => setLocation("/video-feed")}
              className="flex flex-col items-center text-white hover:text-gray-300 transition-colors p-1"
            >
              <div className="w-4 h-4 rounded border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              </div>
              <span className="text-xs mt-1">Reels</span>
            </button>

            {/* Profile Button */}
            <button
              onClick={handleProfileClick}
              className="flex flex-col items-center text-white hover:text-gray-300 transition-colors p-1"
            >
              <User size={18} />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Side Navigation - Slideable */}
      <AnimatePresence>
        {isSideNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsSideNavOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-lg border-r border-white/20 z-50 overflow-y-auto"
            >
              <div className="p-6 border-b border-white/20">
                <h3 className="font-orbitron text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  ALVAZZ REKOT
                </h3>
                <p className="text-gray-400 text-sm mt-2 font-playfair italic">Luxury Gaming Experience</p>
              </div>
              <nav className="p-6">
                <ul className="space-y-3">
                  {navItems.map((item) => (
                    <motion.li 
                      key={item.href}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`flex items-center justify-between w-full text-left py-4 px-6 rounded-xl transition-all duration-300 border ${
                          location === item.href
                            ? "bg-white text-black border-white shadow-lg transform scale-105"
                            : "hover:bg-white/10 text-white border-white/20 hover:border-white/40 hover:transform hover:scale-102"
                        } font-playfair font-medium`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight size={16} />
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {/* Merchandise Section */}
                <div className="mt-6">
                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => setIsMerchandiseOpen(!isMerchandiseOpen)}
                    className="flex items-center justify-between w-full text-left py-4 px-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-playfair font-medium"
                  >
                    <span>Merchandise</span>
                    <motion.div
                      animate={{ rotate: isMerchandiseOpen ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {isMerchandiseOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-2"
                      >
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => handleNavClick("/merchandise")}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white font-playfair"
                        >
                          <span>Hoodies</span>
                          <ChevronRight size={14} />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => handleNavClick("/merchandise")}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white font-playfair"
                        >
                          <span>T-shirts</span>
                          <ChevronRight size={14} />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => handleNavClick("/merchandise")}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white font-playfair"
                        >
                          <span>Accessories</span>
                          <ChevronRight size={14} />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Events Section */}
                <div className="mt-6">
                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => setIsEventsOpen(!isEventsOpen)}
                    className="flex items-center justify-between w-full text-left py-4 px-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-playfair font-medium"
                  >
                    <span>Events</span>
                    <motion.div
                      animate={{ rotate: isEventsOpen ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {isEventsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-2"
                      >
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => handleNavClick("/events")}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white font-playfair"
                        >
                          <span>Drifting</span>
                          <ChevronRight size={14} />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => handleNavClick("/events")}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white font-playfair"
                        >
                          <span>Drag Racing</span>
                          <ChevronRight size={14} />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => handleNavClick("/events")}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white font-playfair"
                        >
                          <span>Circuit</span>
                          <ChevronRight size={14} />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => handleNavClick("/events")}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white font-playfair"
                        >
                          <span>Time Attack</span>
                          <ChevronRight size={14} />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Follow Us Section */}
                <div className="mt-6">
                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => setIsFollowUsOpen(!isFollowUsOpen)}
                    className="flex items-center justify-between w-full text-left py-4 px-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-playfair font-medium"
                  >
                    <span>Follow Us</span>
                    <motion.div
                      animate={{ rotate: isFollowUsOpen ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {isFollowUsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-2"
                      >
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => window.open('https://discord.gg/alvazzrekot', '_blank')}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-blue-400/50 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 hover:border-blue-400 font-playfair"
                        >
                          <div className="flex items-center">
                            <MessageSquare size={16} className="mr-3" />
                            <span>Discord</span>
                          </div>
                          <ChevronRight size={14} />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => window.open('https://instagram.com/alvazzrekot', '_blank')}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-pink-400/50 hover:bg-pink-500/20 text-pink-300 hover:text-pink-200 hover:border-pink-400 font-playfair"
                        >
                          <div className="flex items-center">
                            <Instagram size={16} className="mr-3" />
                            <span>Instagram</span>
                          </div>
                          <ChevronRight size={14} />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => window.open('https://tiktok.com/@alvazzrekot', '_blank')}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-purple-400/50 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 hover:border-purple-400 font-playfair"
                        >
                          <div className="flex items-center">
                            <div className="w-4 h-4 mr-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded" />
                            <span>TikTok</span>
                          </div>
                          <ChevronRight size={14} />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => window.open('https://youtube.com/@alvazzrekot', '_blank')}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-red-400/50 hover:bg-red-500/20 text-red-300 hover:text-red-200 hover:border-red-400 font-playfair"
                        >
                          <div className="flex items-center">
                            <Youtube size={16} className="mr-3" />
                            <span>YouTube</span>
                          </div>
                          <ChevronRight size={14} />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 15 }}
                          onClick={() => window.open('https://facebook.com/alvazzrekot', '_blank')}
                          className="flex items-center justify-between w-full text-left py-3 px-8 rounded-xl transition-all duration-300 border border-blue-600/50 hover:bg-blue-600/20 text-blue-300 hover:text-blue-200 hover:border-blue-600 font-playfair"
                        >
                          <div className="flex items-center">
                            <Facebook size={16} className="mr-3" />
                            <span>Facebook</span>
                          </div>
                          <ChevronRight size={14} />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {isAuthenticated && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <motion.button
                      whileHover={{ x: 10 }}
                      onClick={handleLogout}
                      className="flex items-center justify-between w-full text-left py-3 px-4 rounded-xl transition-all duration-300 border border-red-400/50 hover:bg-red-500/20 text-red-300 hover:text-red-200 hover:border-red-400 font-playfair"
                    >
                      <div className="flex items-center">
                        <LogOut size={18} className="mr-3" />
                        <span>Logout</span>
                      </div>
                      <ChevronRight size={16} />
                    </motion.button>
                  </div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay
        isVisible={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navigation;
