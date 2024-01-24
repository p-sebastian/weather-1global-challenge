import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {RootStack} from './screens/Root.stack';
import {
  QueryClient,
  QueryClientProvider,
  QueryFunction,
  QueryKey,
} from '@tanstack/react-query';
import {GlobalProvider} from './providers/global.provider';

const BASE_URL = 'https://api.weatherapi.com/v1';

const defaultQueryFn: QueryFunction<unknown, QueryKey, never> = async ({
  queryKey,
}) => {
  const [path, args] = queryKey;
  const params = new URLSearchParams({
    ...(typeof args === 'object' ? args : null),
    key: '95b6d8b613b74b64a9a120647242401',
  });
  const response = await fetch(`${BASE_URL}${path}?${params}`);

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return response.json();
};

// provide the default query function to your app with defaultOptions
const client = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export const App: React.FC = () => (
  <QueryClientProvider client={client}>
    <NavigationContainer>
      <GlobalProvider>
        <RootStack />
      </GlobalProvider>
    </NavigationContainer>
  </QueryClientProvider>
);
