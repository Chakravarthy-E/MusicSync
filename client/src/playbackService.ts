import TrackPlayer, {Event} from 'react-native-track-player';

const playbackServicec = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {});
};

export default playbackServicec;
