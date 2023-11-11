import React, {FC, useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import LatestUploads from '@components/LatestUploads';
import RecommendedAudios from '@components/RecommendedAudios';
import OptionsModel from '@components/OptionsModel';
import MaterialComIcom from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@utils/colors';

interface Props {}

const Home: FC<Props> = props => {
  const [showOptions, setshowOptions] = useState(false);

  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={() => {
          setshowOptions(true);
        }}
      />
      <RecommendedAudios
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={() => {
          setshowOptions(true);
        }}
      />
      <OptionsModel
        visible={showOptions}
        onRequestClose={() => setshowOptions(false)}
        options={[
          {title: 'Add to playlist', icon: 'playlist-music'},
          {title: 'Add to favorite', icon: 'cards-heart'},
        ]}
        renderItem={item => {
          return (
            <Pressable style={styles.optionsContainer}>
              <MaterialComIcom
                color={colors.PRIMARY}
                name={item.icon}
                size={24}
              />
              <Text style={styles.optionsLabel}>{item.title}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionsLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});

export default Home;
