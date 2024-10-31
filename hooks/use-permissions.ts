'use client';

import { useUser } from './use-user';
import { hasPermission } from '@/lib/auth/roles';

export function usePermissions() {
  const { profile } = useUser();

  const can = (action: string, subject: string): boolean => {
    if (!profile?.role) return false;
    return hasPermission(profile.role, action, subject);
  };

  return { can };
}