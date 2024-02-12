import React, {FC} from 'react';
import { View, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

interface Props{}

const PlayAnimation:FC<Props>=(props)=>{
  return <View style={styles.container}>

    <Animated.View style={[]}/>
  </View>
};

const styles = StyleSheet.create({
  container:{}
});

export default PlayAnimation