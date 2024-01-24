import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {RootStack} from './screens/Root.stack';

export const App: React.FC = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);
