import {
  users,
  giveaways,
  products,
  cartItems,
  giveawayEntries,
  events,
  type User,
  type UpsertUser,
  type Giveaway,
  type InsertGiveaway,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type GiveawayEntry,
  type InsertGiveawayEntry,
  type Event,
  type InsertEvent,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Giveaway operations
  getGiveaways(): Promise<Giveaway[]>;
  getActiveGiveaways(): Promise<Giveaway[]>;
  getGiveaway(id: number): Promise<Giveaway | undefined>;
  createGiveaway(giveaway: InsertGiveaway): Promise<Giveaway>;
  enterGiveaway(entry: InsertGiveawayEntry): Promise<GiveawayEntry>;
  getUserGiveawayEntry(userId: string, giveawayId: number): Promise<GiveawayEntry | undefined>;
  
  // Product operations
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart operations
  getCartItems(userId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  removeFromCart(userId: string, productId: number): Promise<void>;
  clearCart(userId: string): Promise<void>;
  
  // Event operations
  getEvents(): Promise<Event[]>;
  getActiveEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Giveaway operations
  async getGiveaways(): Promise<Giveaway[]> {
    return await db.select().from(giveaways).orderBy(desc(giveaways.createdAt));
  }

  async getActiveGiveaways(): Promise<Giveaway[]> {
    return await db.select().from(giveaways)
      .where(eq(giveaways.isActive, true))
      .orderBy(desc(giveaways.createdAt));
  }

  async getGiveaway(id: number): Promise<Giveaway | undefined> {
    const [giveaway] = await db.select().from(giveaways).where(eq(giveaways.id, id));
    return giveaway;
  }

  async createGiveaway(giveaway: InsertGiveaway): Promise<Giveaway> {
    const [newGiveaway] = await db.insert(giveaways).values(giveaway).returning();
    return newGiveaway;
  }

  async enterGiveaway(entry: InsertGiveawayEntry): Promise<GiveawayEntry> {
    const [newEntry] = await db.insert(giveawayEntries).values(entry).returning();
    return newEntry;
  }

  async getUserGiveawayEntry(userId: string, giveawayId: number): Promise<GiveawayEntry | undefined> {
    const [entry] = await db.select().from(giveawayEntries)
      .where(and(eq(giveawayEntries.userId, userId), eq(giveawayEntries.giveawayId, giveawayId)));
    return entry;
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.isActive, true));
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products)
      .where(and(eq(products.category, category), eq(products.isActive, true)));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  // Cart operations
  async getCartItems(userId: string): Promise<CartItem[]> {
    return await db.select().from(cartItems).where(eq(cartItems.userId, userId));
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const [newItem] = await db.insert(cartItems).values(item).returning();
    return newItem;
  }

  async removeFromCart(userId: string, productId: number): Promise<void> {
    await db.delete(cartItems)
      .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)));
  }

  async clearCart(userId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }

  // Event operations
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(desc(events.eventDate));
  }

  async getActiveEvents(): Promise<Event[]> {
    return await db.select().from(events)
      .where(eq(events.isActive, true))
      .orderBy(desc(events.eventDate));
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }
}

export const storage = new DatabaseStorage();
