import { configureStore } from "@reduxjs/toolkit";
import { eventReducer } from "./reducers/eventReducer";
import { userReducer } from "./reducers/userReducer";
import { User, Credentials } from "../types/user";

let preUser: { currentUser: User | undefined } = { currentUser: undefined };
const getUser = localStorage.getItem("user");
if (!!getUser) {
  preUser = JSON.parse(getUser);
}
const preloadedState = {
  userReducer: preUser,
};

const saveState = (state: RootState) => {
  try {
    const userReducer = JSON.stringify(state.userReducer);
    localStorage.setItem("user", userReducer);
  } catch (error: any) {
    return error.message;
  }
};

export const store = configureStore({
  reducer: {
    eventReducer,
    userReducer,
  },
  // preloadedState: preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
