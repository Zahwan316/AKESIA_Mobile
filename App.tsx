import React from 'react';
import RouteNavigation from './src/route/Index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingIndicator from './src/component/loading';
import useComponentStore from './src/state/component';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const loading = useComponentStore((state) => state.loading);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        {
          loading &&
          <LoadingIndicator />
        }
        <RouteNavigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
