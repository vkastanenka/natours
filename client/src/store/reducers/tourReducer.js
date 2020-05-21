// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const initialState = {
  loading: false,
  tour: null,
  tours: null,
};

// To display spinner during request
const setTourLoad = (state, action) => {
  return updateObject(state, { loading: true });
};

// To display spinner during request
const unsetTourLoad = (state, action) => {
  return updateObject(state, { loading: false });
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

// Add a new tour to tours object in state
const addTour = (state, action) => {
  const toursCopy = [...state.tours];
  toursCopy.push(action.payload);
  return updateObject(state, {
    tours: toursCopy,
    loading: false,
  });
};

// Update Tours in the State
const updateTour = (state, action) => {
  const tours = [...state.tours];
  const updatedTours = tours.map((tour) => {
    if (tour._id === action.payload._id) return action.payload;
    return tour;
  });
  return updateObject(state, {
    tours: updatedTours,
  });
};

// Delete a Tour from the State
const deleteTour = (state, action) => {
  const tours = [...state.tours];
  // eslint-disable-next-line
  const filteredTours = tours.filter((tour) => {
    if (tour._id !== action.payload) return tour;
  });
  return updateObject(state, {
    tours: filteredTours,
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TOUR_LOAD:
      return setTourLoad(state, action);
    case actionTypes.UNSET_TOUR_LOAD:
      return unsetTourLoad(state, action);
    case actionTypes.GET_TOURS:
      return getTours(state, action);
    case actionTypes.GET_TOUR:
      return getTour(state, action);
    case actionTypes.ADD_TOUR:
      return addTour(state, action);
    case actionTypes.UPDATE_TOUR:
      return updateTour(state, action);
    case actionTypes.DELETE_TOUR:
      return deleteTour(state, action);
    default:
      return state;
  }
}
