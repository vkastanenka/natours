// Redux
import { combineReducers } from "redux";

// Reducers
import authReducer from "./authReducer";
import errorReducer from './errorReducer';
import tourReducer from './tourReducer';
import reviewReducer from './reviewReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer, 
  tours: tourReducer,
  reviews: reviewReducer
});
