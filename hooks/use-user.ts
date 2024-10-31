'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getUserProfile, type UserProfile } from '@/lib/firebase/user';
import { useToast } from '@/hooks/use-toast';

export function useUser() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user?.id) return;
      
      try {
        const userProfile = await getUserProfile(session.user.id);
        setProfile(userProfile);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load user profile',
        });
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [session?.user?.id, toast]);

  return {
    user: session?.user,
    profile,
    loading,
    isAuthenticated: !!session?.user,
  };
}