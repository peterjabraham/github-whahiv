'use client';

import { useEffect, useState } from 'react';
import { usePermissions } from '@/hooks/use-permissions';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { UserProfile } from '@/lib/firebase/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserAvatar } from '@/components/user/UserAvatar';
import PageLoader from '@/components/loading/PageLoader';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { can } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (!can('read', 'users')) {
      router.push('/');
      return;
    }

    async function loadUsers() {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(
        (doc) => doc.data() as UserProfile
      );
      setUsers(usersData);
      setLoading(false);
    }

    loadUsers();
  }, [can, router]);

  if (loading) return <PageLoader />;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Users</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email Verified</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center gap-2">
                <UserAvatar user={user} />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              </TableCell>
              <TableCell className="capitalize">{user.role}</TableCell>
              <TableCell>
                {user.emailVerified ? (
                  <span className="text-green-600">Verified</span>
                ) : (
                  <span className="text-yellow-600">Pending</span>
                )}
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}