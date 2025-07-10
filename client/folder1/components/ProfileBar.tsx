import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@shared/schema";

const ProfileBar = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  const typedUser = user as User;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {typedUser.profileImageUrl && (
              <img
                src={typedUser.profileImageUrl}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-border"
              />
            )}
            <div className="flex items-center space-x-3">
              <span className="text-foreground font-medium">Madokscx</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-semibold">
                Dev
              </span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            VIP Luxury Member
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileBar;