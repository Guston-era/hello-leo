import { createSlice } from '@reduxjs/toolkit' //importing create slice
import { ReduxActions } from '../../constants/redux_actions'
import { defaulttoydata } from '../../constants/toysdata'

// define initialState

const initialState = {
  toysArray: defaulttoydata,
  filters: {
    age: [],
    category: [],
    minPrice: null,
    maxPrice: null,
  },
}

// function to export
const toysSlice = createSlice({
  name: 'toys',
  initialState,
  reducers: {
    filterToys: (state) => {
      let filteredData = defaulttoydata
      //systematic top down
      //age
      if (state.filters.age.length > 0) {
        filteredData = defaulttoydata.filter((dt) => {
          if (state.filters.age.includes(dt.age)) {
            return true
          }
        })
      }
      if (state.filters.category.length > 0) {
        filteredData = filteredData.filter((dt) => {
          if (state.filters.category.includes(dt.category)) {
            return true
          }
        })
      }
      if (!!state.filters.minPrice) {
        filteredData = filteredData.filter((dt) => {
          if (dt.price >= state.filters.minPrice) {
            return true
          } else {
            return false
          }
        })
      }

      if (!!state.filters.maxPrice) {
        filteredData = filteredData.filter((dt) => {
          if (dt.price <= state.filters.maxPrice) {
            return true
          } else {
            return false
          }
        })
      }
      state.toysArray = filteredData
    },
    updateFilters: (state, action) => {
      const { action_type, val } = action.payload
      const ageIndex = state.filters.age?.indexOf(val)
      const categoryIndex = state.filters.category?.indexOf(val)
      switch (action_type) {
        //
        case ReduxActions.removeAge:
          if (ageIndex !== -1) {
            state.filters.age?.splice(ageIndex, 1)
          }

          break

        case ReduxActions.addAge:
          if (ageIndex === -1) {
            state.filters.age?.push(val)
          }

          break

        case ReduxActions.addCategory:
          if (categoryIndex === -1) {
            state.filters.category?.push(val)
          }

          break

        case ReduxActions.removeCategory:
          if (categoryIndex !== -1) {
            state.filters.category?.splice(categoryIndex, 1)
          }

          break

        case ReduxActions.updateMinPrice:
          if (val > state.filters.maxPrice) {
            state.filters.maxPrice = Math.pow(val, 2)
          }
          state.filters.minPrice = val

          break

        case ReduxActions.updateMaxPrice:
          if (val < state.filters.minPrice) {
            state.filters.minPrice = val / 2
          }
          state.filters.maxPrice = val

          break

        default:
          break
      }
    },
    resetToys: (state) => {
      state.toysArray = defaulttoydata
    },
  },
})

export const { filterToys, resetToys, updateFilters } = toysSlice.actions

// selectors
export const selectToys = (state) => state.toys.toysArray
export const selectFilters = (state) => state.toys.filters
export default toysSlice.reducer
