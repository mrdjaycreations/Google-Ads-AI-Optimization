# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Local Development
```bash
# Start all services (frontend, backend, Redis, Flower)
npm run dev

# Start individual services
npm run dev:frontend   # Frontend only at http://localhost:5173
npm run dev:backend    # Backend only at http://localhost:8000

# Install dependencies
npm run install:all    # Install all project dependencies

# Build and test
npm run build          # Build frontend for production
npm run test           # Run backend tests
```

### Service URLs
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Flower (Celery monitoring): http://localhost:5555

## High-Level Architecture

This is a monorepo Google Ads AI Optimization Platform with:

### Backend (FastAPI + Python)
- **API Structure**: `/backend/app/` contains the FastAPI application
- **Core Components**:
  - `api/` - API endpoints and routes
  - `models/` - Database models and schemas
  - `services/` - Business logic and external integrations
  - `tasks/` - Celery background tasks
- **Key Technologies**: FastAPI, Supabase (auth + database), Celery + Redis (task queue), LangChain (AI orchestration)
- **Google Ads Integration**: OAuth 2.0 client configured, ready for API integration

### Frontend (Vite + React + TypeScript)
- **Component Structure**: `/frontend/src/` 
- **State Management**: Zustand for client state, TanStack Query for server state
- **Styling**: Tailwind CSS with Brand Wisdom theme variables
- **UI Components**: Radix UI primitives for accessibility

### Infrastructure
- **Docker Compose**: Orchestrates all services for local development
- **Database**: PostgreSQL via Supabase with pre-designed schema (`infrastructure/supabase-schema.sql`)
- **Background Jobs**: Redis + Celery for async task processing

## Current Implementation Status

**Completed**:
- Project scaffolding and configuration
- Brand Wisdom theming and design system
- Google Ads API credentials and OAuth setup
- Supabase project configuration
- Docker environment

**Ready to Implement**:
- User authentication flow (Supabase Auth)
- Google Ads account connection
- AI recommendation engine
- Dashboard and visualization components
- One-click optimization features

## Important Context Files

- `/PRD Files/New Plan PRD.md` - Product requirements and feature specifications
- `/memory-bank/progress.md` - Current development status and next steps
- `/memory-bank/googleApiConfig.md` - Google Ads API configuration details
- `/infrastructure/supabase-schema.sql` - Database schema definition