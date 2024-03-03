import { AudioData, Playlist } from "@/@types/audio";
import { useQuery } from "@tanstack/react-query";
import { apiList, getClient } from "@/utils/apiServices";

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const { data } = await client(apiList.latestAudios);
  return data.audios;
};

export const useFetchLatestAudios = () => {
  return useQuery({
    queryKey: ["latest-uploads"],
    queryFn: () => fetchLatest(),
  });
};

const fetchRecommended = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const { data } = await client(apiList.getRecommendByProfile);
  return data.audios;
};

export const useFetchRecommendedAudios = () => {
  return useQuery({
    queryKey: ["recommended"],
    queryFn: () => fetchRecommended(),
  });
};

const fetchPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const { data } = await client(apiList.getPlaylistByProfile);
  return data.playlist;
};

export const useFetchPlaylist = () => {
  return useQuery({
    queryKey: ["playlist"],
    queryFn: () => fetchPlaylist(),
  });
};

const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const { data } = await client(apiList.getUploads);
  return data.audios;
};

export const useFetchUploadsByProfile = () => {
  return useQuery({
    queryKey: ["uploads-by-profile"],
    queryFn: () => fetchUploadsByProfile(),
  });
};

const fetchFavorites = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const { data } = await client(apiList.getFavorites);
  return data.audios;
};

export const useFetchFavorite = () => {
  return useQuery({
    queryKey: ["favorite"],
    queryFn: () => fetchFavorites(),
  });
};
