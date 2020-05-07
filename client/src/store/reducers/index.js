// Redux
import { combineReducers } from "redux";

// Reducers
import authReducer from "./authReducer";
import errorReducer from './errorReducer';
import tourReducer from './tourReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer, 
  tours: tourReducer
});
