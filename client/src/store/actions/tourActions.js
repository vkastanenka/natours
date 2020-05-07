// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import actionDispatch from "../../utils/actionDispatch";

// Set load for asynchronous requests
export const setTourLoading = () => {
  return {
    type: actionTypes.TOUR_LOADING,
  };
};

//////////////////////
// Unprotected Routes

// @route   GET api/v1/tours
// @desc    Get all tours
// @access  Public
export const getTours = () => async (dispatch) => {
  dispatch(setTourLoading());
  try {
    const res = await axios.get("/api/v1/tours");
    actionDispatch(actionTypes.GET_TOURS, res.data.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};