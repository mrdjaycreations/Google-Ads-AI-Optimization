# System Patterns: Google Ads AI Search Optimization Platform
**Source**: final-prd-search-ads.md + database-schema-complete.md

## Architecture Overview
Microservices architecture specifically optimized for Search campaign optimization with clear separation between frontend, backend, database, and external integrations. Enhanced with AI-powered search query analysis and real-time optimization capabilities.

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

### 3. Database Design (Supabase/PostgreSQL) - Search Optimization Focus
**18 Table Groups (1259 lines total from database-schema-complete.md):**

#### Core Search Optimization Tables:
- `search_terms`: Search query data with performance metrics
- `search_term_recommendations`: AI-generated search optimization suggestions
- `search_query_patterns`: ML pattern recognition for optimization
- `search_intents`: Intent classifications with confidence scores
- `intent_optimizations`: Intent-based optimization rules
- `ad_copies`: Ad variations with psychological triggers
- `ad_copy_tests`: A/B testing framework for ad copy
- `psychological_triggers`: Trigger library with effectiveness scores
- `negative_keyword_lists`: Organized negative keyword collections
- `negative_keywords`: Individual negative keywords with impact data
- `negative_keyword_suggestions`: AI-generated suggestions
- `quality_scores`: Historical Quality Score tracking
- `qs_improvement_plans`: Specific improvement recommendations
- `bid_strategies`: Custom bidding strategies
- `bid_adjustments`: Granular bid modifications
- `dayparting_schedules`: Time-based bid adjustments

#### Enhanced Core Tables:
- `users`: User authentication and profile data
- `google_ads_accounts`: Connected Google Ads account information with search focus
- `campaigns`, `ad_groups`, `keywords`, `ads`: Complete Google Ads hierarchy
- `performance_metrics`: Historical performance tracking
- `recommendations`: AI-generated optimization suggestions
- `audit_logs`: Complete activity and change tracking

**Design Patterns:**
- **Row Level Security (RLS)**: Supabase security policies for multi-tenant access
- **UUID Primary Keys**: For distributed system compatibility
- **JSONB Fields**: Flexible data storage for dynamic search optimization content
- **Vector Storage**: pgvector for semantic search capabilities
- **Indexed Queries**: Optimized for search query analysis patterns
- **Materialized Views**: Performance optimization for complex search analytics

### 4. AI/ML Integration Pattern - Search Optimization Focus
```python
# LangChain + OpenRouter API with Multiple Models
class SearchOptimizationEngine:
    def __init__(self):
        self.openrouter_client = OpenRouter()
        self.models = {
            "ad_copy_generation": "anthropic/claude-3-opus",
            "keyword_analysis": "openai/gpt-4-turbo",
            "bulk_operations": "anthropic/claude-3-haiku",
            "competitor_analysis": "google/gemini-pro",
            "insights_generation": "anthropic/claude-3-sonnet",
            "quick_classification": "mistralai/mixtral-8x7b"
        }

    async def analyze_search_queries(self, search_terms_data):
        # Search intent classification
        # Profitable query discovery
        # Waste elimination detection
        # Confidence scoring

    async def generate_ad_copy(self, keywords, psychological_triggers):
        # Generate 15 headlines + 4 descriptions
        # Apply psychological triggers
        # Ensure keyword inclusion
        # Brand voice consistency
```

**AI Patterns for Search Optimization:**
- **Model Selection**: Optimized AI model selection for specific search tasks
- **Search Intent Classification**: NLP-based categorization with confidence scoring
- **Psychological Trigger Integration**: AI-powered ad copy with emotional appeals
- **Query Pattern Recognition**: ML-based identification of profitable/wasteful patterns
- **Confidence Scoring**: Quantified recommendation reliability for search optimizations
- **Context Management**: Search campaign-specific prompt engineering
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
