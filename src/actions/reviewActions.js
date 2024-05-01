export const ADD_REVIEW = 'ADD_REVIEW';
export function addReview(movieId, reviewData) {
  return {
    type: ADD_REVIEW,
    movieId: movieId,
    review: reviewData
  };
}