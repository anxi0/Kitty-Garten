import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import catsReducer from "./Slices/catSlice";
import { HYDRATE } from "next-redux-wrapper";

const reducer: Reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    catsReducer,
  })(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof reducer>;
