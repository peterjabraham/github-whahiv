'use client';

import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export function ToastWrapper() {
  const { toast } = useToast();

  return <Toaster />;
}