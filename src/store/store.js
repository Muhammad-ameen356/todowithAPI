import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./Reducers/counterReducer";
import todoSlice from "./Reducers/todoReducer";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    todo: todoSlice,
  }, //add reducers here
});

export default store;
