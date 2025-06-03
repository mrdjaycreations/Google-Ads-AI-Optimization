# System Patterns: Google Ads AI Optimization Platform

## Architecture Overview
Microservices architecture with clear separation between frontend, backend, database, and external integrations.

## Core System Components

### 1. Frontend Architecture (React + TypeScript)
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Route-based page components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API communication layer
│   ├── stores/        # Zustand state management
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Helper functions
│   └── lib/           # Third-party integrations
```

**Key Patterns:**
- **Component Composition**: Radix UI primitives with custom styling
- **State Management**: Zustand for global state, React Query for server state
- **Type Safety**: Comprehensive TypeScript coverage
- **Styling**: Tailwind CSS with Brand Wisdom design tokens

### 2. Backend Architecture (FastAPI + Python)
```
backend/
├── app/
│   ├── api/           # API route handlers
│   ├── core/          # Configuration and settings
│   ├── models/        # SQLAlchemy database models
│   ├── services/      # Business logic layer
│   ├── tasks/         # Celery background tasks
│   └── utils/         # Helper functions and utilities
```

**Key Patterns:**
- **Dependency Injection**: FastAPI's dependency system for database sessions, auth
- **Repository Pattern**: Data access abstraction layer
- **Service Layer**: Business logic separation from API routes
- **Background Tasks**: Celery for long-running operations

### 3. Database Design (Supabase/PostgreSQL)
**Core Tables:**
- `users`: User authentication and profile data
- `google_ads_accounts`: Connected Google Ads account information
- `recommendations`: AI-generated optimization suggestions
- `audit_logs`: Complete activity and change tracking

**Design Patterns:**
- **Row Level Security (RLS)**: Supabase security policies
- **UUID Primary Keys**: For distributed system compatibility
- **JSONB Fields**: Flexible data storage for dynamic content
- **Indexed Queries**: Optimized for common access patterns

### 4. AI/ML Integration Pattern
```python
# LangChain + Multiple AI Providers
class RecommendationEngine:
    def __init__(self):
        self.openai_client = OpenAI()
        self.anthropic_client = Anthropic()
        
    async def generate_recommendations(self, campaign_data):
        # Multi-provider AI analysis
        # Confidence scoring
        # Impact estimation
```

**AI Patterns:**
- **Provider Abstraction**: Unified interface for multiple AI services
- **Confidence Scoring**: Quantified recommendation reliability
- **Context Management**: Campaign-specific prompt engineering
- **Fallback Strategy**: Multiple AI providers for reliability

## Integration Patterns

### 1. Google Ads API Integration
- **Authentication**: OAuth 2.0 with refresh token management
- **Rate Limiting**: Respect API quotas and implement backoff
- **Data Sync**: Scheduled background tasks for data freshness
- **Error Handling**: Comprehensive retry logic and error recovery

### 2. Real-time Updates & Notifications
- **WebSocket Connections**: Live dashboard updates
- **Event-Driven Architecture**: Pub/sub pattern for notifications
- **Optimistic Updates**: Immediate UI feedback with server confirmation
- **Email Notifications**: Supabase-native email service integration
- **In-App Notifications**: Real-time notification system with toast components

### 3. Background Processing
```python
# Celery Task Pattern
@celery_app.task(bind=True, max_retries=3)
def sync_google_ads_data(self, account_id):
    try:
        # Data synchronization logic
        pass
    except Exception as exc:
        # Retry with exponential backoff
        raise self.retry(exc=exc, countdown=60 * (2 ** self.request.retries))
```

## Security Patterns

### 1. Authentication & Authorization
- **JWT Tokens**: Stateless authentication with Supabase
- **Role-Based Access Control (RBAC)**: Admin, Manager, Analyst roles
- **API Key Management**: Secure storage of Google Ads credentials
- **Row Level Security**: Database-level access control

### 2. Data Protection
- **Encryption at Rest**: Supabase encrypted storage
- **Encryption in Transit**: HTTPS/TLS for all communications
- **Sensitive Data Handling**: Secure credential storage and rotation
- **Audit Logging**: Complete activity tracking for compliance

## Performance Patterns

### 1. Caching Strategy
- **Redis Caching**: Frequently accessed data caching
- **Query Optimization**: Database index strategy
- **CDN Integration**: Static asset delivery optimization
- **API Response Caching**: Intelligent cache invalidation

### 2. Scalability Patterns
- **Horizontal Scaling**: Stateless service design
- **Database Connection Pooling**: Efficient resource utilization
- **Background Task Distribution**: Celery worker scaling
- **Load Balancing**: Multi-instance deployment ready

## Error Handling Patterns

### 1. Graceful Degradation
- **Circuit Breaker**: Prevent cascade failures
- **Fallback Mechanisms**: Alternative data sources
- **User-Friendly Errors**: Clear error messaging
- **Automatic Recovery**: Self-healing system components

### 2. Monitoring & Observability
- **Structured Logging**: JSON-formatted logs with correlation IDs
- **Health Checks**: Service availability monitoring
- **Performance Metrics**: Response time and throughput tracking
- **Error Tracking**: Comprehensive error reporting and alerting
