// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import actionDispatch from "../../utils/actionDispatch";

// Actions
import { setRequestLoading } from "./utilActions";

///////////////////
// Protected Routes

// @route   GET api/v1/reviews/:userId
// @desc    Get reviews of user by id
// @access  Protected
export const getUserReviews = (userId) => async (dispatch) => {
  dispatch(setRequestLoading());
  try {
    const res = await axios.get(`/api/v1/reviews/${userId}`);
    actionDispatch(
      actionTypes.GET_CURRENT_USER_REVIEWS,
      res.data.data,
      dispatch
    );
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

export const getAllReviews = () => async (dispatch) => {
  dispatch(setRequestLoading());
  try {
    const res = await axios.get("/api/v1/reviews");
    actionDispatch(actionTypes.GET_REVIEWS, res.data.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   PATCH api/v1/reviews/review/:id
// @desc    Update review by id
// @access  Restricted
export const updateUserReview = (reviewId, reviewData) => async (dispatch) => {
  dispatch(setRequestLoading());
  try {
    const res = await axios.patch(
      `/api/v1/reviews/review/${reviewId}`,
      reviewData
    );
    actionDispatch(
      actionTypes.UPDATE_CURRENT_USER_REVIEW,
      res.data.data,
      dispatch
    );
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   DELETE api/v1/reviews/review/:id
// @desc    Delete review by id
// @access  Restricted
export const deleteCurrentUserReview = (reviewId) => async (dispatch) => {
  dispatch(setRequestLoading());
  try {
    await axios.delete(`/api/v1/reviews/review/${reviewId}`);
    actionDispatch(actionTypes.DELETE_CURRENT_USER_REVIEW, reviewId, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  dispatch(setRequestLoading());
  try {
    await axios.delete(`/api/v1/reviews/review/${reviewId}`);
    actionDispatch(actionTypes.DELETE_REVIEW, reviewId, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

////////////////////
// Restricted Routes

// @route   POST api/v1/reviews
// @desc    Allows user to create a review
// @access  Restricted
export const postReview = (reviewData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/reviews", reviewData);
    actionDispatch(actionTypes.GET_TOUR, res.data.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};
