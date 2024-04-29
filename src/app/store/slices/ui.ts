import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isDesktopOpen: boolean;
}

const initialState: UIState = {
  isDesktopOpen: true
};

export const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleShow: (state: UIState) => {
      state.isDesktopOpen = !state.isDesktopOpen;
    }
  }
});

export const { toggleShow } = UISlice.actions;

export default UISlice.reducer;
