
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Giveaways from "@/pages/Giveaways";
import Merchandise from "@/pages/Merchandise";
import Events from "@/pages/Events";
import Profile from "@/pages/Profile";
import Messages from "@/pages/Messages";
import PostReels from "@/pages/PostReels";
import VideoFeed from "@/pages/VideoFeed";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show login page if not authenticated
  if (!isLoading && !isAuthenticated) {
    return <Login />;
  }

  // Show loading or main app if authenticated
  return (
    <Switch>
      {isLoading ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/post-reels">
            <PostReels />
          </Route>
          <Route path="/video-feed">
            <VideoFeed />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/messages">
            <Messages />
          </Route>
          <Route path="/">
            <>
              <Navigation />
              <Home />
            </>
          </Route>
          <Route path="/giveaways">
            <>
              <Navigation />
              <Giveaways />
            </>
          </Route>
          <Route path="/merchandise">
            <>
              <Navigation />
              <Merchandise />
            </>
          </Route>
          <Route path="/events">
            <>
              <Navigation />
              <Events />
            </>
          </Route>
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>Fullstack App on Vercel</h1>
      <p>Message from API: {message}</p>
    </div>
  );
}

export default App;
