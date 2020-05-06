// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import isEmpty from "../../utils/is-empty";
import updateObject from "../../utils/updateObject";

const initialState = {
  authenticated: false,
  user: {},
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
    case actionTypes.SET_CURRENT_USER:
      return setCurrentUser(state, action);
    default:
      return state;
  }
}