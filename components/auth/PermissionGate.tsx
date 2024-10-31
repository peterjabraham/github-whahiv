'use client';

import { usePermissions } from '@/hooks/use-permissions';

interface PermissionGateProps {
  action: string;
  subject: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGate({
  action,
  subject,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { can } = usePermissions();

  if (!can(action, subject)) {
    return fallback;
  }

  return children;
}