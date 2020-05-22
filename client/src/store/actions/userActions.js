// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import actionDispatch from "../../utils/actionDispatch";

// Sets loading state for booking requests
export const setUserLoad = () => {
  return {
    type: actionTypes.SET_USER_LOAD,
  };
};

// Unsets loading state for booking requests
export const unsetUserLoad = () => {
  return {
    type: actionTypes.UNSET_USER_LOAD,
  };
};

/////////////////
// Public Routes

// @route   POST api/v1/users/sendContactEmail
// @desc    Sends admin email from contact form on home page
// @access  Public
export const sendContactEmail = (data) => async (dispatch) => {
  dispatch(setUserLoad());
  try {
    await axios.post("/api/v1/users/sendContactEmail", data);
    dispatch(unsetUserLoad());
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
    dispatch(unsetUserLoad());
  }
};

////////////////////
// Restricted Routes

// @route   GET api/v1/users
// @desc    Get all users
// @access  Restricted
export const getUsers = () => async (dispatch) => {
  dispatch(setUserLoad());
  try {
    const res = await axios.get("/api/v1/users/");
    actionDispatch(actionTypes.GET_USERS, res.data.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   DELETE api/v1/users/:id
// @desc    Delete user, their reviews, and their bookings by id
// @access  Restricted
export const deleteUser = (userId) => async (dispatch) => {
  dispatch(setUserLoad());
  try {
    await axios.delete(`/api/v1/users/${userId}`);
    actionDispatch(actionTypes.DELETE_USER, userId, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   GET api/v1/users/guides
// @desc    Get all guides and lead guides
// @access  Restricted
export const getGuides = () => async (dispatch) => {
  dispatch(setUserLoad());
  try {
    const res = await axios.get("/api/v1/users/users/guides");
    actionDispatch(actionTypes.GET_GUIDES, res.data.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};
