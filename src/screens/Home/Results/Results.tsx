import React from 'react';
import {useResultItem, useResults} from './Results.hooks';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {ResultsStyleSheet} from './Results.styles';
import {TLocation} from '../../../types/TLocation';

const Item: React.FC<TLocation> = item => {
  const {onPress, disabled} = useResultItem(item);
  const {styles} = useStyles(ResultsStyleSheet);
  const {name, country} = item;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="add city"
      style={styles.item}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text(disabled)}>
        <Text style={styles.bold}>{name}</Text>, {country}
      </Text>
    </TouchableOpacity>
  );
};

const renderItem: ListRenderItem<TLocation> = ({item}) => <Item {...item} />;
const keyExtractor = (item: TLocation) => String(item.id);
const Empty: React.FC = () => {
  const {styles} = useStyles(ResultsStyleSheet);

  return (
    <View style={styles.empty}>
      <Text style={[styles.text(), styles.bold]}>No Results Found</Text>
    </View>
  );
};

export const Results: React.FC = () => {
  const {styles} = useStyles(ResultsStyleSheet);
  const {data, error, isLoading} = useResults();

  if (isLoading) {
    return (
      <View style={styles.activityBox}>
        <ActivityIndicator accessibilityHint="loading" />
      </View>
    );
  }

  if (error) {
    return null;
  }

  return (
    <View style={styles.container} accessibilityHint="results">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={Empty}
      />
    </View>
  );
};
