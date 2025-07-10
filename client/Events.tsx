import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import ThreeBackground from "@/components/ThreeBackground";
import { Event } from "@shared/schema";

const Events = () => {
  const { toast } = useToast();

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const handleRegister = (eventId: number) => {
    toast({
      title: "Registration",
      description: "Event registration coming soon!",
    });
  };

  const formatDate = (dateValue: Date | string) => {
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        <ThreeBackground />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading events...</p>
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
              LUXURY EVENTS
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-playfair italic">
              Join exclusive premium gaming events and elite tournaments
            </p>
          </motion.div>

          {events.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl">No upcoming events at the moment.</p>
              <p className="text-gray-500 mt-2">Stay tuned for exciting tournaments and meetups!</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {events.map((event: Event, index: number) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                >
                  <Card className="bg-gradient-to-br from-white/15 to-white/5 border-2 border-white/20 backdrop-blur-lg hover:bg-white/20 hover:border-white/40 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 shadow-2xl relative">
                    <CardContent className="p-8">
                      <div className="relative">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="rounded-2xl mb-6 w-full h-56 object-cover border-2 border-white/20 shadow-lg"
                        />
                        <div className="absolute inset-0 bg-red-500/80 rounded-2xl flex items-center justify-center mb-6">
                          <span className="text-white font-bold text-2xl font-orbitron transform -rotate-12">SOLD OUT</span>
                        </div>
                      </div>
                      <h3 className="font-orbitron text-2xl font-bold mb-4 text-white">{event.title}</h3>
                      <p className="text-gray-200 mb-6 font-playfair leading-relaxed">{event.description}</p>
                      <div className="flex justify-between items-center mb-6 bg-white/10 rounded-lg p-3">
                        <span className="text-white font-semibold">{formatDate(event.eventDate)}</span>
                        <span className="text-gray-200">{event.location}</span>
                      </div>
                      {event.maxAttendees && (
                        <div className="mb-6 bg-white/10 rounded-lg p-3">
                          <p className="text-sm text-white font-semibold">
                            {event.currentAttendees || 0} / {event.maxAttendees} attendees
                          </p>
                        </div>
                      )}
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

export default Events;
