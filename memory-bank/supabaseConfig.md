# Supabase Configuration: Google Ads AI Optimization Platform

## Project Details
**Status**: ✅ **ACTIVE_HEALTHY** - Ready for production use

| Field | Value |
|-------|-------|
| **Project Name** | Google-Ads-AI-Optimization 1.0 |
| **Project ID** | `irftzijnouubcjkyeuxj` |
| **Project URL** | `https://irftzijnouubcjkyeuxj.supabase.co` |
| **Database Host** | `db.irftzijnouubcjkyeuxj.supabase.co` |
| **Region** | ap-south-1 (Asia Pacific - Mumbai) |
| **Status** | ACTIVE_HEALTHY |
| **Created** | June 3, 2025 |

## Database Configuration

### PostgreSQL Details
| Setting | Value |
|---------|-------|
| **Version** | 17.4.1.037 (Latest) |
| **Engine** | PostgreSQL 17 |
| **Release Channel** | GA (General Availability) |
| **Connection** | SSL Required |

### API Keys
| Key Type | Value | Usage |
|----------|-------|-------|
| **Anon Key** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZnR6aWpub3V1YmNqa3lldXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzkwMTUsImV4cCI6MjA2NDU1NTAxNX0.5aeJ0716sJgQX0s8vRZDg2FwCq63RiHUIwU4ZzX0u9I` | Frontend & Backend |
| **Service Key** | *To be configured* | Backend admin operations |

## Environment Configuration

### Backend Environment Variables
```bash
# Supabase Configuration
SUPABASE_URL=https://irftzijnouubcjkyeuxj.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZnR6aWpub3V1YmNqa3lldXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzkwMTUsImV4cCI6MjA2NDU1NTAxNX0.5aeJ0716sJgQX0s8vRZDg2FwCq63RiHUIwU4ZzX0u9I
SUPABASE_SERVICE_KEY=your-service-key
```

### Frontend Environment Variables
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://irftzijnouubcjkyeuxj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZnR6aWpub3V1YmNqa3lldXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzkwMTUsImV4cCI6MjA2NDU1NTAxNX0.5aeJ0716sJgQX0s8vRZDg2FwCq63RiHUIwU4ZzX0u9I
```

## Database Schema Status

### Schema Deployment
- **Schema File**: `infrastructure/supabase-schema.sql`
- **Status**: ✅ Ready for deployment
- **Tables**: users, google_ads_accounts, recommendations, audit_logs
- **Security**: Row Level Security (RLS) policies defined
- **Indexes**: Optimized for performance

### Core Tables Overview
```sql
-- Users with role-based access
users (id, email, full_name, role, created_at, updated_at)

-- Google Ads account connections
google_ads_accounts (id, customer_id, name, status, user_id, refresh_token)

-- AI-generated recommendations
recommendations (id, account_id, type, title, description, impact_estimate, status, ai_confidence)

-- Comprehensive audit logging
audit_logs (id, user_id, action, resource_type, resource_id, details)
```

## Authentication Configuration

### Supabase Auth Setup
- **Provider**: Supabase Auth (JWT-based)
- **User Management**: Built-in user registration and login
- **Role-Based Access**: Admin, Manager, Analyst roles
- **Session Management**: Automatic token refresh
- **Security**: Row Level Security policies

### Integration Pattern
```javascript
// Frontend Supabase Client
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://irftzijnouubcjkyeuxj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
)
```

```python
# Backend Supabase Client
from supabase import create_client, Client

supabase: Client = create_client(
    "https://irftzijnouubcjkyeuxj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
)
```

## Real-time Features

### Supabase Realtime
- **WebSocket Connection**: Automatic real-time updates
- **Table Subscriptions**: Live data synchronization
- **Notification System**: Real-time alerts and updates
- **Dashboard Updates**: Live performance metrics

### Implementation
```javascript
// Real-time subscription example
const subscription = supabase
  .channel('recommendations')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'recommendations' },
    (payload) => {
      // Handle new recommendation
      console.log('New recommendation:', payload.new)
    }
  )
  .subscribe()
```

## Email Notifications

### Supabase Email Service
- **Provider**: Supabase Auth Email
- **Templates**: Custom email templates for notifications
- **Triggers**: Database triggers for automated emails
- **SMTP**: Configurable SMTP settings

### Email Configuration
```sql
-- Email trigger example
CREATE OR REPLACE FUNCTION notify_new_recommendation()
RETURNS TRIGGER AS $$
BEGIN
  -- Send email notification logic
  PERFORM pg_notify('new_recommendation', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER recommendation_notification
  AFTER INSERT ON recommendations
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_recommendation();
```

## Security Configuration

### Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_ads_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Example RLS policy
CREATE POLICY "Users can only see their own data" ON users
  FOR ALL USING (auth.uid() = id);
```

### API Security
- **JWT Validation**: Automatic token verification
- **Role-Based Permissions**: Granular access control
- **API Rate Limiting**: Built-in protection
- **CORS Configuration**: Secure cross-origin requests

## Performance Optimization

### Database Indexes
```sql
-- Performance indexes
CREATE INDEX idx_recommendations_account_id ON recommendations(account_id);
CREATE INDEX idx_recommendations_status ON recommendations(status);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

### Connection Pooling
- **PgBouncer**: Built-in connection pooling
- **Max Connections**: Optimized for concurrent users
- **Connection Limits**: Automatic scaling

## Backup & Recovery

### Automatic Backups
- **Daily Backups**: Automatic daily database backups
- **Point-in-Time Recovery**: Restore to any point in time
- **Retention**: 7-day backup retention
- **Geographic Replication**: Multi-region backup storage

## Monitoring & Analytics

### Built-in Monitoring
- **Database Performance**: Query performance metrics
- **API Usage**: Request volume and response times
- **Error Tracking**: Automatic error logging
- **Resource Usage**: CPU, memory, and storage metrics

### Dashboard Access
- **Supabase Dashboard**: https://supabase.com/dashboard/project/irftzijnouubcjkyeuxj
- **SQL Editor**: Direct database query interface
- **Table Editor**: Visual table management
- **API Documentation**: Auto-generated API docs

## Next Steps

### Immediate Actions
1. **Deploy Schema**: Execute `infrastructure/supabase-schema.sql` in SQL Editor
2. **Configure RLS**: Set up Row Level Security policies
3. **Test Connection**: Verify backend and frontend connectivity
4. **Setup Email**: Configure email templates and triggers

### Development Integration
1. **Authentication Flow**: Implement user login/logout
2. **Real-time Updates**: Set up WebSocket subscriptions
3. **Data Synchronization**: Connect Google Ads data to Supabase
4. **Notification System**: Build email and in-app notifications

## Support & Documentation

### Resources
- **Supabase Docs**: https://supabase.com/docs
- **API Reference**: https://supabase.com/docs/reference/javascript
- **SQL Reference**: https://supabase.com/docs/reference/sql
- **Community**: https://supabase.com/community

### Project-Specific
- **Schema File**: `infrastructure/supabase-schema.sql`
- **Environment Files**: All `.env` files updated with credentials
- **Memory Bank**: Complete configuration documented
- **Setup Instructions**: `PRD Files/Setup instructions.md`
