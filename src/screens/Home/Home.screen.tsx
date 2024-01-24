import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {HomeStyleSheet} from './Home.styles';
import {View} from 'react-native';

export const HomeScreen: React.FC = () => {
  const {styles} = useStyles(HomeStyleSheet);

  return <View style={styles.container}></View>;
};
