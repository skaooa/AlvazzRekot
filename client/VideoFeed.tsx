
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Volume2, VolumeX, User, Download, Flag, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThreeBackground from "@/components/ThreeBackground";

const VideoFeed = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());
  const [bookmarkedVideos, setBookmarkedVideos] = useState<Set<number>>(new Set());
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Mock video data
  const videos = [
    {
      id: 1,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=700&fit=crop",
      user: {
        username: "dailydosetouge",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
        isVerified: true,
        isOnline: true
      },
      caption: "to live in a country that doesn't give a shit about traffic laws 🏁",
      hashtags: ["#jdm", "#supra"],
      likes: 13900,
      comments: 108,
      shares: 2128,
      music: "Original Audio"
    },
    {
      id: 2,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      poster: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=700&fit=crop",
      user: {
        username: "drift_king",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        isVerified: false,
        isOnline: false,
        isAway: true
      },
      caption: "Perfect drift in the mountains 🏔️",
      hashtags: ["#drift", "#mountains", "#cars"],
      likes: 8500,
      comments: 234,
      shares: 456,
      music: "Phonk Music"
    },
    {
      id: 3,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&h=700&fit=crop",
      user: {
        username: "speed_demon",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        isVerified: true,
        isOnline: true
      },
      caption: "Insane acceleration on the highway 💨",
      hashtags: ["#speed", "#racing", "#adrenaline"],
      likes: 25600,
      comments: 789,
      shares: 1234,
      music: "High Energy Beat"
    }
  ];

  useEffect(() => {
    const currentVideoRef = videoRefs.current[currentVideo];
    if (currentVideoRef) {
      currentVideoRef.play();
    }
  }, [currentVideo]);

  const handleVideoChange = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentVideo > 0) {
      setCurrentVideo(currentVideo - 1);
    } else if (direction === 'down' && currentVideo < videos.length - 1) {
      setCurrentVideo(currentVideo + 1);
    }
  };

  const handleLike = (videoId: number) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const handleBookmark = (videoId: number) => {
    setBookmarkedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div className="relative h-full">
        {/* Video Container */}
        <div className="h-full snap-y snap-mandatory overflow-y-scroll">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="relative h-full snap-start flex items-center justify-center"
            >
              {/* Background Video */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.src}
                poster={video.poster}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onEnded={() => {
                  if (index < videos.length - 1) {
                    setCurrentVideo(index + 1);
                  }
                }}
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40" />

              {/* Top Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="text-white font-semibold">For You</div>
                <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                  </svg>
                </div>
              </div>

              {/* Right Side Actions - Made Smaller */}
              <div className="absolute right-3 bottom-20 z-10 flex flex-col items-center space-y-4">
                {/* User Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img
                      src={video.user.avatar}
                      alt={video.user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {video.user.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                  )}
                  {video.user.isAway && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-yellow-500 rounded-full border-2 border-black flex items-center justify-center">
                      <span className="text-xs">🌙</span>
                    </div>
                  )}
                  <Button className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 p-0 border-2 border-white">
                    <span className="text-white text-xs font-bold">+</span>
                  </Button>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(video.id)}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className={`p-2 rounded-full transition-colors ${
                    likedVideos.has(video.id) ? 'bg-red-500' : 'bg-black/50'
                  }`}>
                    <Heart
                      size={20}
                      className={`${
                        likedVideos.has(video.id) ? 'text-white fill-current' : 'text-white'
                      }`}
                    />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {formatNumber(video.likes + (likedVideos.has(video.id) ? 1 : 0))}
                  </span>
                </button>

                {/* Comment Button */}
                <button className="flex flex-col items-center space-y-1">
                  <div className="p-2 bg-black/50 rounded-full">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {formatNumber(video.comments)}
                  </span>
                </button>

                {/* Share Button */}
                <button className="flex flex-col items-center space-y-1">
                  <div className="p-2 bg-black/50 rounded-full">
                    <Share size={20} className="text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {formatNumber(video.shares)}
                  </span>
                </button>

                {/* More Button */}
                <button 
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="p-2 bg-black/50 rounded-full"
                >
                  <MoreHorizontal size={20} className="text-white" />
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-black/50 rounded-full"
                >
                  {isMuted ? (
                    <VolumeX size={20} className="text-white" />
                  ) : (
                    <Volume2 size={20} className="text-white" />
                  )}
                </button>
              </div>

              {/* More Options Menu */}
              <AnimatePresence>
                {showMoreOptions && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute right-16 bottom-40 z-20 bg-black/90 backdrop-blur-lg rounded-lg border border-white/20 overflow-hidden"
                  >
                    <button
                      onClick={() => handleBookmark(video.id)}
                      className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors w-full text-left"
                    >
                      <Bookmark 
                        size={18} 
                        className={bookmarkedVideos.has(video.id) ? 'fill-current text-yellow-500' : ''} 
                      />
                      <span className="text-sm">Save</span>
                    </button>
                    <button className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors w-full text-left">
                      <Share size={18} />
                      <span className="text-sm">Share</span>
                    </button>
                    <button className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors w-full text-left">
                      <Download size={18} />
                      <span className="text-sm">Download</span>
                    </button>
                    <button className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors w-full text-left">
                      <UserMinus size={18} />
                      <span className="text-sm">Not interested</span>
                    </button>
                    <button className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/20 transition-colors w-full text-left">
                      <Flag size={18} />
                      <span className="text-sm">Report</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-20 z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-white font-semibold text-sm">@{video.user.username}</span>
                  {video.user.isVerified && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  <Button className="text-white border border-white/50 bg-transparent hover:bg-white/10 px-3 py-1 h-6 text-xs">
                    Follow
                  </Button>
                </div>
                
                <p className="text-white text-xs mb-1 line-clamp-2">
                  {video.caption}
                </p>
                
                <div className="flex items-center space-x-1 mb-2">
                  {video.hashtags.map((hashtag, idx) => (
                    <span key={idx} className="text-blue-300 text-xs">
                      {hashtag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded bg-white flex items-center justify-center">
                    <span className="text-black text-xs">♪</span>
                  </div>
                  <span className="text-white text-xs truncate max-w-32">{video.music}</span>
                </div>
              </div>

              {/* Navigation Areas */}
              <div
                className="absolute top-1/2 left-0 w-full h-1/4 transform -translate-y-1/2 z-5"
                onTouchStart={(e) => {
                  const startY = e.touches[0].clientY;
                  const handleTouchEnd = (endEvent: TouchEvent) => {
                    const endY = endEvent.changedTouches[0].clientY;
                    const diff = startY - endY;
                    if (Math.abs(diff) > 50) {
                      if (diff > 0) {
                        handleVideoChange('down');
                      } else {
                        handleVideoChange('up');
                      }
                    }
                    document.removeEventListener('touchend', handleTouchEnd);
                  };
                  document.addEventListener('touchend', handleTouchEnd);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
