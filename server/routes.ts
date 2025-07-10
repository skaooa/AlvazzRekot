import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertGiveawayEntrySchema, insertCartItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Giveaway routes
  app.get('/api/giveaways', async (req, res) => {
    try {
      const giveaways = await storage.getActiveGiveaways();
      res.json(giveaways);
    } catch (error) {
      console.error("Error fetching giveaways:", error);
      res.status(500).json({ message: "Failed to fetch giveaways" });
    }
  });

  app.get('/api/giveaways/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const giveaway = await storage.getGiveaway(id);
      if (!giveaway) {
        return res.status(404).json({ message: "Giveaway not found" });
      }
      res.json(giveaway);
    } catch (error) {
      console.error("Error fetching giveaway:", error);
      res.status(500).json({ message: "Failed to fetch giveaway" });
    }
  });

  app.post('/api/giveaways/:id/enter', isAuthenticated, async (req: any, res) => {
    try {
      const giveawayId = parseInt(req.params.id);
      const userId = req.user.claims.sub;

      // Check if user already entered
      const existingEntry = await storage.getUserGiveawayEntry(userId, giveawayId);
      if (existingEntry) {
        return res.status(400).json({ message: "Already entered this giveaway" });
      }

      const entry = await storage.enterGiveaway({ userId, giveawayId });
      res.json(entry);
    } catch (error) {
      console.error("Error entering giveaway:", error);
      res.status(500).json({ message: "Failed to enter giveaway" });
    }
  });

  // Product routes
  app.get('/api/products', async (req, res) => {
    try {
      const category = req.query.category as string;
      const products = category 
        ? await storage.getProductsByCategory(category)
        : await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Cart routes
  app.get('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const items = await storage.getCartItems(userId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post('/api/cart', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertCartItemSchema.parse({ ...req.body, userId });
      const item = await storage.addToCart(validatedData);
      res.json(item);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.delete('/api/cart/:productId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const productId = parseInt(req.params.productId);
      await storage.removeFromCart(userId, productId);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  // Event routes
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getActiveEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
