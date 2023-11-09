import colors from '@utils/colors';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Loader from './Loader';

interface Props {
  title: string;
  onPress?: void;
  busy?: boolean;
  borderRaduis?: number;
}

const AppButton: FC<Props> = ({title, busy, onPress, borderRaduis}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, {borderRadius: borderRaduis || 25}]}>
      {!busy ? <Text style={styles.title}>{title}</Text> : <Loader />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.CONSTRAST,
    fontSize: 18,
  },
});

export default AppButton;
