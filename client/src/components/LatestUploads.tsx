import React, {FC} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useFetchLatestAudios} from 'src/hooks/query';
import PulseAnimationContainer from '@ui/PulseAnimationContainer';
import colors from '@utils/colors';
import AudioCard from '@ui/AudioCard';
import {AudioData} from 'src/@types/audio';

interface Props {
  onAudioPress(item: AudioData, data: AudioData[]): void;
  onAudioLongPress(item: AudioData, data: AudioData[]): void;
}

const dummyData = new Array(4).fill('');

const LatestUploads: FC<Props> = ({onAudioPress, onAudioLongPress}) => {
  const {data, isLoading} = useFetchLatestAudios();

  if (isLoading)
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.dummyTitleView} />
          <View style={styles.dummyAudioContainer}>
            {dummyData.map((_, index) => {
              return <View key={index} style={styles.dummyAudioView} />;
            })}
          </View>
        </View>
      </PulseAnimationContainer>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Uploads</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map(item => {
          return (
            <AudioCard
              key={item.id}
              title={item.title}
              poster={item.poster}
              onPress={() => onAudioPress(item, data)}
              onLongPress={() => onAudioLongPress(item, data)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    color: colors.SECONDARY,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONSTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
  dummyAudioView: {
    height: 100,
    width: 100,
    backgroundColor: colors.INACTIVE_CONSTRAST,
    borderRadius: 5,
    marginRight: 15,
  },
  dummyAudioContainer: {
    flexDirection: 'row',
  },
});

export default LatestUploads;
