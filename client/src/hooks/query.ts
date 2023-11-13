import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {getClient} from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {updateNotification} from 'src/store/notification';
import {AudioData, Playlist} from 'src/@types/audio';

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/audio/latest');
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['latest-uploads'], {
    queryFn: () => fetchLatest(),
    onError(err) {
      const errrMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errrMessage, type: 'error'}));
    },
  });
};

const fetchRecommended = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/profile/recommended');
  return data.audios;
};

export const useFetchRecommendedAudios = () => {
  const dispatch = useDispatch();
  return useQuery(['recommended'], {
    queryFn: () => fetchRecommended(),
    onError(err) {
      const errrMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errrMessage, type: 'error'}));
    },
  });
};

const fetchPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client.get('/playlist/by-profile');
  return data.playlist;
};

export const useFetchPlaylist = () => {
  const dispatch = useDispatch();
  return useQuery(['playlist'], {
    queryFn: () => fetchPlaylist(),
    onError(err) {
      const errrMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errrMessage, type: 'error'}));
    },
  });
};
const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/profile/uploads');
  return data.audios;
};

export const useFetchUploadsByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(['uploads-by-profile'], {
    queryFn: () => fetchUploadsByProfile(),
    onError(err) {
      const errrMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errrMessage, type: 'error'}));
    },
  });
};

const fetchFavorites = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/favorite');
  return data.audios;
};

export const useFetchFavorites = () => {
  const dispatch = useDispatch();
  return useQuery(['favorite'], {
    queryFn: () => fetchFavorites(),
    onError(err) {
      const errrMessage = catchAsyncError(err);
      dispatch(updateNotification({message: errrMessage, type: 'error'}));
    },
  });
};
