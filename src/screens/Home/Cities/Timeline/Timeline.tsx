import {useStyles} from 'react-native-unistyles';
import {useTimeline} from './Timeline.hooks';
import {TTimelineProps} from './Timeline.interface';
import {TimelineStyleSheet} from './Timeline.styles';
import {View, Text, Image} from 'react-native';

export const Timeline: React.FC<TTimelineProps> = props => {
  const {styles} = useStyles(TimelineStyleSheet);
  const {forecast} = useTimeline(props.hours);

  return (
    <View style={styles.container}>
      {forecast.map(f => (
        <View key={f.time} style={styles.forecast}>
          <Text style={styles.hour}>{new Date(f.time).getHours()}</Text>
          <Image
            source={{uri: `https:${f.condition.icon}`}}
            width={24}
            height={24}
          />
          <Text style={[styles.hour, styles.temp]}>
            {f.temp_c}
            {'\u00B0'}
          </Text>
        </View>
      ))}
    </View>
  );
};
