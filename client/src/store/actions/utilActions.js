// Action Types
import * as actionTypes from "./actionTypes";

// Set load for asynchronous requests
export const setRequestLoading = () => {
  return {
    type: actionTypes.REQUEST_LOADING,
  };
};