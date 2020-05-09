// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const initialState = {
  tour: null,
  tours: null,
  loading: false,
};

// To display spinner during request
const tourLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

// Get request to add array of tour objects to global state
const getTours = (state, action) => {
  return updateObject(state, {
    tours: action.payload,
    loading: false,
  });
};

// Get request to add singular tour object to global state
const getTour = (state, action) => {
  return updateObject(state, {
    tour: action.payload,
    loading: false,
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return tourLoading(state, action);
    case actionTypes.GET_TOURS:
      return getTours(state, action);
    case actionTypes.GET_TOUR:
      return getTour(state, action);
    default:
      return state;
  }
}
