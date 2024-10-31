'use client';

import Link from 'next/link';
import { UserNav } from '@/components/user/UserNav';
import { useUser } from '@/hooks/use-user';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function Header() {
  const { isAuthenticated, loading } = useUser();

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold">
          Your App
        </Link>

        <div className="flex items-center gap-4">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isAuthenticated ? (
            <UserNav />
          ) : (
            <Button asChild variant="outline">
              <Link href="/auth/signin">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}