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

export const getGuides = () => async (dispatch) => {
  dispatch(setUserLoad());
  try {
    const res = await axios.get("/api/v1/users/users/guides");
    actionDispatch(actionTypes.GET_GUIDES, res.data.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch(setUserLoad());
  try {
    const res = await axios.get("/api/v1/users/");
    actionDispatch(actionTypes.GET_USERS, res.data.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};
