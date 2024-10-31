# Deployment Guide

This guide covers deploying your Next.js + Firebase application to production.

## Prerequisites

- Completed local setup
- Production Firebase project
- Version control (Git)
- Vercel account (recommended)

## Step 1: Environment Preparation

### 1. Firebase Production Project

1. Create a new Firebase project for production
2. Configure authentication providers
3. Set up Firestore database
4. Update security rules for production

### 2. Environment Variables

Prepare production environment variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=prod-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=prod-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=prod-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=prod-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=prod-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=prod-app-id

# Google OAuth
GOOGLE_CLIENT_ID=prod-client-id
GOOGLE_CLIENT_SECRET=prod-client-secret
```

## Step 2: Deployment Options

### Option 1: Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with following settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Option 2: Self-hosted

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Step 3: Post-deployment Checklist

### Security
- [ ] Enable Firebase Security Rules
- [ ] Configure CORS settings
- [ ] Set up rate limiting
- [ ] Enable authentication providers
- [ ] Set up proper IAM roles

### Monitoring
- [ ] Set up Firebase Analytics
- [ ] Configure error tracking
- [ ] Set up performance monitoring
- [ ] Enable logging

### Testing
- [ ] Test authentication flows
- [ ] Verify email functionality
- [ ] Check protected routes
- [ ] Test admin features

### Performance
- [ ] Configure Firestore indexes
- [ ] Set up caching
- [ ] Optimize database queries
- [ ] Configure CDN

## Step 4: Domain Setup

1. Configure custom domain in Vercel
2. Update Firebase authorized domains
3. Update OAuth redirect URIs
4. Configure SSL certificates

## Step 5: Maintenance

### Regular Tasks
1. Monitor error logs
2. Review analytics
3. Update dependencies
4. Backup database

### Security Updates
1. Rotate API keys
2. Update security rules
3. Review access patterns
4. Monitor auth attempts

## Troubleshooting

### Common Issues

1. Build Errors
   - Clear `.next` directory
   - Rebuild node modules
   - Check environment variables

2. Authentication Issues
   - Verify production URLs
   - Check OAuth configurations
   - Review Firebase settings

3. Database Access
   - Check security rules
   - Verify service account
   - Review permissions

### Support Resources

1. Next.js Documentation
2. Firebase Documentation
3. Vercel Support
4. Community Forums

## Scaling Considerations

1. Database
   - Implement caching
   - Optimize queries
   - Set up indexing

2. Authentication
   - Configure session handling
   - Set up rate limiting
   - Enable MFA

3. Performance
   - Enable CDN
   - Optimize assets
   - Configure caching

## Monitoring

1. Set up alerts for:
   - Authentication failures
   - Database errors
   - API failures
   - Performance issues

2. Regular monitoring of:
   - User activity
   - Error rates
   - Response times
   - Resource usage

## Backup Strategy

1. Database
   - Regular backups
   - Point-in-time recovery
   - Backup testing

2. Configuration
   - Environment variables
   - Security rules
   - Application settings