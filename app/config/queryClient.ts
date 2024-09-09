import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 2,
      staleTime: 1_000 * 60 * 5, // 5 minutes
    },
  },
});

export default queryClient;
