'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAsync } from '@/hooks/use-async';
import { Lock } from 'lucide-react';
import PageLoader from '@/components/loading/PageLoader';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validCode, setValidCode] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { execute: resetPassword, loading } = useAsync(confirmPasswordReset);

  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    async function verifyCode() {
      if (!oobCode) {
        router.push('/auth/signin');
        return;
      }

      try {
        await verifyPasswordResetCode(auth, oobCode);
        setValidCode(true);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Invalid or expired link',
          description: 'Please request a new password reset link.',
        });
        router.push('/auth/forgot-password');
      } finally {
        setVerifying(false);
      }
    }

    verifyCode();
  }, [oobCode, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Passwords do not match',
        description: 'Please ensure both passwords are identical.',
      });
      return;
    }

    if (password.length < 8) {
      toast({
        variant: 'destructive',
        title: 'Password too short',
        description: 'Password must be at least 8 characters long.',
      });
      return;
    }

    try {
      await resetPassword(auth, oobCode!, password);
      toast({
        title: 'Password reset successful',
        description: 'You can now sign in with your new password.',
      });
      router.push('/auth/signin');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to reset password. Please try again.',
      });
    }
  };

  if (verifying) return <PageLoader />;
  if (!validCode) return null;

  return (
    <div className="container max-w-md py-8">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                'Resetting...'
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Reset Password
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}