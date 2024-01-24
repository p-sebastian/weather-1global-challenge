import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ERootStack} from './Root.interface';
import {SearchScreen} from './Search/Search.screen';
import {HomeScreen} from './Home/Home.screen';

const {Navigator, Screen} = createNativeStackNavigator();

export const RootStack: React.FC = () => {
  return (
    <Navigator>
      <Screen name={ERootStack.Home} component={HomeScreen} />
      <Screen
        name={ERootStack.Search}
        component={SearchScreen}
        options={{
          presentation: 'fullScreenModal',
        }}
      />
    </Navigator>
  );
};
