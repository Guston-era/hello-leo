import { createSlice } from "@reduxjs/toolkit"; //importing create slice

// define initialState

const initialState = {
  menu: true,
};

// function to export
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;

// selectors
export const selectMenu = (state) => state.menu.menu;

export default menuSlice.reducer;
