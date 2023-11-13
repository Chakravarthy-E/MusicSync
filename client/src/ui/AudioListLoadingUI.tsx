import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import PulseAnimationContainer from './PulseAnimationContainer';
import colors from '@utils/colors';

interface Props {
  items?: number;
}

const AudioListLoadingUI: FC<Props> = ({items = 8}) => {
  const dummyData = new Array(items).fill('');

  return (
    <PulseAnimationContainer>
      <View>
        {dummyData.map((_, index) => {
          return <View key={index} style={styles.dummyListItem} />;
        })}
      </View>
    </PulseAnimationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  dummyListItem: {
    height: 50,
    width: '100%',
    backgroundColor: colors.INACTIVE_CONSTRAST,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default AudioListLoadingUI;
