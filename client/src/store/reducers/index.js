// Redux
import { combineReducers } from "redux";

// Reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import tourReducer from "./tourReducer";
import reviewReducer from "./reviewReducer";
import bookingReducer from "./bookingReducer";
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  tours: tourReducer,
  reviews: reviewReducer,
  bookings: bookingReducer,
  users: userReducer
});
