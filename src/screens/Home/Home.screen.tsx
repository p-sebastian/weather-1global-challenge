import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {HomeStyleSheet} from './Home.styles';
import {TextInput, View} from 'react-native';
import {Results} from './Results/Results';
import {Cities} from './Cities/Cities';
import {useGlobalContainer} from '../../providers/global.provider';

export const HomeScreen: React.FC = () => {
  const {search, state, setSearch} = useGlobalContainer();
  const {styles, theme} = useStyles(HomeStyleSheet);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={theme.colors.lightGrey}
          placeholder="Please type a city"
        />
      </View>
      {!search ? <Cities cities={state.cities} /> : <Results />}
    </View>
  );
};
