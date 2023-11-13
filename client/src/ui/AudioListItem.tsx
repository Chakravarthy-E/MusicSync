import colors from '@utils/colors';
import React, {FC} from 'react';
import {View, StyleSheet, Pressable, Image, Text} from 'react-native';
import {AudioData} from 'src/@types/audio';

interface Props {
  audio: AudioData;
  onPress?(): void;
}

const AudioListItem: FC<Props> = ({audio, onPress}) => {
  const getSource = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/music_small.png');
  };

  return (
    <Pressable onPress={onPress} style={styles.listItem}>
      <Image source={getSource(audio.poster)} style={styles.poster} />
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {audio.title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.owner}>
          {audio.owner.name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  poster: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    color: colors.CONSTRAST,
    fontWeight: '700',
  },
  owner: {
    color: colors.SECONDARY,
    fontWeight: '700',
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: colors.OVERLAY,
    marginBottom: 15,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  titleContainer: {
    flex: 1,
    padding: 5,
  },
});

export default AudioListItem;
