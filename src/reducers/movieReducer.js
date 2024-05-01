import constants from '../constants/actionTypes';
const initialState = {
  movies: [],
  selectedMovie: null
};

const movieReducer = (state = initialState, action) => {
  let updated = { ...state };
  //handle different action types
  switch (action.type) {
    case constants.FETCH_MOVIES:
      updated.movies = action.movies;
      updated.selectedMovie = action.movies[0];
      return updated;
    case constants.SET_MOVIE:
    case constants.FETCH_MOVIE:
      updated.selectedMovie = action.selectedMovie;
      return updated;
    case constants.ADD_REVIEW:
      if (updated.selectedMovie && updated.selectedMovie._id === action.movieId) {
        updated.selectedMovie = {
          ...updated.selectedMovie,
          movie_reviews: [...updated.selectedMovie.movie_reviews, action.review]
        };
      }
      return updated; //return updated state
    default:
      return state; //return the current state if action type doesn't match
  }
};

export default movieReducer;