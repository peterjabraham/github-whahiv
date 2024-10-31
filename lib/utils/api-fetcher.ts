import { ApiError } from '@/lib/api/error-handler';

export async function apiFetcher<T>(
  url: string,
  config: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error || 'An error occurred',
      data.code
    );
  }

  return data;
}