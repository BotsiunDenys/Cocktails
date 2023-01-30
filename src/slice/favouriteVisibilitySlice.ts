import { createSlice } from "@reduxjs/toolkit";

interface favouriteVisibilityState {
  visibility: boolean;
}

const initialVisibilityState: favouriteVisibilityState = {
  visibility: false,
};

const favouriteVisibilitySlice = createSlice({
  name: "favouriteVisibility",
  initialState: initialVisibilityState,
  reducers: {
    toggleOverlay: (state) => {
      state.visibility = !state.visibility;
    },
  },
});

export default favouriteVisibilitySlice.reducer;
export const { toggleOverlay } = favouriteVisibilitySlice.actions;
