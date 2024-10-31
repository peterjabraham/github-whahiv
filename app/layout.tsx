import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/auth/AuthProvider';
import { ToastWrapper } from '@/components/ui/toast-wrapper';
import { Header } from '@/components/layout/Header';
import { EmailVerificationBanner } from '@/components/auth/EmailVerificationBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js + NextAuth + Firebase Template',
  description: 'A secure authentication template using Next.js, NextAuth, and Firebase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <EmailVerificationBanner />
          <main>{children}</main>
          <ToastWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}