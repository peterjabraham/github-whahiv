export type Role = 'user' | 'admin' | 'moderator';

export interface Permission {
  action: string;
  subject: string;
}

export const ROLES: Record<Role, Permission[]> = {
  user: [
    { action: 'read', subject: 'profile' },
    { action: 'update', subject: 'profile' },
  ],
  moderator: [
    { action: 'read', subject: 'profile' },
    { action: 'update', subject: 'profile' },
    { action: 'read', subject: 'users' },
    { action: 'moderate', subject: 'content' },
  ],
  admin: [
    { action: 'manage', subject: 'all' },
  ],
};

export function hasPermission(
  userRole: Role,
  action: string,
  subject: string
): boolean {
  const permissions = ROLES[userRole];
  return permissions.some(
    (permission) =>
      (permission.action === action || permission.action === 'manage') &&
      (permission.subject === subject || permission.subject === 'all')
  );
}