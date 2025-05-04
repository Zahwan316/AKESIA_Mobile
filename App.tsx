import React from 'react';
import RouteNavigation from './src/route/Index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <RouteNavigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
