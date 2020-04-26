import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import deploymentReducer from "./reducers/deploymentReducer";

const reducers = {
  deployment: deploymentReducer,
};

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

export default store;
