import { createSlice } from '@reduxjs/toolkit' //importing create slice

// define initialState

const initialState = {
  step: 'vitals',
}

// function to export
const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    updateStep: (state, action) => {
      state.step = action.payload
    },
  },
})

export const { updateStep } = stepSlice.actions

// selectors
export const selectStep = (state) => state.step.step

export default stepSlice.reducer
