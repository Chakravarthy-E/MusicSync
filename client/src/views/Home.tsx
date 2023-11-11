import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useFetchLatestAudios} from 'src/hooks/query';
import PulseAnimationContainer from '@ui/PulseAnimationContainer';
import LatestUploads from '@components/LatestUploads';
import colors from '@utils/colors';
import RecommendedAudios from '@components/RecommendedAudios';

interface Props {}

const Home: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <LatestUploads />
      <RecommendedAudios />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Home;
