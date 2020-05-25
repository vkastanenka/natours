// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import actionDispatch from "../../utils/actionDispatch";

// Sets loading state
export const setTourLoad = () => {
  return {
    type: actionTypes.SET_TOUR_LOAD,
  };
};

// Unsets loading state
export const unsetTourLoad = () => {
  return {
    type: actionTypes.UNSET_TOUR_LOAD,
  };
};

//////////////////////
// Unprotected Routes

// @route   GET api/v1/tours
// @desc    Get all tours
// @access  Public
export const getTours = () => async (dispatch) => {
  dispatch(setTourLoad());
  try {
    const res = await axios.get("/api/v1/tours");
    actionDispatch(actionTypes.GET_TOURS, res.data.data, dispatch);
  } catch (err) {
    dispatch(unsetTourLoad());
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   GET api/v1/tours/tour/:slug
// @desc    Get tour by slug
// @access  Public
export const getTour = (slug) => async (dispatch) => {
  dispatch(setTourLoad());
  try {
    const res = await axios.get(`/api/v1/tours/tour/${slug}`);
    actionDispatch(actionTypes.GET_TOUR, res.data.data, dispatch);
  } catch (err) {
    dispatch(unsetTourLoad());
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

////////////////////
// Restricted Routes

// @route   POST api/v1/tours
// @desc    Create new tour
// @access  Restricted
export const createTour = (data) => async (dispatch) => {
  dispatch(setTourLoad());
  try {
    const res = await axios.post("/api/v1/tours", data);
    actionDispatch(actionTypes.ADD_TOUR, res.data.data, dispatch);
    dispatch(unsetTourLoad());
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
    dispatch(unsetTourLoad());
  }
};

// @route   PATCH api/v1/tours/:id
// @desc    Update tour by id
// @access  Restricted
export const updateTour = (tourId, data) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/v1/tours/${tourId}`, data);
    actionDispatch(actionTypes.UPDATE_TOUR, res.data.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   DELETE api/v1/tours/:id
// @desc    Delete tour by id
// @access  Restricted
export const deleteTour = (tourId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/tours/${tourId}`);
    actionDispatch(actionTypes.DELETE_TOUR, tourId, dispatch);
  } catch (err) {
    dispatch(unsetTourLoad());
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};
