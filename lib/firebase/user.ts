import { db } from './config';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Role } from '@/lib/auth/roles';

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: Role;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    emailNotifications: boolean;
  };
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) return null;
  return userSnap.data() as UserProfile;
}

export async function createUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  const now = new Date().toISOString();
  const userRef = doc(db, 'users', userId);
  
  await setDoc(userRef, {
    id: userId,
    role: 'user',
    emailVerified: false,
    createdAt: now,
    updatedAt: now,
    preferences: {
      theme: 'system',
      emailNotifications: true,
    },
    ...data,
  });
}

export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteUserProfile(userId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
}