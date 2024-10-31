'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseAsyncReturn<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
  execute: (...args: any[]) => Promise<T | null>;
}

export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate = false
): UseAsyncReturn<T> {
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { toast } = useToast();

  const execute = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);

      try {
        const response = await asyncFunction(...args);
        setData(response);
        return response;
      } catch (error) {
        setError(error as Error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: (error as Error).message || 'An error occurred',
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction, toast]
  );

  return { loading, error, data, execute };
}