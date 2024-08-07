import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showToast: false,
  message: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.showToast = true;
      state.message = action.payload;
    },
    hideToast: (state) => {
      state.showToast = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
