# Deployment Guide

This guide covers deploying your Next.js + NextAuth + Firebase application to production.

## Prerequisites

- Completed local setup
- Version control (Git)
- Vercel account (recommended) or alternative hosting platform
- Production Firebase project

## Step 1: Environment Preparation

1. Create a production Firebase project
2. Configure production environment variables
3. Update Firebase security rules for production

## Deployment Options

### Option 1: Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with following settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

```bash
# Manual deployment
vercel
```

### Option 2: Self-hosted

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Post-deployment Checklist

- [ ] Verify authentication flows
- [ ] Test Firebase integration
- [ ] Check security headers
- [ ] Monitor error reporting
- [ ] Set up logging
- [ ] Configure backups
- [ ] Set up monitoring

## Security Considerations

1. Enable Firebase Security Rules
2. Set up rate limiting
3. Configure CORS properly
4. Enable authentication providers
5. Set up proper IAM roles

## Monitoring

1. Set up Firebase Analytics
2. Configure error tracking
3. Set up performance monitoring
4. Enable logging

## Scaling

1. Configure Firestore indexes
2. Set up caching
3. Optimize database queries
4. Configure CDN

## Troubleshooting

### Common Issues

1. Environment Variables
   - Verify all environment variables are set
   - Check for proper formatting

2. Build Errors
   - Clear `.next` directory
   - Rebuild node modules

3. Authentication Issues
   - Verify production URLs
   - Check OAuth configurations

### Support

For additional support:
1. Check GitHub Issues
2. Consult NextAuth documentation
3. Review Firebase documentation
4. Contact support team