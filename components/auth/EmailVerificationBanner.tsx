'use client';

import { useUser } from '@/hooks/use-user';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export function EmailVerificationBanner() {
  const { profile, loading } = useUser();

  if (loading || !profile || profile.emailVerified) {
    return null;
  }

  return (
    <Alert className="rounded-none border-t-0 border-x-0">
      <AlertDescription className="flex items-center justify-between">
        <span>Please verify your email address to access all features.</span>
        <Button variant="outline" size="sm" asChild>
          <Link href="/verify-email">
            <Mail className="mr-2 h-4 w-4" />
            Verify Email
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}