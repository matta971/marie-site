// src/hooks/useNotionData.ts
import { useState, useEffect } from 'react';

interface UseNotionDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useNotionData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
): UseNotionDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      console.error('Erreur récupération données:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { 
    data, 
    loading, 
    error,
    refresh: fetchData 
  };
}