import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getMovieDetails,
  getMovieQuery,
  getMovieVideoDetails,
  getMoviesData,
  getTvShowData,
  getTvShowDetails,
  getTvShowEpisodeDetails,
  getTvShowVideoDetails,
  getTvShowWithQuery,
} from '../component/apiServices/ApiServices';

export const getmovies = createAsyncThunk('getMovie', async data => {
  try {
    if (data.search) {
      if (!!data.isMovies) {
        return await getMovieQuery(data.searchText);
      } else {
        return await getTvShowWithQuery(data.searchText);
      }
    } else {
      if (!!data.isMovies) {
        return await getMoviesData();
      } else {
        return await getTvShowData();
      }
    }
  } catch (error) {
    return error || 'Error calling Api Data';
  }
});

export const getMoviesDetail = createAsyncThunk(
  'getMoviesDetail',
  async data => {
    try {
      if (!!data.isMovies) {
        return await getMovieDetails(data.id);
      } else {
        return await getTvShowDetails(data.id);
      }
    } catch (error) {
      return error;
    }
  },
);

export const getMoviesVideos = createAsyncThunk(
  'getMoviesVideos',
  async data => {
    try {
      if (!!data.isMovies) {
        return await getMovieVideoDetails(data.id);
      } else {
        return await getTvShowVideoDetails(data.id);
      }
    } catch (error) {
      return error || 'Error calling Api Data';
    }
  },
);

export const getTvShowByQuery = createAsyncThunk(
  'getTvShowByQuery',
  async data => {
    try {
      if (data.search) {
        if (!!data.isMovie) {
          return await getMovieQuery(data.searchText);
        } else {
          return await getTvShowWithQuery(data.searchText);
        }
      } else {
        if (!!data.isMovie) {
          return await getMoviesData();
        } else {
          return await getTvShowData();
        }
      }
    } catch (error) {
      return error || 'Error calling Api Data';
    }
  },
);

export const getTvShowEpisode = createAsyncThunk(
  'getTvShowEpisode',
  async id => {
    try {
      return await getTvShowEpisodeDetails(id);
    } catch (error) {
      return error || 'Error calling Api Data';
    }
  },
);

const initialState = {
  movies: [],
  selectedMovies: [],
  selectedTvShow: [],
  trackedMovie: [],
  videos: [],
  tvShowEpisodes: null,
  movieDetail: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

const discoverSlice = createSlice({
  name: 'discover',
  initialState: initialState,
  reducers: {
    reset(state, action) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
    addMovie(state, action) {
      const {id, backdrop_path, poster_path, release_date, title, genre_ids} =
        action.payload;
      const movieAlreadyAdded = state.selectedMovies.findIndex(
        item => item.id === id,
      );
      if (movieAlreadyAdded === -1) {
        state.selectedMovies.push({
          id,
          backdrop_path,
          poster_path,
          release_date,
          title,
          genre_ids,
        });
      }
    },
    addTvShow(state, action) {
      const {id, poster_path, backdrop_path, first_air_date, name, genre_ids} =
        action.payload;
      const movieAlreadyAdded = state.selectedTvShow.findIndex(
        item => item.id === id,
      );
      if (movieAlreadyAdded === -1) {
        state.selectedTvShow.push({
          id,
          poster_path,
          first_air_date,
          name,
          genre_ids,
          backdrop_path,
        });
      }
    },
    addTrackedMovie(state, action) {
      const {id, poster_path, backdrop_path, title, selected, planName, note} =
        action.payload;
      const movieAlreadyAdded = state.trackedMovie.find(item => item.id === id);
      if (!movieAlreadyAdded) {
        state.trackedMovie.push({
          id,
          poster_path,
          title,
          selected,
          planName,
          note,
          backdrop_path,
        });
      }
    },
    removeSelectedMovies(state, action) {
      const movieIdToRemove = action.payload;
      state.selectedMovies = state.selectedMovies.filter(
        item => item.id !== movieIdToRemove,
      );
    },
    removeSelectedTvShow(state, action) {
      const movieIdToRemove = action.payload;
      state.selectedTvShow = state.selectedTvShow.filter(
        item => item.id !== movieIdToRemove,
      );
    },
    removeTrackedMovies(state, action) {
      const movieIdToRemove = action.payload;
      state.trackedMovie = state.trackedMovie.filter(
        item => item.id !== movieIdToRemove,
      );
    },
    resetVideos(state) {
      state.videos = [];
    },
    addTvSeasonEpisode(state, action) {
      const {id, index, selectedSeason} = action.payload;
      const seasonIndex = state.selectedTvShow.findIndex(
        item => item.id === id,
      );

      if (seasonIndex !== -1) {
        const existingSeasons = state.selectedTvShow[seasonIndex].season || [];
        const existingSeasonIndex = existingSeasons.findIndex(
          season => season.number === selectedSeason,
        );

        if (existingSeasonIndex !== -1) {
          const existingSeason = existingSeasons[existingSeasonIndex];
          const existingEpisodes = existingSeason.episodes || [];
          const updatedEpisodes = [...existingEpisodes];

          const episodeIndex = updatedEpisodes.indexOf(index);
          if (episodeIndex !== -1) {
            updatedEpisodes.splice(episodeIndex, 1); // Remove existing episode
          } else {
            updatedEpisodes.push(index); // Add the new episode
          }

          existingSeasons[existingSeasonIndex] = {
            ...existingSeason,
            episodes: updatedEpisodes,
          };
        } else {
          existingSeasons.push({
            number: selectedSeason,
            episodes: [index],
          });
        }

        state.selectedTvShow[seasonIndex] = {
          ...state.selectedTvShow[seasonIndex],
          season: existingSeasons,
        };
      } else {
        state.selectedTvShow.push({
          id,
          season: [{number: selectedSeason, episodes: [index]}],
        });
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getmovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getmovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getmovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getMoviesDetail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMoviesDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movieDetail = action.payload;
      })
      .addCase(getMoviesDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getMoviesVideos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMoviesVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.videos = action.payload;
      })
      .addCase(getMoviesVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getTvShowByQuery.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTvShowByQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.videos = action.payload;
      })
      .addCase(getTvShowByQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getTvShowEpisode.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTvShowEpisode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tvShowEpisodes = action.payload;
      })
      .addCase(getTvShowEpisode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const discoverSliceAction = discoverSlice.actions;

export default discoverSlice.reducer;
