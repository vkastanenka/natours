// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import decodeToken from '../../utils/decodeToken';
import setAuthToken from '../../utils/setAuthToken';
import actionDispatch from "../../utils/actionDispatch";

// Sets a logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: decoded,
  };
};

//////////////////////
// Unprotected Routes

// @route   POST api/v1/users/register
// @desc    Register user
// @access  Public
export const register = (userData) => async (dispatch) => {
  try {
    await axios.post("/api/v1/users/register", userData);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err, dispatch);
  }
};

// @route   GET api/v1/users/login
// @desc    Login User / JWT Response => Sets LS and auth headers
// @access  Public
export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/users/login", userData);
    const decoded = decodeToken(res.data.token);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err, dispatch);
  }
};

// Logout user => Removes JWT from LS and auth headers
export const logout = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// @route   POST api/v1/users/sendPasswordResetToken
// @desc    Send email with a password reset token
// @access  Public
export const sendPasswordResetToken = (email) => async (dispatch) => {
  try {
    await axios.post("/api/v1/users/sendPasswordResetToken", email);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err, dispatch);
  }
};

// @route   PATCH api/v1/users/resetPassword/:resetToken
// @desc    Resets user password with token from email
// @access  Public
export const resetPassword = (passwordData, token) => async (
  dispatch
) => {
  try {
    await axios.patch(`/api/v1/users/resetPassword/${token}`, passwordData);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err, dispatch);
  }
};

////////////////////
// Protected Routes

// @route   PATCH api/v1/users/updatePassword
// @desc    Update current user's password
// @access  Private
export const updatePassword = (passwordData) => async (dispatch) => {
  try {
    await axios.patch("/api/v1/users/updatePassword", passwordData);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err, dispatch);
  }
};