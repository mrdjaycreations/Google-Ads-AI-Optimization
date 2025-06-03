# Google Ads AI Optimization Platform - Setup Commands
# Brand Wisdom Solutions

## BATCH 1: Project Structure & Git
```bash
# Create project structure
mkdir -p frontend backend infrastructure docs
mkdir -p backend/{app,tests,scripts}
mkdir -p backend/app/{api,core,services,models,tasks,utils}
mkdir -p infrastructure/{docker,k8s}
mkdir -p frontend/public/assets

# Initialize git
git init

# Create main .gitignore
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
.venv
*.egg-info/
.pytest_cache/
.coverage
htmlcov/
.mypy_cache/
.ruff_cache/

# Node
node_modules/
dist/
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Environment files
.env
.env.*
!.env.example

# Build outputs
build/
dist/
*.log

# Docker
.docker/
EOF

# Note: Place your Brandwisdomlogo-1.webp in frontend/public/assets/ after setup
```

## BATCH 2: Backend Setup Part 1 - Virtual Environment & Dependencies
```bash
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment (Windows Git Bash)
source venv/Scripts/activate

# Create requirements.txt
cat > requirements.txt << 'EOF'
# Core
fastapi==0.115.5
uvicorn[standard]==0.34.0
pydantic==2.10.3
pydantic-settings==2.6.1
python-dotenv==1.0.1

# Database & Supabase
supabase==2.11.2
asyncpg==0.30.0
sqlalchemy==2.0.36

# Google Ads
google-ads==25.2.0
google-auth==2.37.0
google-auth-oauthlib==1.3.0

# AI/ML
langchain==0.3.13
langchain-openai==0.2.14
langchain-anthropic==0.3.4
openai==1.59.5
anthropic==0.42.0

# Task Queue
celery[redis]==5.4.0
redis==5.2.1
flower==2.0.1

# API & Auth
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.19

# Utilities
httpx==0.28.1
tenacity==9.0.0
pandas==2.2.3
numpy==2.2.1

# Development
pytest==8.3.4
pytest-asyncio==0.25.0
black==24.10.0
ruff==0.8.5
mypy==1.14.0
EOF

# Install dependencies (this will take a few minutes)
pip install -r requirements.txt
```

## BATCH 3: Backend Setup Part 2 - FastAPI Structure
```bash
# Still in backend directory with venv activated

# Create app structure
cat > app/__init__.py << 'EOF'
"""Google Ads AI Optimization Platform Backend"""
__version__ = "1.0.0"
EOF

# Create main FastAPI app
cat > app/main.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import health

app = FastAPI(
    title="Google Ads AI Platform",
    description="AI-powered Google Ads optimization platform",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["health"])

@app.get("/")
async def root():
    return {"message": "Google Ads AI Platform API"}
EOF

# Create config
mkdir -p app/core
cat > app/core/__init__.py << 'EOF'
EOF

cat > app/core/config.py << 'EOF'
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Google Ads AI Platform"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here-change-this"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Database (Supabase)
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_SERVICE_KEY: str = ""
    
    # Google Ads
    GOOGLE_ADS_DEVELOPER_TOKEN: str = ""
    GOOGLE_ADS_CLIENT_ID: str = ""
    GOOGLE_ADS_CLIENT_SECRET: str = ""
    
    # AI Services
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # Environment
    ENVIRONMENT: str = "development"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
EOF

# Create API directory and health endpoint
mkdir -p app/api
cat > app/api/__init__.py << 'EOF'
EOF

cat > app/api/health.py << 'EOF'
from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }
EOF

# Create .env.example
cat > .env.example << 'EOF'
# API Settings
SECRET_KEY=your-secret-key-here-change-this
ENVIRONMENT=development

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Google Ads
GOOGLE_ADS_DEVELOPER_TOKEN=your-dev-token
GOOGLE_ADS_CLIENT_ID=your-client-id
GOOGLE_ADS_CLIENT_SECRET=your-client-secret

# AI Services
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Redis
REDIS_URL=redis://localhost:6379
EOF

# Create basic .env for now
cp .env.example .env

# Deactivate venv and go back to root
deactivate
cd ..
```

## BATCH 4: Frontend Setup - Vite React TypeScript
```bash
# Create Vite React TypeScript project (will prompt - select React and TypeScript)
npm create vite@latest frontend -- --template react-ts

# Navigate to frontend
cd frontend

# Install all dependencies at once
npm install @tanstack/react-query @tanstack/react-router zustand tailwindcss postcss autoprefixer recharts lucide-react @radix-ui/react-alert-dialog @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-toast @radix-ui/react-tooltip class-variance-authority clsx tailwind-merge axios date-fns zod react-hook-form @hookform/resolvers

# Install dev dependencies
npm install -D @types/node

# Initialize Tailwind CSS
npx tailwindcss init -p
```

## BATCH 5: Frontend Configuration with Brand Wisdom Styling
```bash
# Still in frontend directory

# Update tailwind.config.js with Brand Wisdom colors and fonts
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Brand Wisdom Primary Colors
        primary: {
          50: "#F4F7FF",
          100: "#E7EEFF",
          300: "#B9CBFF",
          500: "#4172F5",
          600: "#3E5CE7",
          700: "#324ECF",
          900: "#07153F",
          DEFAULT: "#3E5CE7",
          foreground: "#FFFFFF",
        },
        // Brand Wisdom Secondary Colors
        secondary: {
          DEFAULT: "#444751",
          foreground: "#FFFFFF",
        },
        // Brand Wisdom Text Colors
        text: "#6F7176",
        // Brand Wisdom Neutral Colors
        grey: {
          100: "#F3F6FA",
          400: "#6F7176",
          900: "#1A1E29",
        },
        // Brand Wisdom Accent Colors
        gold: {
          500: "#FECD79",
        },
        // Status Colors
        success: "#27C084",
        error: "#EF5E5E",
        // Base colors for components
        border: "#F3F6FA",
        input: "#F3F6FA",
        ring: "#4172F5",
        background: "#FFFFFF",
        foreground: "#07153F",
        muted: {
          DEFAULT: "#F3F6FA",
          foreground: "#6F7176",
        },
        accent: {
          DEFAULT: "#FECD79",
          foreground: "#07153F",
        },
        destructive: {
          DEFAULT: "#EF5E5E",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#07153F",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#07153F",
        },
      },
      fontFamily: {
        sans: ["Jost", "Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      fontSize: {
        // Brand Wisdom Typography Scale
        "display-1": ["64px", { lineHeight: "110%", letterSpacing: "-1%" }],
        "display-1-mobile": ["48px", { lineHeight: "110%", letterSpacing: "-1%" }],
        "h1": ["48px", { lineHeight: "120%", letterSpacing: "-0.5%" }],
        "h2": ["36px", { lineHeight: "120%", letterSpacing: "-0.25%" }],
        "h3": ["28px", { lineHeight: "130%" }],
        "h4": ["22px", { lineHeight: "130%" }],
        "body-lg": ["18px", { lineHeight: "160%" }],
        "body-md": ["16px", { lineHeight: "160%" }],
        "body-sm": ["15px", { lineHeight: "150%" }],
        "caption": ["12px", { lineHeight: "140%", letterSpacing: "0.2px" }],
      },
      spacing: {
        // Brand Wisdom 8pt Grid
        "0": "0px",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "24px",
        "6": "32px",
        "7": "40px",
        "7.5": "56px",
        "8": "64px",
        "9": "80px",
      },
      borderRadius: {
        sm: "5px",
        md: "10px",
        lg: "20px",
        xl: "30px",
      },
      boxShadow: {
        "card": "0 4px 8px rgba(0,0,0,0.04)",
        "button": "0 2px 4px rgba(0,0,0,0.1)",
        "button-hover": "0 4px 8px rgba(0,0,0,0.15)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4172F5 0%, #285CF7 100%)",
        "ring-gradient": "radial-gradient(circle at center, rgba(65,114,245,.08) 0%, rgba(65,114,245,0) 70%)",
      },
    },
  },
  plugins: [],
}
EOF

# Update src/index.css with Brand Wisdom styles
cat > src/index.css << 'EOF'
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@100..900&family=Playfair+Display:wght@400..900&family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Brand Wisdom CSS Variables */
    --c-primary-50: #F4F7FF;
    --c-primary-100: #E7EEFF;
    --c-primary-300: #B9CBFF;
    --c-primary-500: #4172F5;
    --c-primary-600: #3E5CE7;
    --c-primary-700: #324ECF;
    --c-primary-900: #07153F;
    
    --c-secondary: #444751;
    --c-text: #6F7176;
    --c-grey-100: #F3F6FA;
    --c-grey-400: #6F7176;
    --c-grey-900: #1A1E29;
    
    --c-gold-500: #FECD79;
    --c-success: #27C084;
    --c-error: #EF5E5E;
    
    /* Font Families */
    --font-primary: 'Jost', sans-serif;
    --font-secondary: 'Playfair Display', serif;
    
    /* Spacing (8pt Grid) */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-7: 40px;
    --space-7-5: 56px;
    --space-8: 64px;
    --space-9: 80px;
    
    /* Border Radius */
    --radius-sm: 5px;
    --radius-md: 10px;
    --radius-lg: 20px;
    --radius-xl: 30px;
  }

  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground font-sans;
    font-family: var(--font-primary);
    color: var(--c-text);
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif;
    color: var(--c-primary-900);
  }
}

@layer components {
  /* Brand Wisdom Button Styles */
  .btn-primary {
    @apply bg-primary-600 text-white px-6 py-3 rounded-sm font-bold uppercase;
    @apply transition-all duration-300 shadow-button;
    @apply hover:bg-white hover:text-primary-600 hover:border hover:border-primary-600;
    @apply hover:-translate-y-0.5 hover:shadow-button-hover;
  }
  
  .btn-secondary {
    @apply bg-transparent text-primary-600 px-6 py-3 rounded-sm font-bold uppercase;
    @apply border border-primary-600 transition-all duration-300;
    @apply hover:bg-primary-600 hover:text-white;
  }
  
  /* Brand Wisdom Card Styles */
  .card {
    @apply bg-white rounded-lg p-8 shadow-card border border-grey-100;
  }
  
  /* Brand Wisdom Gradient Text */
  .gradient-text {
    @apply bg-brand-gradient bg-clip-text text-transparent;
  }
}

@layer utilities {
  /* Brand Wisdom Typography Classes */
  .text-display-1 {
    @apply text-display-1 font-bold font-serif;
  }
  
  .text-display-1-mobile {
    @apply text-display-1-mobile font-bold font-serif;
  }
  
  .text-heading-1 {
    @apply text-h1 font-bold font-serif;
  }
  
  .text-heading-2 {
    @apply text-h2 font-bold font-serif;
  }
  
  .text-heading-3 {
    @apply text-h3 font-semibold font-serif;
  }
  
  .text-heading-4 {
    @apply text-h4 font-semibold font-serif;
  }
  
  .text-body-large {
    @apply text-body-lg font-sans;
  }
  
  .text-body {
    @apply text-body-md font-sans;
  }
  
  .text-body-small {
    @apply text-body-sm font-sans;
  }
}
EOF

# Update index.html to include Brand Wisdom meta tags
cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Brand Wisdom Solutions - Google Ads AI Optimization Platform" />
    <meta name="theme-color" content="#3E5CE7" />
    <title>Google Ads AI Platform - Brand Wisdom Solutions</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Create lib/utils
mkdir -p src/lib
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF

# Create environment files
cat > .env.example << 'EOF'
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_BRAND_NAME=Brand Wisdom Solutions
EOF

cp .env.example .env

# Go back to root
cd ..
```

## BATCH 6: Docker & Documentation Setup
```bash
# Create Docker Compose file
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - REDIS_URL=redis://redis:6379
    env_file:
      - ./backend/.env
    depends_on:
      - redis
    volumes:
      - ./backend:/app
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

  celery:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - REDIS_URL=redis://redis:6379
    env_file:
      - ./backend/.env
    depends_on:
      - redis
      - backend
    volumes:
      - ./backend:/app
    command: celery -A app.tasks worker --loglevel=info

  flower:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5555:5555"
    environment:
      - REDIS_URL=redis://redis:6379
    env_file:
      - ./backend/.env
    depends_on:
      - redis
      - celery
    command: celery -A app.tasks flower

volumes:
  redis_data:
EOF

# Create Backend Dockerfile
cat > backend/Dockerfile << 'EOF'
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Run as non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

# Create README.md
cat > README.md << 'EOF'
# Google Ads AI Optimization Platform
## Brand Wisdom Solutions

AI-powered platform for managing and optimizing multiple Google Ads accounts.

<img src="frontend/public/assets/Brandwisdomlogo-1.webp" alt="Brand Wisdom Solutions" height="40">

## Features

- 🤖 AI-powered optimization recommendations
- 📊 Multi-account dashboard
- 🚀 One-click implementation
- 📈 Performance analytics
- 🔔 Real-time alerts

## Tech Stack

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python
- **Database**: Supabase (PostgreSQL)
- **AI/ML**: LangChain + OpenAI/Anthropic
- **Task Queue**: Celery + Redis
- **Infrastructure**: Docker + Vercel + Railway

## Brand Guidelines

This project follows the Brand Wisdom Solutions style guide:
- Primary Color: #3E5CE7
- Typography: Jost (body), Playfair Display (headings)
- 8pt spacing grid system

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.12+
- Docker & Docker Compose
- Supabase account

### Quick Start

1. Clone and setup environment files
2. Add your logo: `frontend/public/assets/Brandwisdomlogo-1.webp`
3. Configure Supabase credentials
4. Run with Docker: `docker compose up`
5. Access:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000
   - API Docs: http://localhost:8000/docs
   - Flower: http://localhost:5555

## License

© 2025 Brand Wisdom Solutions - All rights reserved
EOF

# Create package.json for root project
cat > package.json << 'EOF'
{
  "name": "google-ads-ai-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "docker compose up",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && source venv/Scripts/activate && uvicorn app.main:app --reload",
    "install:all": "npm install && cd frontend && npm install",
    "build": "cd frontend && npm run build",
    "test": "cd backend && pytest"
  }
}
EOF
```

## BATCH 7: Create Supabase Schema SQL
```bash
# Create SQL file for Supabase tables
cat > infrastructure/supabase-schema.sql << 'EOF'
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'manager', 'analyst')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Google Ads Accounts
CREATE TABLE IF NOT EXISTS google_ads_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  user_id UUID REFERENCES users(id),
  refresh_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recommendations
CREATE TABLE IF NOT EXISTS recommendations (
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

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_ads_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX idx_recommendations_account_id ON recommendations(account_id);
CREATE INDEX idx_recommendations_status ON recommendations(status);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
EOF

echo "✅ Project structure created successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Copy backend/.env.example to backend/.env and add your credentials"
echo "2. Copy frontend/.env.example to frontend/.env and add Supabase URL/Key"
echo "3. Add your logo: Copy Brandwisdomlogo-1.webp to frontend/public/assets/"
echo "4. Run the SQL schema in Supabase SQL Editor (infrastructure/supabase-schema.sql)"
echo "5. Start development with: docker compose up"
echo ""
echo "🎨 Brand Assets:"
echo "   - Logo: frontend/public/assets/Brandwisdomlogo-1.webp (40px height)"
echo "   - Primary Color: #3E5CE7"
echo "   - Fonts: Jost (body), Playfair Display (headings)"
echo ""
echo "🚀 Once running:"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend API: http://localhost:8000"
echo "   - API Docs: http://localhost:8000/docs"
echo "   - Flower: http://localhost:5555"
```

---

## HOW TO RUN THESE BATCHES:

1. **Open Git Bash** in your project directory (`/j/Brand Wisdom/Web App/SAAS/Google Ads AI Optimization`)

2. **Run each batch sequentially** by copying and pasting the entire batch into your terminal

3. **Wait for each batch to complete** before running the next one

4. **For Batch 4**, when prompted by Vite, select:
   - Framework: React
   - Variant: TypeScript

5. **After all batches are complete**, you'll need to:
   - Configure your Supabase credentials in the .env files
   - Run the SQL schema in Supabase
   - Start the project with Docker

