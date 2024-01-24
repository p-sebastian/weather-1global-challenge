import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ERootStack, TRootStackParamList} from './Root.interface';
import {HomeScreen} from './Home/Home.screen';

const {Navigator, Screen} = createNativeStackNavigator<TRootStackParamList>();

export const RootStack: React.FC = () => {
  return (
    <Navigator>
      <Screen
        name={ERootStack.Home}
        component={HomeScreen}
        options={{title: '1Global Weather'}}
      />
    </Navigator>
  );
};
