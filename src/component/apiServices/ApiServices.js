import axios from 'axios';

export const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';

const API_KEY = '54ed8b21fd2d7a380faaa388189b382f';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMoviesData = async () => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=man&page=1&include_adult=false`,
  );
  return response.data.results;
};

export const getTvShowData = async () => {
  const response = await axios.get(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=man&page=1&include_adult=false`,
  );
  return response.data.results;
};

export const getMovieDetails = async id => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
  );
  return response.data;
};

export const getMovieVideoDetails = async id => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`,
  );
  return response.data.results;
};

export const getTvShowDetails = async id => {
  const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const getTvShowVideoDetails = async id => {
  const response = await axios.get(
    `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`,
  );
  return response.data.results;
};

export const getTvShowSeasonDetails = async (id, number) => {
  const response = await axios.get(
    `${BASE_URL}/tv/${id}/season/${number}api_key=${API_KEY}`,
  );
  return response.data;
};

export const getTvShowWithQuery = async data => {
  const response = await axios.get(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${data}`,
  );
  return response.data.results;
};

export const getMovieQuery = async data => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${data}`,
  );
  return response.data.results;
};

export const getTvShowEpisodeDetails = async id => {
  const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  return response.data;
};
