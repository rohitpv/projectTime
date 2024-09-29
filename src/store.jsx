import { configureStore } from "@reduxjs/toolkit";
import ProjectTimeReducer from "./slices/ProjectTimeSlice";

export default configureStore({
  reducer: ProjectTimeReducer,
});
