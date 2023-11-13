import colors from '@utils/colors';
import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {
  title: string;
}

const EmptyRecords: FC<Props> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.INACTIVE_CONSTRAST,
  },
});

export default EmptyRecords;
