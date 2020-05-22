// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const initialState = {
  loading: false,
  guides: null,
  users: null,
};

// Sets loading state
const userLoad = (state, action) => {
  return updateObject(state, { loading: true });
};

// Unsets loading state
const unsetUserLoad = (state, action) => {
  return updateObject(state, { loading: false });
};

// ALl guides added to state
const getGuides = (state, action) => {
  return updateObject(state, {
    guides: action.payload,
    loading: false,
  });
};

// All users added to state
const getUsers = (state, action) => {
  return updateObject(state, {
    users: action.payload,
    loading: false,
  });
};

// Delete user from state
const deleteUser = (state, action) => {
  const users = [...state.users];
  // eslint-disable-next-line
  const filteredUsers = users.filter((user) => {
    if (user._id !== action.payload) return user;
  });
  return updateObject(state, {
    loading: false,
    userReviews: filteredUsers,
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER_LOAD:
      return userLoad(state, action);
    case actionTypes.UNSET_USER_LOAD:
      return unsetUserLoad(state, action);
    case actionTypes.GET_GUIDES:
      return getGuides(state, action);
    case actionTypes.GET_USERS:
      return getUsers(state, action);
    case actionTypes.DELETE_USER:
      return deleteUser(state, action);
    default:
      return state;
  }
}
