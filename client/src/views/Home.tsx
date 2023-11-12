import React, {FC, useState} from 'react';
import {StyleSheet, Pressable, Text, ScrollView} from 'react-native';
import LatestUploads from '@components/LatestUploads';
import RecommendedAudios from '@components/RecommendedAudios';
import OptionsModel from '@components/OptionsModel';
import MaterialComIcom from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@utils/colors';
import {AudioData, Playlist} from 'src/@types/audio';
import {getClient} from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {updateNotification} from 'src/store/notification';
import {useDispatch} from 'react-redux';
import PlaylistModal from '@components/PlaylistModal';
import PlaylistForm, {PlayListInfo} from '@components/PlaylistForm';
import {useFetchPlaylist} from 'src/hooks/query';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

interface Props {}

const Home: FC<Props> = props => {
  const [showOptions, setshowOptions] = useState(false);
  const [selectedAudio, setselectedAudio] = useState<AudioData>();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistForm, setshowPlaylistForm] = useState(false);

  const {data} = useFetchPlaylist();

  const dispatch = useDispatch();

  const handleOnFavPress = async () => {
    if (!selectedAudio) return;
    try {
      const client = await getClient();
      const {data} = await client.post('/favorite?audioId=' + selectedAudio.id);
      dispatch(updateNotification({message: 'Audio Added', type: 'success'}));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }

    setselectedAudio(undefined);
    setshowOptions(false);
  };

  const handleOnLongPress = (audio: AudioData) => {
    setselectedAudio(audio);
    setshowOptions(true);
  };

  const handleOnAddToPlaylist = async () => {
    setshowOptions(false);
    setShowPlaylistModal(true);
  };

  const handlePlaylistSubmit = async (value: PlayListInfo) => {
    if (!value.title.trim()) return;
    try {
      const client = await getClient();
      const {data} = await client.post('playlist/create', {
        resId: selectedAudio?.id,
        title: value.title,
        visibility: value.private ? 'private' : 'public',
      });
      console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
  };

  const updatePlayList = async (item: Playlist) => {
    try {
      const client = await getClient();
      const {data} = await client.patch('/playlist', {
        id: item.id,
        item: selectedAudio?.id,
        title: item.title,
        visibility: item.visibility,
      });
      setselectedAudio(undefined);
      setShowPlaylistModal(false);
      dispatch(
        updateNotification({message: 'New audio added.', type: 'success'}),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
  };
  return (
    <ScrollView style={styles.container}>
      <LatestUploads
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      />
      <RecommendedAudios
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      />
      <OptionsModel
        visible={showOptions}
        onRequestClose={() => setshowOptions(false)}
        options={[
          {
            title: 'Add to playlist',
            icon: 'playlist-music',
            onPress: handleOnAddToPlaylist,
          },
          {
            title: 'Add to favorite',
            icon: 'cards-heart',
            onPress: handleOnFavPress,
          },
        ]}
        renderItem={item => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionsContainer}>
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
      <PlaylistModal
        visible={showPlaylistModal}
        onRequestClose={() => {
          setShowPlaylistModal(false);
        }}
        list={data || []}
        onCreateNewPress={() => {
          setShowPlaylistModal(false);
          setshowPlaylistForm(true);
        }}
        onPlayListPress={updatePlayList}
      />
      <PlaylistForm
        visible={showPlaylistForm}
        onRequestClose={() => {
          setshowPlaylistForm(false);
        }}
        onSubmit={handlePlaylistSubmit}
      />
    </ScrollView>
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
  optionsLabel: {
    color: colors.PRIMARY,
    fontSize: 16,
    marginLeft: 5,
  },
});

export default Home;
