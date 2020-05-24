// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";
import reviewReducer from "./reviewReducer";

const initialState = {
  checkoutSession: null,
  userBookings: null,
  loading: false,
};

const setBookingLoad = (state, action) => {
  return updateObject(state, { loading: true });
};

const unsetBookingLoad = (state, action) => {
  return updateObject(state, { loading: false });
};

const setCheckoutSession = (state, action) => {
  return updateObject(state, {
    checkoutSession: action.payload,
  });
};

const setUserBookings = (state, action) => {
  return updateObject(state, {
    userBookings: action.payload,
    loading: false,
  });
};

const deleteUserBooking = (state, action) => {
  const userBookings = [...state.userBookings];
  // eslint-disable-next-line
  const filteredBookings = userBookings.filter((booking) => {
    if (booking._id !== action.payload) return reviewReducer;
  });
  return updateObject(state, {
    loading: false,
    userBookings: filteredBookings,
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_BOOKING_LOAD:
      return setBookingLoad(state, action);
    case actionTypes.UNSET_BOOKING_LOAD:
      return unsetBookingLoad(state, action);
    case actionTypes.SET_CHECKOUT_SESSION:
      return setCheckoutSession(state, action);
    case actionTypes.SET_CURRENT_USER_BOOKINGS:
      return setUserBookings(state, action);
    case actionTypes.DELETE_CURRENT_USER_BOOKING:
      return deleteUserBooking(state, action);
    default:
      return state;
  }
}
