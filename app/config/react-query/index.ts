import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

export { QueryClientProvider };

export default queryClient;