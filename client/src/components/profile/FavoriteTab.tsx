import AudioListItem from '@ui/AudioListItem';
import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import EmptyRecords from '@ui/EmptyRecords';
import React, {FC} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useFetchFavorites} from 'src/hooks/query';

interface Props {}

const FavoriteTab: FC<Props> = props => {
  const {data, isLoading} = useFetchFavorites();

  if (isLoading) return <AudioListLoadingUI />;

  if (!data?.length) return <EmptyRecords title="There is no audio" />;

  return (
    <ScrollView style={styles.container}>
      {data?.map(item => {
        return <AudioListItem key={item.id} audio={item} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FavoriteTab;
