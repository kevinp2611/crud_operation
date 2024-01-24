import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import {thunk} from "redux-thunk";
import allreducers from "../reducers";
const loggerMiddleware = createLogger();

const store = createStore(
    allreducers,
  composeWithDevTools(applyMiddleware(thunk, loggerMiddleware))
);
export default store;