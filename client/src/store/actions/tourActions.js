// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import actionDispatch from "../../utils/actionDispatch";

// Actions
import { setRequestLoading } from './utilActions';

//////////////////////
// Unprotected Routes

// @route   GET api/v1/tours
// @desc    Get all tours
// @access  Public
export const getTours = () => async (dispatch) => {
  dispatch(setRequestLoading());
  try {
    const res = await axios.get("/api/v1/tours");
    actionDispatch(actionTypes.GET_TOURS, res.data.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   GET api/v1/tours/tour/:slug
// @desc    Get tour by slug
// @access  Public
export const getTour = (slug) => async (dispatch) => {
  dispatch(setRequestLoading());
  try {
    const res = await axios.get(`/api/v1/tours/tour/${slug}`);
    actionDispatch(actionTypes.GET_TOUR, res.data.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};