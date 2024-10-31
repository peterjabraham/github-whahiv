# Setup Guide

This guide will help you set up the Next.js + NextAuth + Firebase template for your project.

## Prerequisites

- Node.js 18.16.0 or higher
- npm or yarn
- Firebase account
- Google Cloud Platform account (for Firebase Admin SDK)

## Step 1: Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and select your preferred providers
3. Create a Firestore database
4. Generate a new Web App in Project Settings
5. Download your service account key for admin access

## Step 2: Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-32-character-secret-key-here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY=your-private-key
```

## Step 3: Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Step 4: Authentication Setup

1. Configure your authentication providers in `pages/api/auth/[...nextauth].ts`
2. Set up Firebase Authentication rules
3. Configure Firestore security rules

## Step 5: Testing

1. Create a test user account
2. Verify authentication flow
3. Test protected routes
4. Verify Firebase integration

## Common Issues

### CORS Issues
Ensure your Firebase project has the correct domains whitelisted in the Firebase Console.

### Authentication Errors
- Verify your environment variables are correct
- Check Firebase Authentication is enabled
- Ensure service account has correct permissions

### Deployment Issues
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.