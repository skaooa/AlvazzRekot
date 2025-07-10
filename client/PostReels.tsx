
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Camera, Image, Video, ArrowLeft, Send, Mic, MicOff, VideoIcon, VideoOff, Smile, Hash, AtSign, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import ThreeBackground from "@/components/ThreeBackground";

const PostReels = () => {
  const [, setLocation] = useLocation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [currentStep, setCurrentStep] = useState<'select' | 'preview' | 'share' | 'live'>('select');
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [liveViewers, setLiveViewers] = useState(0);

  // Mock recent media
  const recentMedia = [
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=300&h=300&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=100&h=100&fit=crop' },
    { id: 2, type: 'video', url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop' },
    { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=300&h=300&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=100&h=100&fit=crop' },
    { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=300&h=300&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=100&h=100&fit=crop' },
    { id: 5, type: 'video', url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop' },
    { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=300&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=100&h=100&fit=crop' },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      // Validate file types
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov', 'video/avi'];
      const validFiles = files.filter(file => 
        validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024 // 50MB limit
      );
      
      if (validFiles.length !== files.length) {
        alert('Some files were invalid. Only images (JPEG, PNG, GIF) and videos (MP4, MOV, AVI) under 50MB are allowed.');
      }
      
      setSelectedFiles(validFiles);
      const urls = validFiles.map(file => URL.createObjectURL(file));
      setSelectedMedia(urls);
      setCurrentStep('preview');
    }
  };

  const handleMediaSelect = (media: typeof recentMedia[0]) => {
    setSelectedMedia([media.url]);
    setCurrentStep('preview');
  };

  const handleNext = () => {
    if (currentStep === 'preview') {
      setCurrentStep('share');
    }
  };

  const handlePost = async () => {
    // Simulate post upload
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });
    formData.append('caption', caption);
    
    // Here you would send to your backend API
    console.log("Posting with caption:", caption, "Files:", selectedFiles);
    alert("Post created successfully!");
    setLocation('/');
  };

  const handleLiveStream = () => {
    setCurrentStep('live');
    setIsLiveStreaming(true);
    setLiveViewers(Math.floor(Math.random() * 100) + 1);
  };

  const handleStopLive = () => {
    setIsLiveStreaming(false);
    setLocation('/');
  };

  const handleBack = () => {
    if (currentStep === 'live') {
      setLocation('/');
    } else if (currentStep === 'share') {
      setCurrentStep('preview');
    } else if (currentStep === 'preview') {
      setCurrentStep('select');
      setSelectedMedia([]);
      setSelectedFiles([]);
    } else {
      setLocation('/');
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      <ThreeBackground />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <button onClick={handleBack} className="text-white">
            {currentStep === 'select' ? <X size={24} /> : <ArrowLeft size={24} />}
          </button>
          
          <h1 className="font-semibold text-lg">
            {currentStep === 'select' && 'New post'}
            {currentStep === 'preview' && 'Preview'}
            {currentStep === 'share' && 'Share'}
            {currentStep === 'live' && 'Live Stream'}
          </h1>
          
          {currentStep === 'preview' && (
            <button onClick={handleNext} className="text-blue-500 font-semibold">
              Next
            </button>
          )}
          {currentStep === 'share' && (
            <button onClick={handlePost} className="text-blue-500 font-semibold">
              Share
            </button>
          )}
          {currentStep === 'live' && (
            <button onClick={handleStopLive} className="text-red-500 font-semibold">
              End Live
            </button>
          )}
          {currentStep === 'select' && <div className="w-6" />}
        </div>

        {currentStep === 'select' && (
          <div className="flex-1 flex flex-col">
            {/* Main Preview Area */}
            <div className="flex-1 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center relative">
              <div className="w-64 h-64 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center">
                <div className="w-16 h-16 bg-white/30 rounded-2xl"></div>
              </div>
              
              {/* Corner frames */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/60 rounded-tl"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/60 rounded-bl"></div>
            </div>

            {/* Bottom Section */}
            <div className="bg-black/90 p-4">
              {/* Recent Selection */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold">Recents</span>
                  <button className="text-blue-500 text-sm">SELECT MULTIPLE</button>
                </div>
                
                <div className="grid grid-cols-4 gap-1">
                  {recentMedia.map((media) => (
                    <button
                      key={media.id}
                      onClick={() => handleMediaSelect(media)}
                      className="aspect-square relative overflow-hidden rounded-lg"
                    >
                      <img
                        src={media.thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {media.type === 'video' && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center">
                          <Video size={12} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center bg-black/60 backdrop-blur-lg rounded-full p-4">
                <div className="flex items-center space-x-8">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Image size={24} className="text-white" />
                    </div>
                  </label>
                  
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>

                <div className="flex space-x-6 text-white font-semibold">
                  <button>POST</button>
                  <button className="text-gray-400">STORY</button>
                  <button className="text-gray-400">REEL</button>
                  <button onClick={handleLiveStream} className="text-red-400">LIVE</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'preview' && selectedMedia.length > 0 && (
          <div className="flex-1 flex items-center justify-center bg-black relative">
            <div className="w-full h-full flex items-center justify-center">
              {selectedMedia.length === 1 ? (
                <img
                  src={selectedMedia[0]}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="grid grid-cols-2 gap-2 p-4 max-h-full overflow-auto">
                  {selectedMedia.map((media, index) => (
                    <img
                      key={index}
                      src={media}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 'share' && (
          <div className="flex-1 p-4">
            <div className="flex items-start space-x-3 mb-6">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="text-white font-semibold mb-2">Madokscx</div>
                <Textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  className="bg-transparent border-none text-white placeholder-gray-400 p-0 text-sm resize-none"
                  maxLength={2200}
                  rows={3}
                />
                <div className="text-gray-400 text-xs mt-2">{caption.length}/2,200</div>
              </div>
              {selectedMedia.length > 0 && (
                <div className="flex flex-col space-y-1">
                  {selectedMedia.slice(0, 4).map((media, index) => (
                    <img
                      key={index}
                      src={media}
                      alt="Selected"
                      className="w-12 h-12 rounded object-cover"
                    />
                  ))}
                  {selectedMedia.length > 4 && (
                    <div className="w-12 h-12 bg-black/60 rounded flex items-center justify-center text-white text-xs">
                      +{selectedMedia.length - 4}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <AtSign size={18} className="text-gray-400" />
                  <span className="text-white">Tag people</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <MapPin size={18} className="text-gray-400" />
                  <span className="text-white">Add location</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <Hash size={18} className="text-gray-400" />
                  <span className="text-white">Add hashtags</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'live' && (
          <div className="flex-1 relative bg-black">
            {/* Live Stream View */}
            <div className="w-full h-full bg-gradient-to-br from-red-900/50 to-purple-900/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                  <VideoIcon size={48} className="text-white" />
                </div>
                <h2 className="text-white text-xl font-bold mb-2">You're Live!</h2>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white">LIVE</span>
                  <span className="text-gray-300">•</span>
                  <Users size={16} className="text-white" />
                  <span className="text-white">{liveViewers}</span>
                </div>
              </div>
            </div>

            {/* Live Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isMicOn ? 'bg-white/20' : 'bg-red-500'
                }`}
              >
                {isMicOn ? <Mic size={20} className="text-white" /> : <MicOff size={20} className="text-white" />}
              </button>
              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isCameraOn ? 'bg-white/20' : 'bg-red-500'
                }`}
              >
                {isCameraOn ? <VideoIcon size={20} className="text-white" /> : <VideoOff size={20} className="text-white" />}
              </button>
            </div>

            {/* Live Comments */}
            <div className="absolute right-4 bottom-20 w-64 max-h-96 overflow-hidden">
              <div className="space-y-2">
                <div className="bg-black/60 rounded-lg p-2">
                  <span className="text-blue-400 text-sm font-semibold">SpeedDemon: </span>
                  <span className="text-white text-sm">Awesome stream! 🔥</span>
                </div>
                <div className="bg-black/60 rounded-lg p-2">
                  <span className="text-green-400 text-sm font-semibold">DriftKing: </span>
                  <span className="text-white text-sm">Let's go! 💨</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostReels;
