import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

export const storyUploaderSlice = createSlice({
  name: "storyUploader",
  initialState,
  reducers: {
    showStoryUploader: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { showStoryUploader } = storyUploaderSlice.actions;
export default storyUploaderSlice.reducer;
