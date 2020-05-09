// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const initialState = {
  loading: false,
  allReviews: null,
  userReviews: null,
};

// To display spinner during request
const reviewLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

// Get request to add array of tour objects to global state
const getCurrentUserReviews = (state, action) => {
  return updateObject(state, {
    loading: false,
    userReviews: action.payload,
  });
};

// Update User Reviews in the State
const updateCurrentUserReview = (state, action) => {
  const userReviews = [...state.userReviews];
  const updatedReviews = userReviews.map((review) => {
    if (review._id === action.payload._id) return action.payload;
    return review;
  });
  return updateObject(state, {
    loading: false,
    userReviews: updatedReviews,
  });
};

// Delete a User Review from the State
const deleteCurrentUserReview = (state, action) => {
  const userReviews = [...state.userReviews];
  const filteredReviews = userReviews.filter((review) => {
    if (review._id !== action.payload) return review;
  });
  return updateObject(state, {
    loading: false,
    userReviews: filteredReviews,
  });
};

// Get request to add singular tour object to global state
// const getAllReviews = (state, action) => {
//   return updateObject(state, {
//     allReviews: action.payload,
//     loading: false,
//   });
// };

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return reviewLoading(state, action);
    case actionTypes.GET_CURRENT_USER_REVIEWS:
      return getCurrentUserReviews(state, action);
    case actionTypes.UPDATE_CURRENT_USER_REVIEW:
      return updateCurrentUserReview(state, action);
    case actionTypes.DELETE_CURRENT_USER_REVIEW:
      return deleteCurrentUserReview(state, action);
    // case actionTypes.GET_TOUR:
    //   return getTour(state, action);
    default:
      return state;
  }
}
