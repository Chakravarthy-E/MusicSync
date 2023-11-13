import React, {FC} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {Playlist} from 'src/@types/audio';
import MatericalIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '@utils/colors';

interface Props {
  playlist: Playlist;
  onPress?(): void;
}

const PlaylistItem: FC<Props> = ({playlist, onPress}) => {
  const {id, itemsCount, title, visibility} = playlist;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.posterContainer}>
        <MatericalIcon
          name="playlist-music"
          size={30}
          color={colors.SECONDARY}
        />
      </View>
      <View style={styles.content}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <View style={styles.iconContainer}>
          <FontAwesome
            name={visibility === 'public' ? 'globe' : 'lock'}
            color={colors.SECONDARY}
            size={16}
          />
          <Text style={styles.count}>
            {itemsCount} {itemsCount > 1 ? 'audios' : 'audio'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: colors.OVERLAY,
    marginBottom: 15,
    padding: 5,
  },
  posterContainer: {
    backgroundColor: colors.PRIMARY,
    height: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.CONSTRAST,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 5,
    marginLeft: 10,
  },
  count: {
    color: colors.SECONDARY,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    paddingTop: 4,
    alignItems: 'center',
  },
});

export default PlaylistItem;
