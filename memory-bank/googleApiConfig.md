# Google API Configuration: Google Ads AI Optimization Platform

## OAuth 2.0 Client Configuration

### Primary Web Application Client
**Status**: ✅ **ACTIVE** - Use for all production flows

| Field | Value |
|-------|-------|
| **Client Name** | Google ads AI 2.0 |
| **Client Type** | Web application |
| **Client ID** | `1064238544359-185m5ligmeu6gmcsfn5ctnpg4jg8mvq1.apps.googleusercontent.com` |
| **Client Secret** | `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` |
| **Created** | June 4, 2025 |
| **Status** | Active |

### Legacy Desktop Client
**Status**: 🔄 **LEGACY** - CLI/testing only

| Field | Value |
|-------|-------|
| **Client Name** | Test Google Ads AI 1 |
| **Client Type** | Desktop |
| **Client ID** | `1064238544359-2hsoao5p2sbdnfa2hi1tkvq6ulf3hofs.apps.googleusercontent.com` |
| **Client Secret** | `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` |
| **Created** | April 23, 2025 |

## Google Ads API Credentials

### API Configuration
| Setting | Value |
|---------|-------|
| **Developer Token** | `USJoZ_CN_pYY2MP-jlhjqA` |
| **Login Customer ID** | `6052344141` |
| **API Version** | Latest (v17+) |
| **Status** | Active |

### OAuth Consent Screen
| Setting | Value |
|---------|-------|
| **Publishing Status** | Testing (100-user cap) |
| **User Type** | External |
| **Authorized Test Users** | `brandwisdomo1@gmail.com`, `d.j.arayan@gmail.com` |
| **Authorized Domains** | None (localhost development) |

### Required Scopes
| Scope | Purpose | Sensitivity |
|-------|---------|-------------|
| `https://www.googleapis.com/auth/adwords` | Full Google Ads account access | Sensitive |

## Authorized Redirect URIs

### Active Redirect URIs
All four URIs are configured and active:

```
http://localhost:5173/auth/callback    # Frontend (Vite dev server)
http://localhost:3000/auth/callback    # Alternative frontend port
http://localhost:8000/auth/callback    # Backend (FastAPI) - RECOMMENDED
http://localhost/auth/callback         # Generic localhost
```

**Recommended**: Use `http://localhost:8000/auth/callback` for backend-handled OAuth flow.

## Environment Configuration

### Backend Environment Variables
```bash
# Google Ads API Configuration
GOOGLE_ADS_DEVELOPER_TOKEN=USJoZ_CN_pYY2MP-jlhjqA
GOOGLE_ADS_CLIENT_ID=1064238544359-185m5ligmeu6gmcsfn5ctnpg4jg8mvq1.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=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
GOOGLE_ADS_LOGIN_CUSTOMER_ID=6052344141

# OAuth Configuration
WISEADS_REDIRECT_URI=http://localhost:8000/auth/callback

# Optional: Refresh token (obtained after first auth)
GOOGLE_ADS_REFRESH_TOKEN=
```

### Frontend Environment Variables (Optional)
```bash
# Google OAuth (if implementing frontend auth flow)
VITE_GOOGLE_CLIENT_ID=1064238544359-185m5ligmeu6gmcsfn5ctnpg4jg8mvq1.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback
```

### Google Ads API Configuration File
Create `backend/google-ads.yaml`:

```yaml
developer_token: USJoZ_CN_pYY2MP-jlhjqA
client_id: 1064238544359-185m5ligmeu6gmcsfn5ctnpg4jg8mvq1.apps.googleusercontent.com
client_secret: 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
login_customer_id: 6052344141
refresh_token: # Will be populated after OAuth flow
```

## OAuth 2.0 Implementation Pattern

### Authentication Flow
1. **Generate Authorization URL**: Backend creates OAuth URL with proper scopes
2. **User Authorization**: User grants permissions via Google OAuth consent
3. **Handle Callback**: Backend receives authorization code
4. **Exchange for Tokens**: Code exchanged for access/refresh tokens
5. **Store Refresh Token**: Securely store for API access
6. **Initialize Client**: Use tokens to create Google Ads API client

### Key Implementation Points
- **Scope**: `https://www.googleapis.com/auth/adwords` for full access
- **Access Type**: `offline` to receive refresh token
- **Prompt**: `consent` to ensure refresh token generation
- **State Parameter**: Include for CSRF protection
- **Token Storage**: Encrypt and store refresh tokens securely

## API Client Initialization

### Service Configuration
```python
from google.ads.googleads.client import GoogleAdsClient

client = GoogleAdsClient.load_from_dict({
    "developer_token": "USJoZ_CN_pYY2MP-jlhjqA",
    "client_id": "1064238544359-185m5ligmeu6gmcsfn5ctnpg4jg8mvq1.apps.googleusercontent.com",
    "client_secret": "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",
    "refresh_token": user_refresh_token,
    "login_customer_id": "6052344141",
    "use_proto_plus": True
})
```

## Security Considerations

### Token Management
- **Refresh Token Storage**: Encrypt in database, never in logs
- **Access Token Rotation**: Implement automatic refresh logic
- **Scope Limitation**: Only request necessary permissions
- **Token Expiration**: Handle expired tokens gracefully

### API Security
- **Rate Limiting**: Respect Google Ads API quotas
- **Error Handling**: Comprehensive exception handling
- **Audit Logging**: Log all API interactions
- **User Permissions**: Map Google accounts to application users

## Testing Configuration

### Test Users
- **Primary**: `brandwisdomo1@gmail.com`
- **Secondary**: `d.j.arayan@gmail.com`
- **Limitation**: 100 users maximum in testing mode

### Development Workflow
1. Use test users for OAuth flow testing
2. Verify token generation and storage
3. Test API client initialization
4. Validate account access and data retrieval
5. Test error handling and token refresh

## Production Considerations

### Publishing Requirements
- **OAuth Consent Screen**: Must be verified for production
- **Domain Verification**: Required for non-localhost redirects
- **Privacy Policy**: Required for consent screen
- **Terms of Service**: Required for consent screen
- **App Verification**: May be required for sensitive scopes

### Scaling Considerations
- **Rate Limits**: Monitor API usage quotas
- **Token Management**: Implement token refresh queues
- **Error Handling**: Robust retry mechanisms
- **Monitoring**: Track API performance and errors

## Common Issues & Solutions

### Authentication Issues
- **Invalid Client**: Verify Client ID/Secret match exactly
- **Redirect URI Mismatch**: Ensure exact match with authorized URIs
- **Scope Issues**: Verify `adwords` scope is requested
- **Test User Access**: Ensure user is added to OAuth consent screen

### API Access Issues
- **Developer Token**: Verify token is active and valid
- **Customer ID**: Ensure login customer ID has proper access
- **Permissions**: Verify user has access to requested accounts
- **Rate Limits**: Implement exponential backoff for quota errors

## Monitoring & Maintenance

### Regular Tasks
- **Token Rotation**: Monitor refresh token validity
- **API Quota**: Track usage against limits
- **Error Rates**: Monitor authentication failures
- **User Access**: Audit user permissions regularly

### Performance Metrics
- **Authentication Success Rate**: Target 99%+
- **API Response Times**: Monitor for degradation
- **Error Rates**: Track and investigate spikes
- **Token Refresh Success**: Ensure automatic renewal works
