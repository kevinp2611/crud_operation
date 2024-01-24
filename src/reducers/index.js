import { userReducer } from "./user.reducer";
import { combineReducers } from "redux";

const allreducers = combineReducers({
  userData: userReducer,
});

export default allreducers;