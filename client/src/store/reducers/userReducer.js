// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const initialState = {
  loading: false,
  guides: null,
  users: null
}

const userLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

const getGuides = (state, action) => {
  return updateObject(state, {
    guides: action.payload,
    loading: false
  })
}

const getUsers = (state, action) => {
  return updateObject(state, {
    users: action.payload,
    loading: false
  })
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER_LOAD:
      return userLoading(state, action);
    case actionTypes.GET_GUIDES:
      return getGuides(state, action);
    case actionTypes.GET_USERS:
      return getUsers(state, action);
    default:
      return state;
  }
}