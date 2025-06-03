# Project Brief: Google Ads AI Search Optimization Platform
**Brand Wisdom Solutions - Version 2.0 Final**
**Source**: final-prd-search-ads.md (701 lines) - Complete specification

## Project Overview
**Revolutionary internal tool designed specifically for maximizing Search campaign performance through AI-powered automation and insights.** By leveraging advanced machine learning and the Google Ads API, this platform transforms manual search campaign management into intelligent, automated optimization workflows that dramatically improve ROI while reducing management time by 90%.

## Primary Goals (Exact from PRD Section 3):
1. **Maximize Search ROI**: Achieve 40% improvement in ROAS through intelligent automation
2. **Eliminate Wasted Spend**: Reduce irrelevant clicks by 50% with AI-powered query analysis
3. **Dominate Quality Scores**: Achieve 8+ Quality Scores on 80% of keywords
4. **Accelerate Testing**: Run 10x more ad tests with automated creation and analysis
5. **Competitive Advantage**: React to competitor changes within minutes, not days

## Key Value Propositions (Exact from PRD Section 1):
- **40% reduction** in wasted ad spend through intelligent search query mining and negative keyword automation
- **50% improvement** in Quality Scores through AI-powered relevance optimization
- **3x faster** ad copy testing and optimization cycles
- **Real-time competitor intelligence** with automated response strategies
- **Natural language insights** that explain performance changes in plain English

## 12 Core Features (Exact from PRD Section 5):

### 5.1 Search Query Mining Engine 🔍
- Automatically analyze search terms to find profitable opportunities and eliminate waste
- Implementation: SearchTermView, KeywordPlanService, SharedSetService APIs

### 5.2 Search Intent Classifier 🎯
- Categorize search queries by user intent (Transactional, Informational, Navigational, Commercial Investigation)
- AI-powered classification with confidence scoring

### 5.3 Advanced Ad Copy Laboratory ✍️
- Generate, test, and optimize ad copy using psychological triggers and AI
- Generate 15 headlines + 4 descriptions for RSAs with psychological triggers

### 5.4 Negative Keyword AI 🚫
- Proactively identify and implement negative keywords to eliminate wasted spend
- Confidence-based auto-negation with impact tracking

### 5.5 Match Type Optimizer 🎲
- Dynamically optimize keyword match types based on performance data
- Broad to phrase to exact progression with automated transitions

### 5.6 Ad Relevance Maximizer 🎯
- Improve Quality Scores by optimizing keyword-to-ad relevance
- Component-level QS monitoring and improvement recommendations

### 5.7 Search Bid Intelligence 💰
- Optimize bids at granular levels for maximum ROI
- Hour-by-hour optimization with micro-bidding engine

### 5.8 Ad Extensions Maximizer 🔗
- Maximize SERP real estate and CTR through intelligent extension optimization
- AI-generated extensions with performance-based selection

### 5.9 Landing Page Synergy 🎯
- Ensure message consistency from ad click to conversion
- Message match analysis and page performance tracking

### 5.10 Advanced Search Automation 🤖
- Automate complex optimization workflows and campaign structures
- SKAG builder, campaign reorganization, workflow automation

### 5.11 Search Ads Scripts Library 📚
- Pre-built automation scripts for common optimization tasks
- N-gram analysis, budget monitoring, custom script builder

### 5.12 AI-Powered Insights Engine 🧠
- Transform data into actionable insights using natural language
- Natural language queries: "Why did CPC increase yesterday?"

## Success Metrics (Exact from PRD Section 9):
### Primary KPIs:
1. **Efficiency Metrics**: Time saved 6+ hours/week per user, 2x accounts per manager, 10x optimization velocity
2. **Performance Metrics**: 40% wasted spend reduction, +2 points Quality Score improvement, 25% CTR increase, 30% CPA reduction
3. **Business Metrics**: 95%+ client retention, +35% revenue per account, 10:1 platform ROI

## Technical Architecture (Exact from PRD Section 6):

### Technology Stack:
```yaml
Frontend:
  - Framework: Vite + React + TypeScript
  - UI: Tailwind CSS + shadcn/ui (Brand Wisdom themed)
  - State: Zustand + TanStack Query
  - Charts: Recharts
  - Tables: TanStack Table

Backend:
  - API: FastAPI (Python)
  - Task Queue: Celery + Redis
  - Scheduler: Celery Beat
  - AI/ML: LangChain + OpenRouter API
  - Google Ads: google-ads-python

Database & Services:
  - Database: Supabase (PostgreSQL)
  - Vector Store: pgvector (for semantic search)
  - Cache: Redis
  - File Storage: Supabase Storage
  - Real-time: Supabase Realtime

Infrastructure:
  - Frontend: Vercel
  - Backend: Railway
  - Containers: Docker
  - Monitoring: Sentry
  - CI/CD: GitHub Actions
```

### OpenRouter AI Models (Exact from PRD):
```python
OPENROUTER_MODELS = {
    "ad_copy_generation": "anthropic/claude-3-opus",
    "keyword_analysis": "openai/gpt-4-turbo",
    "bulk_operations": "anthropic/claude-3-haiku",
    "competitor_analysis": "google/gemini-pro",
    "insights_generation": "anthropic/claude-3-sonnet",
    "quick_classification": "mistralai/mixtral-8x7b"
}
```

### Google Ads API Integration:
- **Core Services**: GoogleAdsService, SearchTermViewService, KeywordPlanService, AdService, BiddingStrategyService, ExtensionFeedItemService, BatchJobService, ReportingService
- **Rate Limits**: 15,000 operations/day, 15,000 get requests/day, 5,000 mutate operations/request

## User Personas (Exact from PRD Section 4):
1. **Search Campaign Specialist (Emma)**: Manages 15-20 search accounts daily
2. **PPC Team Lead (Marcus)**: Oversees team of 5 specialists, strategic planning
3. **Agency Director (Sarah)**: Client relationship management, strategic oversight

## MVP Phasing (Exact from PRD Section 8):
- **Phase 1 (Months 1-2)**: Google Ads API integration, Basic dashboard, Search Query Mining Engine, Negative Keyword AI (basic), Simple bid management, User authentication
- **Phase 2 (Months 3-4)**: Search Intent Classifier, Ad Copy Laboratory, Quality Score tracking, Ad Extensions Maximizer, Match Type Optimizer
- **Phase 3 (Months 5-6)**: Advanced Search Automation, Scripts Library, AI Insights Engine, Landing Page Synergy, Competitive intelligence
- **Phase 4 (Months 7+)**: Advanced bid strategies, Workflow builder, Custom reporting, White-label options, Enterprise features
