import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {useCity, usePullToRefresh} from './Cities.hooks';
import {
  TCitiesProps,
  TCityItemProps,
  TForecastItemProps,
} from './Cities.interface';
import {CitiesStyleSheet} from './Cities.styles';
import {useIsFetching} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Timeline} from './Timeline/Timeline';

const Forecast: React.FC<TForecastItemProps> = props => {
  const {styles} = useStyles(CitiesStyleSheet);
  const {date, index} = props;
  const {condition, mintemp_c, maxtemp_c} = props.day;
  const weekday = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
  });

  return (
    <View style={styles.forecast}>
      <Text style={[styles.text, styles.third]}>
        {index === 0 ? 'Today' : weekday}
      </Text>
      <View style={[styles.center, styles.third]}>
        <Image
          source={{uri: `https:${condition.icon}`}}
          width={24}
          height={24}
        />
      </View>
      <Text style={[[styles.text, styles.third], styles.bold]}>
        {mintemp_c}
        {'\u00B0'} - {maxtemp_c}
        {'\u00B0'}
      </Text>
    </View>
  );
};

const Item: React.FC<TCityItemProps> = item => {
  const {data, isError, isPending, onRemove} = useCity(item.id);
  const {styles} = useStyles(CitiesStyleSheet);

  if (isPending) {
    return (
      <View style={styles.card}>
        <ActivityIndicator accessibilityHint="loading" />
      </View>
    );
  }

  if (isError || !data) {
    return null;
  }

  const {name, country} = data.location;
  const {temp_c, condition} = data.current;
  const {forecastday} = data.forecast;
  const [first, second] = forecastday;
  const hours = [...first.hour, ...second.hour];

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.city}>
          {name}, {country}
        </Text>
        <View style={styles.row}>
          <Text style={styles.big}>
            {temp_c}
            {'\u00B0'}
          </Text>
          <Image
            source={{uri: `https:${condition.icon}`}}
            style={styles.center}
            width={32}
            height={32}
          />
        </View>
        <Text style={[styles.city, styles.grey]}>{condition.text}</Text>
      </View>
      <Timeline hours={hours} />
      {forecastday.map((day, i) => (
        <Forecast key={day.date} {...day} index={i} />
      ))}
      <TouchableOpacity
        style={styles.absolute}
        onPress={onRemove}
        accessibilityRole="button"
        accessibilityLabel="remove city">
        <Text style={styles.cross}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const NoCities: React.FC = () => {
  const {styles} = useStyles(CitiesStyleSheet);

  return (
    <View style={styles.noCities}>
      <Text>Please add a city under search</Text>
    </View>
  );
};
const renderItem: ListRenderItem<string> = ({item}) => <Item id={item} />;
const keyExtractor = (item: string) => item;
const Space: React.FC = () => {
  const {styles} = useStyles(CitiesStyleSheet);
  return <View style={styles.space} />;
};

export const Cities: React.FC<TCitiesProps> = ({cities}) => {
  const {styles} = useStyles(CitiesStyleSheet);
  const onRefresh = usePullToRefresh();
  const isFetching = useIsFetching();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container(insets)}>
      <FlatList
        data={cities}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Space}
        onRefresh={onRefresh}
        ListEmptyComponent={NoCities}
        refreshing={Boolean(isFetching)}
      />
    </View>
  );
};
