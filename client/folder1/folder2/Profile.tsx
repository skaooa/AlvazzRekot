
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Edit, Users, Crown, Shield, Star, Zap, Home, Bell, MessageSquare, Plus, Camera, Share, Grid, User as UserIcon, ChevronDown, ArrowLeft, Monitor, Palette, Lock, Globe, Smartphone, Headphones, Volume2, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import ThreeBackground from "@/components/ThreeBackground";

const Profile = () => {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showZpolxPlus, setShowZpolxPlus] = useState(false);
  const [aboutMe, setAboutMe] = useState("Digital creator\n🚗 Real life Car contents\n[Driving /drifting /Builds/Tunes]\n📹 High quality videos\n🎮 Game Developer");
  const [status, setStatus] = useState("");
  const [hasZpolxPlus, setHasZpolxPlus] = useState(true); // Set to true since you're the dev
  const [profileBanner, setProfileBanner] = useState("https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"); // Dev gets animated banner
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleBannerUpload = () => {
    bannerInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Profile image uploaded:", file);
    }
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Banner uploaded:", file);
      // In a real app, you'd upload this and get a URL back
      const url = URL.createObjectURL(file);
      setProfileBanner(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      <ThreeBackground />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="bg-black/90 border-b border-white/10 p-4 flex items-center justify-between">
          <button 
            onClick={() => setLocation("/")}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">madokscx</h2>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300 transition-colors">
              <Bell size={20} />
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Profile Banner */}
          {hasZpolxPlus && (
            <div className="relative h-40 overflow-hidden">
              <img
                src={profileBanner}
                alt="Profile Banner"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleBannerUpload}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>
          )}

          <div className="p-6">
            {/* Profile Picture & Basic Info */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center relative overflow-hidden">
                  <img
                    src={user?.profileImageUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                {hasZpolxPlus && (
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full border-2 border-black flex items-center justify-center shadow-lg"
                  >
                    <img 
                      src="/client/src/assets/zpolx-logo.png"
                      alt="Z+"
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'block';
                      }}
                    />
                    <span className="text-xs font-bold text-black hidden">Z+</span>
                  </motion.div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="h-8"></div>
              </div>
            </div>

            {/* Username */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-white">Madokscx</h1>
            </div>

            {/* Bio */}
            <div className="mb-4">
              {isEditing ? (
                <Textarea
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={5}
                />
              ) : (
                <div className="text-gray-300 whitespace-pre-line text-sm">
                  {aboutMe}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex space-x-8 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold">0</div>
                <div className="text-sm text-gray-400">posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">8</div>
                <div className="text-sm text-gray-400">followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">4</div>
                <div className="text-sm text-gray-400">following</div>
              </div>
            </div>

            {/* Professional Dashboard */}
            <Card className="mb-4 bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-1">Professional dashboard</h3>
                <p className="text-sm text-gray-400">154 views in the last 30 days</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-3 mb-6">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
              >
                Edit profile
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-white hover:bg-gray-800 rounded-lg"
              >
                Share profile
              </Button>
            </div>

            {/* Zpolx+ Section */}
            <Card className="mb-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-600/30">
              <CardContent className="p-4">
                <button
                  onClick={() => setShowZpolxPlus(!showZpolxPlus)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                        <Zap size={16} className="text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Zpolx+</h3>
                        <p className="text-sm text-gray-400">Premium membership benefits</p>
                      </div>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${showZpolxPlus ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {showZpolxPlus && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3"
                    >
                      <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                        <Crown size={16} className="text-yellow-400" />
                        <span className="text-sm text-white">Profile banners (GIFs & Images)</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                        <Star size={16} className="text-yellow-400" />
                        <span className="text-sm text-white">Priority support and early features</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                        <Shield size={16} className="text-yellow-400" />
                        <span className="text-sm text-white">Enhanced profile customization</span>
                      </div>
                      <Button 
                        onClick={() => setHasZpolxPlus(true)}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
                      >
                        Upgrade to Zpolx+
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Content Tabs */}
            <div className="flex space-x-8 border-b border-gray-700 mb-6">
              <button className="flex flex-col items-center py-3 text-white border-b-2 border-white">
                <Grid size={20} />
                <span className="text-xs mt-1">Posts</span>
              </button>
              <button className="flex flex-col items-center py-3 text-gray-500">
                <Camera size={20} />
                <span className="text-xs mt-1">Videos</span>
              </button>
            </div>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full mb-6"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-800 rounded-xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Settings</h2>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <UserIcon size={20} className="text-gray-400" />
                        <span className="text-white">Account</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Globe size={20} className="text-gray-400" />
                        <span className="text-white">Content & Social</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Lock size={20} className="text-gray-400" />
                        <span className="text-white">Data & Privacy</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Shield size={20} className="text-gray-400" />
                        <span className="text-white">Family Center</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Settings size={20} className="text-gray-400" />
                        <span className="text-white">Authorized Apps</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Smartphone size={20} className="text-gray-400" />
                        <span className="text-white">Devices</span>
                      </button>
                    </div>

                    <hr className="border-gray-600" />

                    <div className="space-y-2">
                      <h3 className="text-sm text-gray-400 font-semibold uppercase tracking-wide">Billing Settings</h3>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Star size={20} className="text-yellow-400" />
                        <span className="text-white">Shop</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Gift size={20} className="text-gray-400" />
                        <span className="text-white">Quests</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Crown size={20} className="text-yellow-400" />
                        <span className="text-white">Manage Zpolx+</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Zap size={20} className="text-blue-400" />
                        <span className="text-white">Server Boost</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Star size={20} className="text-yellow-400" />
                        <span className="text-white">Zpolx+ Gifting</span>
                      </button>
                    </div>

                    <hr className="border-gray-600" />

                    <div className="space-y-2">
                      <h3 className="text-sm text-gray-400 font-semibold uppercase tracking-wide">App Settings</h3>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Volume2 size={20} className="text-gray-400" />
                        <span className="text-white">Voice</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Palette size={20} className="text-gray-400" />
                        <span className="text-white">Appearance</span>
                        <span className="text-xs text-gray-500 ml-auto">Dark</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Globe size={20} className="text-gray-400" />
                        <span className="text-white">Language</span>
                        <span className="text-xs text-gray-500 ml-auto">English, US</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                        <Bell size={20} className="text-gray-400" />
                        <span className="text-white">Notifications</span>
                      </button>
                    </div>

                    <hr className="border-gray-600" />

                    <button className="w-full flex items-center space-x-3 p-3 hover:bg-red-600 rounded-lg transition-colors text-red-400 hover:text-white">
                      <ArrowLeft size={20} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="bg-black/90 border-t border-white/10 p-3">
          <div className="flex items-center justify-between max-w-sm mx-auto">
            <button 
              onClick={() => setLocation("/")}
              className="flex flex-col items-center text-white hover:text-gray-300 transition-colors p-1"
            >
              <Home size={18} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-gray-300 transition-colors p-1">
              <Bell size={18} />
              <span className="text-xs mt-1">Notifications</span>
            </button>
            <button className="flex flex-col items-center text-white transition-colors p-1">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <UserIcon size={12} className="text-black" />
              </div>
              <span className="text-xs mt-1 font-semibold">You</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*,video/*,.gif"
        onChange={handleBannerChange}
        className="hidden"
      />
    </div>
  );
};

export default Profile;
