// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import isEmpty from "../../utils/is-empty";
import updateObject from "../../utils/updateObject";

const initialState = {
  loading: false,
  authenticated: false,
  user: {},
};

// Sets loading state
const authLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

// Unsets loading state
const unsetAuthLoading = (state, action) => {
  return updateObject(state, { loading: false });
};

// Shows if user is authenticated and assigns data from JWT
const setCurrentUser = (state, action) => {
  return updateObject(state, {
    authenticated: !isEmpty(action.payload),
    user: action.payload,
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_AUTH_LOAD:
      return authLoading(state, action);
    case actionTypes.UNSET_AUTH_LOAD:
      return unsetAuthLoading(state, action);
    case actionTypes.SET_CURRENT_USER:
      return setCurrentUser(state, action);
    default:
      return state;
  }
}
