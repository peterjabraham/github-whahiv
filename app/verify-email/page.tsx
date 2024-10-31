'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { applyActionCode, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { updateUserProfile } from '@/lib/firebase/user';
import PageLoader from '@/components/loading/PageLoader';

export default function VerifyEmailPage() {
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { user, profile } = useUser();
  const [resending, setResending] = useState(false);

  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    async function verifyEmail() {
      if (!oobCode) {
        setVerifying(false);
        return;
      }

      try {
        await applyActionCode(auth, oobCode);
        if (user?.id) {
          await updateUserProfile(user.id, { emailVerified: true });
        }
        setVerified(true);
        toast({
          title: 'Email verified',
          description: 'Your email has been successfully verified.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Verification failed',
          description: 'The verification link is invalid or has expired.',
        });
      } finally {
        setVerifying(false);
      }
    }

    verifyEmail();
  }, [oobCode, toast, user?.id]);

  const handleResendVerification = async () => {
    if (!auth.currentUser) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please sign in to resend verification email.',
      });
      router.push('/auth/signin');
      return;
    }

    setResending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      toast({
        title: 'Verification email sent',
        description: 'Please check your email for the verification link.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send verification email.',
      });
    } finally {
      setResending(false);
    }
  };

  if (verifying) return <PageLoader />;

  if (!oobCode) {
    return (
      <div className="container max-w-md py-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Verify Your Email</CardTitle>
            <CardDescription className="text-center">
              {profile?.emailVerified
                ? 'Your email is already verified.'
                : 'Please verify your email address to access all features.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!profile?.emailVerified && (
              <Button
                className="w-full"
                onClick={handleResendVerification}
                disabled={resending}
              >
                {resending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/dashboard')}
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-md py-8">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {verified ? 'Email Verified' : 'Verification Failed'}
          </CardTitle>
          <CardDescription className="text-center">
            {verified
              ? 'Your email has been successfully verified.'
              : 'The verification link is invalid or has expired.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verified ? (
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
          ) : (
            <Button
              className="w-full"
              onClick={handleResendVerification}
              disabled={resending}
            >
              {resending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/dashboard')}
          >
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}