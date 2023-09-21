import { createSlice } from '@reduxjs/toolkit' //importing create slice
// import {
//   defaultfamilyHistoryData,
//   defaultLabData,
//   defaultLifeStyleReviewData,
//   defaultSummaryData,
//   defaultUnderlyingConditions,
//   defaultVitalsData,
// } from '../../constants/hypertension_data'
import { ReduxActions } from '../../constants/redux_actions'

// define initialState

const initialState = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snacks: [],
  summary: { calories: 0, sodium: 0, fats: 0 },
}

// function to export
const nutritionBasketSlice = createSlice({
  name: "nutritionBasket",
  initialState,
  reducers: {
    populateBreakfast: (state, action) => {
      const foods = [...state.breakfast];
      const { item, action_type } = action.payload;
      const foodIndex = foods.findIndex((i) => i.title === item.title);

      switch (action_type) {
        case ReduxActions.add_to_cart:
          //check in main array if item exist

          if (foodIndex > -1) {
            state.breakfast[foodIndex]["count"]++;
          } else {
            //push to array

            item["count"] = 1;
            state.breakfast.push(item);
          }

          break;
        case ReduxActions.decrement_from_cart:
          if (foodIndex > -1) {
            const count = state.breakfast[foodIndex].count;
            if (count > 1) {
              state.breakfast[foodIndex].count--;
            } else if (count <= 1) {
              // state.breakfast.splice(foodIndex, 1)
              state.breakfast[foodIndex].count = 0;
            }
          }

          break;

        default:
          break;
      }

      // state.labs = action.payload
    },
    destroyBreakfast: (state) => {
      state.breakfast = [];
    },
    populateLunch: (state, action) => {
      const foods = [...state.lunch];
      const { item, action_type } = action.payload;
      const foodIndex = foods.findIndex((i) => i.title === item.title);

      switch (action_type) {
        case ReduxActions.add_to_cart:
          //check in main array if item exist

          if (foodIndex > -1) {
            state.lunch[foodIndex]["count"]++;
          } else {
            //push to array

            item["count"] = 1;
            state.lunch.push(item);
          }

          break;
        case ReduxActions.decrement_from_cart:
          if (foodIndex > -1) {
            const count = state.lunch[foodIndex].count;
            if (count > 1) {
              state.lunch[foodIndex].count--;
            } else if (count <= 1) {
              // state.lunch.splice(foodIndex, 1)
              state.lunch[foodIndex].count = 0;
            }
          }

          break;

        default:
          break;
      }

      // state.labs = action.payload
    },
    populateDinner: (state, action) => {
      const foods = [...state.dinner];
      const { item, action_type } = action.payload;
      const foodIndex = foods.findIndex((i) => i.title === item.title);

      switch (action_type) {
        case ReduxActions.add_to_cart:
          //check in main array if item exist

          if (foodIndex > -1) {
            state.dinner[foodIndex]["count"]++;
          } else {
            //push to array

            item["count"] = 1;
            state.dinner.push(item);
          }

          break;
        case ReduxActions.decrement_from_cart:
          if (foodIndex > -1) {
            const count = state.dinner[foodIndex].count;
            if (count > 1) {
              state.dinner[foodIndex].count--;
            } else if (count <= 1) {
              // state.dinner.splice(foodIndex, 1)
              state.dinner[foodIndex].count = 0;
            }
          }

          break;

        default:
          break;
      }

      // state.labs = action.payload
    },
    populateSnacks: (state, action) => {
      const foods = [...state.snacks];
      const { item, action_type } = action.payload;
      const foodIndex = foods.findIndex((i) => i.title === item.title);

      switch (action_type) {
        case ReduxActions.add_to_cart:
          //check in main array if item exist

          if (foodIndex > -1) {
            state.snacks[foodIndex]["count"]++;
            console.log("updated count:", state.snacks[foodIndex]["count"]);
          } else {
            //push to array
            item["count"] = 1;
            state.snacks.push(item);
          }

          break;
        case ReduxActions.decrement_from_cart:
          if (foodIndex > -1) {
            const count = state.snacks[foodIndex].count;
            if (count > 1) {
              state.snacks[foodIndex].count--;
            } else if (count <= 1) {
              // state.snacks.splice(foodIndex, 1)
              state.snacks[foodIndex].count = 0;
            }
          }

          break;

        default:
          break;
      }

      // state.labs = action.payload
    },
    updateSummary: (state, action) => {
      state.summary = action.payload;
    },
    removeBreakfastFoodItem: (state, action) => {
      const { selectedFoods } = action.payload;
      const { removedFood } = action.payload;
      const breakfastFoods = selectedFoods.filter(
        (food) => food.title !== removedFood
      );
      state.breakfast = breakfastFoods;
    },
    removeLunchFoodItem: (state, action) => {
      const { selectedFoods } = action.payload;
      const { removedFood } = action.payload;
      const lunchFoods = selectedFoods.filter(
        (food) => food.title !== removedFood
      );
      state.lunch = lunchFoods;
    },
    removeDinnerFoodItem: (state, action) => {
      const { selectedFoods } = action.payload;
      const { removedFood } = action.payload;
      const dinnerFoods = selectedFoods.filter(
        (food) => food.title !== removedFood
      );
      state.dinner = dinnerFoods;
    },
    removeSnacksFoodItem: (state, action) => {
      const { selectedFoods } = action.payload;
      const { removedFood } = action.payload;
      const snacksFoods = selectedFoods.filter(
        (food) => food.title !== removedFood
      );
      state.snacks = snacksFoods;
    },
    updateBreakfast: (state, action) => {
      const { payload } = action
      state.breakfast = JSON.parse(payload);
    },
    updateLunch: (state, action) => {
      const { payload }  = action
      state.lunch = JSON.parse(payload);
    },
    updateDinner: (state, action) => {
      const { payload } = action
      state.dinner = JSON.parse(payload);
    },
    updateSnacks: (state, action) => {
      const { payload } = action
      state.snacks = JSON.parse(payload);
    },
  },
});

export const {
  populateBreakfast,
  destroyBreakfast,
  populateLunch,
  populateDinner,
  populateSnacks,
  updateSummary,
  removeBreakfastFoodItem,
  removeDinnerFoodItem,
  removeLunchFoodItem,
  removeSnacksFoodItem,
  updateBreakfast,
  updateDinner,
  updateLunch,
  updateSnacks
} = nutritionBasketSlice.actions;

// selectors
export const selectBreakfast = (state) => state.nutritionBasket.breakfast
export const selectLunch = (state) => state.nutritionBasket.lunch
export const selectDinner = (state) => state.nutritionBasket.dinner
export const selectSnacks = (state) => state.nutritionBasket.snacks
export const selectSummary = (state) => state.nutritionBasket.summary

export default nutritionBasketSlice.reducer
