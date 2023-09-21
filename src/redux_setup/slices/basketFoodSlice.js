import { createSlice } from "@reduxjs/toolkit"; //importing create slice

// define initialState

const initialState = {
  basketFood: [],
};

// function to export
const basketFoodSlice = createSlice({
  name: "basketFood",
  initialState,
  reducers: {
    updateBasketFood: (state, action) => {
      state.basketFood = action.payload;
    },
  },
});

export const { updateBasketFood } = basketFoodSlice.actions;

// selectors
export const selectBasketFood = (state) => state.basketFood.basketFood;

export default basketFoodSlice.reducer;
