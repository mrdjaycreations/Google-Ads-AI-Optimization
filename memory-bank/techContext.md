# Technical Context: Google Ads AI Optimization Platform

## Technology Stack

### Frontend Technologies
- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS with Brand Wisdom design system
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: 
  - Zustand for global application state
  - @tanstack/react-query for server state management
- **Routing**: @tanstack/react-router for type-safe routing
- **Forms**: react-hook-form with zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React icon library
- **Utilities**: clsx, tailwind-merge for conditional styling

### Backend Technologies
- **Framework**: FastAPI (Python 3.12)
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **ORM**: SQLAlchemy 2.0 with async support
- **Authentication**: Supabase Auth with JWT tokens
- **Task Queue**: Celery with Redis broker
- **Monitoring**: Flower for Celery task monitoring
- **API Documentation**: Automatic OpenAPI/Swagger generation
- **Validation**: Pydantic v2 for data validation and serialization

### AI/ML Technologies
- **Framework**: LangChain for AI orchestration
- **AI Providers**: 
  - OpenAI GPT models for text generation
  - Anthropic Claude for analysis and recommendations
- **Data Processing**: Pandas and NumPy for data manipulation
- **HTTP Client**: httpx for async API calls

### Infrastructure & DevOps
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose for local development
- **Database**: Supabase managed PostgreSQL
- **Caching**: Redis for session storage and task queue
- **Version Control**: Git with GitHub repository

## Development Environment Setup

### Prerequisites
- **Node.js**: 18+ for frontend development
- **Python**: 3.12+ for backend development
- **Docker**: For containerized development
- **Git**: Version control

### Project Structure
```
Google Ads AI Optimization/
├── PRD Files/              # Project documentation
│   ├── New Plan PRD.md    # Current product requirements
│   └── Setup instructions.md # Complete setup guide
├── backend/                # Python FastAPI backend
│   ├── app/               # Application source code
│   ├── venv/              # Python virtual environment
│   ├── requirements.txt   # Python dependencies
│   ├── Dockerfile         # Backend container config
│   └── .env               # Environment variables
├── frontend/              # React TypeScript frontend
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   ├── node_modules/      # Node dependencies
│   ├── package.json       # Node dependencies config
│   └── .env               # Frontend environment variables
├── infrastructure/        # Infrastructure as code
│   ├── supabase-schema.sql # Database schema
│   ├── docker/            # Docker configurations
│   └── k8s/               # Kubernetes manifests
├── memory-bank/           # Project memory and context
│   ├── projectbrief.md   # Project foundation
│   ├── productContext.md # Product vision and features
│   ├── systemPatterns.md # Technical architecture
│   ├── techContext.md    # Technology stack details
│   ├── activeContext.md  # Current project status
│   ├── progress.md       # Development progress
│   ├── googleApiConfig.md # Google API configuration
│   └── prdChanges.md     # PRD evolution tracking
├── docker-compose.yml     # Multi-service development
└── README.md             # Project documentation
```

### Environment Configuration

#### Backend Environment Variables (.env)
```bash
# API Settings
SECRET_KEY=your-secret-key-here-change-this
ENVIRONMENT=development

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Google Ads API Configuration
GOOGLE_ADS_DEVELOPER_TOKEN=USJoZ_CN_pYY2MP-jlhjqA
GOOGLE_ADS_CLIENT_ID=1064238544359-185m5ligmeu6gmcsfn5ctnpg4jg8mvq1.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=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
GOOGLE_ADS_LOGIN_CUSTOMER_ID=6052344141
WISEADS_REDIRECT_URI=http://localhost:8000/auth/callback

# AI Services
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Redis Configuration
REDIS_URL=redis://localhost:6379
```

#### Frontend Environment Variables (.env)
```bash
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_BRAND_NAME=Brand Wisdom Solutions

# Google OAuth (if implementing frontend auth flow)
VITE_GOOGLE_CLIENT_ID=1064238544359-185m5ligmeu6gmcsfn5ctnpg4jg8mvq1.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback
```

## Development Workflow

### Local Development Commands
```bash
# Start all services with Docker
docker compose up

# Frontend development (standalone)
cd frontend && npm run dev

# Backend development (standalone)
cd backend && source venv/Scripts/activate && uvicorn app.main:app --reload

# Install all dependencies
npm run install:all

# Build frontend for production
npm run build

# Run backend tests
npm run test
```

### Service Endpoints
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Flower (Celery Monitor)**: http://localhost:5555
- **Redis**: localhost:6379

## Database Schema

### Core Tables
```sql
-- Users table with role-based access
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'manager', 'analyst')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Google Ads account connections
CREATE TABLE google_ads_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  user_id UUID REFERENCES users(id),
  refresh_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI-generated recommendations
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES google_ads_accounts(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  impact_estimate JSONB,
  status TEXT DEFAULT 'pending',
  ai_confidence FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  applied_at TIMESTAMPTZ,
  applied_by UUID REFERENCES users(id)
);

-- Comprehensive audit logging
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## API Integration Patterns

### Google Ads API Integration
- **Authentication**: OAuth 2.0 with refresh token rotation
- **Client Configuration**: Web application client (Google ads AI 2.0)
- **OAuth Scopes**: `https://www.googleapis.com/auth/adwords`
- **Redirect URIs**: Multiple localhost endpoints for development
- **Rate Limiting**: Respect API quotas with exponential backoff
- **Data Synchronization**: Scheduled background tasks every 15 minutes
- **Error Handling**: Comprehensive retry logic with circuit breaker pattern
- **Test Users**: `brandwisdomo1@gmail.com`, `d.j.arayan@gmail.com`

### Supabase Integration
- **Real-time Subscriptions**: Live data updates via WebSocket
- **Row Level Security**: Database-level access control
- **Authentication**: JWT-based user authentication
- **File Storage**: Secure asset storage for logos and documents

## Performance Considerations

### Frontend Optimization
- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Vite's optimized build process
- **Caching Strategy**: Browser caching for static assets
- **Image Optimization**: WebP format for brand assets

### Backend Optimization
- **Database Connection Pooling**: Efficient resource utilization
- **Query Optimization**: Indexed database queries
- **Caching Layer**: Redis for frequently accessed data
- **Background Processing**: Celery for non-blocking operations

## Security Implementation

### Authentication & Authorization
- **JWT Tokens**: Stateless authentication with Supabase
- **Role-Based Access Control**: Granular permission system
- **API Key Security**: Encrypted storage of sensitive credentials
- **CORS Configuration**: Restricted cross-origin requests

### Data Protection
- **Encryption**: TLS/HTTPS for all communications
- **Sensitive Data**: Secure environment variable management
- **Audit Trails**: Complete activity logging for compliance
- **Input Validation**: Comprehensive data sanitization
