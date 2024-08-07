import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  userId: "",
  show: false,
};

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    showStory: (state, action) => {
      state.type = action.payload.type;
      state.userId = action.payload.userId;
      state.show = action.payload.show;
    },
    hideStory: (state) => {
      state.type = "";
      state.userId = "";
      state.show = false;
    },
  },
});

export const { showStory, hideStory } = storySlice.actions;
export default storySlice.reducer;
