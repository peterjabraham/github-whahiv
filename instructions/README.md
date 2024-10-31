# Next.js Authentication & User Management Template

A production-ready template for building secure web applications with Next.js 13, Firebase Authentication, and role-based access control.

## Features

### Authentication & Authorization
- 🔐 Multiple auth providers (Email/Password, Google)
- 📧 Email verification system
- 🔑 Password reset flow
- 👥 Role-based access control (RBAC)
- 🛡️ Protected routes with middleware

### User Management
- 👤 User profiles with Firestore
- 🎨 User preferences
- 📊 Admin user management dashboard
- 🔄 Profile updates

### UI/UX
- 🎯 Shadcn/ui components
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚡ Fast page loads
- 🎨 Clean, modern UI
- 🚀 Optimized performance

### Developer Experience
- 📦 TypeScript support
- 🧩 Modular component architecture
- 🔧 Easy configuration
- 📝 Comprehensive documentation
- 🧪 Error handling
- 🔄 Loading states

## Quick Start

1. Clone the repository
2. Follow the [Setup Guide](./SETUP.md)
3. Start developing

## Documentation

- [Setup Guide](./SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)

## Project Structure

```
├── app/                    # Next.js 13 App Router
│   ├── admin/             # Admin pages
│   ├── auth/              # Authentication pages
│   ├── settings/          # User settings
│   └── verify-email/      # Email verification
├── components/            # Reusable components
│   ├── auth/             # Auth components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── user/             # User components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── api/             # API utilities
│   ├── auth/            # Auth utilities
│   ├── firebase/        # Firebase config
│   └── utils/           # Helper functions
└── types/               # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.