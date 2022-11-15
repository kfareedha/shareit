import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import verifyReducer from "./verifyReducer";
export const reducers = combineReducers({
  authReducer,
  postReducer,
});
