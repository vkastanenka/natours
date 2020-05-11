// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const initialState = {
  checkoutSession: '',
  loading: false
};

const setBookingLoad = (state, action) => {
  return updateObject(state, { loading: true });
} 

const unsetBookingLoad = (state, action) => {
  return updateObject(state, { loading: false });
} 

const setCheckoutSessionId = (state, action) => {
  return updateObject(state, {
    checkoutSession: action.payload,
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_BOOKING_LOAD:
      return setBookingLoad(state, action);
    case actionTypes.UNSET_BOOKING_LOAD:
      return unsetBookingLoad(state, action);
    case actionTypes.SET_CHECKOUT_SESSION_ID:
      return setCheckoutSessionId(state, action);
    default:
      return state;
  }
}
