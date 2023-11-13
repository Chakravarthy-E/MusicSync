import PlaylistItem from '@ui/PlaylistItem';
import React, {FC} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useFetchPlaylist} from 'src/hooks/query';

interface Props {}

const PlaylistTab: FC<Props> = props => {
  const {data, isLoading} = useFetchPlaylist();
  return (
    <ScrollView style={styles.container}>
      {data?.map(playlist => {
        return <PlaylistItem key={playlist.id} playlist={playlist} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistTab;