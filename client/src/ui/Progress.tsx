import colors from '@utils/colors';
import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {
  progress: number;
}

const Progress: FC<Props> = ({progress}) => {
  return (
    <>
      <Text style={styles.title}>{`${progress}%`}</Text>
      <View style={[styles.progressBar, {width: `${progress}%`}]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    color: colors.CONSTRAST,
    paddingVertical: 2,
    alignSelf: 'flex-end',
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.CONSTRAST,
    borderRadius: 5,
  },
});

export default Progress;
