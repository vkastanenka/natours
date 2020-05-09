// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import actionDispatch from "../../utils/actionDispatch";

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
