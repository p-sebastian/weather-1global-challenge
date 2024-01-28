import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {RootStack} from './screens/Root.stack';
import {QueryClientProvider} from '@tanstack/react-query';
import {GlobalProvider} from './providers/global.provider';
import {client} from './App.config';

export const App: React.FC = () => (
  <QueryClientProvider client={client}>
    <NavigationContainer>
      <GlobalProvider>
        <RootStack />
      </GlobalProvider>
    </NavigationContainer>
  </QueryClientProvider>
);
