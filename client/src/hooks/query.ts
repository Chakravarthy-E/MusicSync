import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import client from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {updateNotification} from 'src/store/notification';
import {AudioData} from 'src/@types/audio';

const fetchLatest = async (): Promise<AudioData[]> => {
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
