import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/dataSlice";

export const store = configureStore({
  reducer: {
    chatData: dataSlice,
  },
});
