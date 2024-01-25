import { userReducer } from "./user.reducer";
import { combineReducers } from "redux";

const allreducers = combineReducers({
  users: userReducer,
});

export default allreducers;