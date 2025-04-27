import React from 'react';
import RouteNavigation from './src/route/Index';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RouteNavigation />
    </SafeAreaProvider>
  );
}

export default App;
