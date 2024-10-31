# Setup Guide

This guide will help you set up the Next.js + Firebase authentication template for your project.

## Prerequisites

- Node.js 18.16.0 or higher
- npm or yarn
- Firebase account
- Google Cloud Platform account (for Firebase Admin SDK)

## Step 1: Firebase Setup

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project"
3. Follow the setup wizard

### Enable Authentication
1. In Firebase Console, go to Authentication
2. Click "Get Started"
3. Enable the following providers:
   - Email/Password
   - Google

### Create Firestore Database
1. Go to Firestore Database
2. Click "Create Database"
3. Choose production or test mode
4. Select a location

### Generate Configuration
1. Go to Project Settings
2. Add a new Web App
3. Register the app
4. Copy the configuration

## Step 2: Environment Variables

1. Create `.env.local` in the project root:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-32-character-secret-key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Step 3: Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Step 4: Firebase Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      
      // Admins can read and write all user profiles
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Step 5: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable OAuth 2.0
4. Configure OAuth consent screen
5. Create OAuth 2.0 Client ID
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)

## Step 6: Testing

1. Create test accounts:
   - Regular user
   - Admin user
2. Test authentication flows:
   - Email/Password signup
   - Google sign in
   - Password reset
   - Email verification
3. Verify protected routes
4. Test user management features

## Common Issues

### CORS Issues
- Ensure your Firebase project has the correct domains whitelisted
- Add development and production domains to authorized domains

### Authentication Errors
- Verify environment variables are correct
- Check Firebase Authentication is enabled
- Ensure Google OAuth is properly configured

### Database Access Issues
- Review Firestore security rules
- Check user permissions
- Verify database initialization

## Next Steps

1. Customize UI components
2. Add additional authentication providers
3. Extend user profile data
4. Implement additional features
5. Deploy to production

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)