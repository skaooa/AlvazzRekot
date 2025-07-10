# Alvazz Rekot - Gaming Platform

## Overview

Alvazz Rekot is a full-stack gaming platform application built with React, TypeScript, and Express. The platform features a luxury gaming theme with giveaway management, merchandise store, event management, and user authentication through Replit Auth. The application uses a monorepo structure with shared schemas and type definitions.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom design system using CSS variables
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Animations**: Framer Motion for smooth transitions and effects
- **Fonts**: Orbitron for branding, Inter for body text

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Database Provider**: Neon Database (serverless PostgreSQL)

### Build System
- **Bundler**: Vite for frontend, esbuild for backend
- **Development**: Hot module replacement with Vite dev server
- **TypeScript**: Strict configuration with path aliases
- **Package Manager**: npm with lockfile

## Key Components

### Authentication System
- Replit Auth integration with OpenID Connect
- Session-based authentication with PostgreSQL session store
- Protected routes with authentication middleware
- User profile management with mandatory user table structure

### Database Schema
- **Users**: Required for Replit Auth (id, email, firstName, lastName, profileImageUrl)
- **Sessions**: Required for session management
- **Giveaways**: Contest management with entry tracking
- **Products**: Merchandise catalog with categories
- **CartItems**: Shopping cart functionality
- **GiveawayEntries**: User participation tracking
- **Events**: Event management system

### Frontend Features
- **Responsive Design**: Mobile-first approach with dark theme
- **Dynamic Navigation**: Hamburger menu for mobile, full navigation for desktop
- **Search Functionality**: Overlay search with auto-close timeout
- **Shopping Cart**: Modal-based cart with add/remove functionality
- **Giveaway System**: Entry mechanism with authentication checks
- **Profile Management**: User profile with logout functionality

### UI Design System
- **Color Scheme**: Black background with white text, neutral color palette
- **Typography**: Orbitron for headings, Inter for body text
- **Components**: Comprehensive set of reusable UI components
- **Animations**: Floating elements, smooth transitions, and hover effects
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## Data Flow

### Authentication Flow
1. User attempts to access protected route
2. Middleware checks session validity
3. If unauthorized, redirects to `/api/login`
4. Replit Auth handles OpenID Connect flow
5. Successful authentication creates user session
6. User data stored in PostgreSQL users table

### Giveaway Entry Flow
1. User views active giveaways
2. Authentication check before entry
3. Entry validation against existing entries
4. Database insertion with user and giveaway IDs
5. Real-time UI updates via TanStack Query

### Shopping Cart Flow
1. User adds items to cart (requires authentication)
2. Cart items stored in PostgreSQL
3. Real-time cart updates across components
4. Cart persistence across sessions

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm with drizzle-kit for migrations
- **Authentication**: passport with openid-client for Replit Auth
- **UI**: @radix-ui components for accessible primitives
- **Styling**: tailwindcss with autoprefixer
- **State**: @tanstack/react-query for server state
- **Animation**: framer-motion for smooth interactions

### Development Dependencies
- **Build**: vite, esbuild, tsx for development and production builds
- **Types**: TypeScript with strict configuration
- **Linting**: ESLint configuration for code quality
- **Development**: Replit-specific plugins for cartographer and runtime error modal

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` script
4. **Assets**: Static assets served from build directory

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **SESSION_SECRET**: Session encryption key (required)
- **REPL_ID**: Replit environment identifier
- **REPLIT_DOMAINS**: Allowed domains for CORS
- **ISSUER_URL**: OpenID Connect issuer (defaults to Replit)

### Production Considerations
- Session store configured for PostgreSQL persistence
- Authentication requires HTTPS in production
- Database migrations managed through Drizzle
- Static file serving optimized for production

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```