// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import actionDispatch from "../../utils/actionDispatch";

// Sets loading state for booking requests
export const setBookingLoad = () => {
  return {
    type: actionTypes.SET_BOOKING_LOAD,
  };
};

// Unsets loading state for booking requests
export const unsetBookingLoad = () => {
  return {
    type: actionTypes.UNSET_BOOKING_LOAD,
  };
};

// @route   GET api/v1/bookings/checkout-session/:tourId
// @desc    Creates checkout section to book a tour
// @access  Protected
export const createCheckoutSession = (tourId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bookings/checkout-session/${tourId}`);
    return res.data.session.id;
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

export const createBookingCheckout = (bookingData) => async (dispatch) => {
  try {
    dispatch(setBookingLoad());
    await axios.post("/api/v1/bookings", bookingData);
    dispatch(unsetBookingLoad());
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};
