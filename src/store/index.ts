import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./features/loadingSlice";
import toastSlice from "./features/toastSlice";
import storySlice from "./features/storySlice";
import storyUploaderSlice from "./features/storyUploaderSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    toast: toastSlice,
    story: storySlice,
    storyUploader: storyUploaderSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
