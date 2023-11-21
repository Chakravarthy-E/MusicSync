import TrackPlayer, {
  Track,
  usePlaybackState,
  State,
} from 'react-native-track-player';
import {AudioData} from 'src/@types/audio';

const updateQueue = async (data: AudioData[]) => {
  const lists: Track[] = data.map(item => {
    return {
      id: item.id,
      title: item.title,
      url: item.file,
      artwork: item.poster || require('../assets/music.png'),
      artist: item.owner.name,
      genre: item.category,
      isLiveStream: true,
    };
  });
  await TrackPlayer.add([...lists]);
};

const useAudioController = () => {
  const playbackState = usePlaybackState();
  const isPlayerReady = playbackState !== State.None;

  const onAudioPress = async (item: AudioData, data: AudioData[]) => {
    if (!isPlayerReady) {
      await updateQueue(data);
      const index = data.findIndex(audio => audio.id === item.id);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
    }
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    }
  };
  return {
    onAudioPress,
  };
};

export default useAudioController;
