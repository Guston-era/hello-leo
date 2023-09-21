import { createSlice } from '@reduxjs/toolkit'

// define initialState

const initialState = {
  dashboard: null,
  dashboardFilters: null,
}

// function to export
const receptionistSlice = createSlice({
  name: 'reception',
  initialState,
  reducers: {
    setReceptionistDashboard: (state, action) => {
      state.dashboard = action.payload
    },
    setReceptionistFilters: (state, action) => {
      state.dashboardFilters = action.payload
    },
    unsetReceptionistDashboard: (state) => {
      state.dashboard = null
    },
  },
})

export const {
  setReceptionistDashboard,
  setReceptionistFilters,
  unsetReceptionistDashboard,
} = receptionistSlice.actions

// selectors
export const selectReceptionistDashboard = (state) => state.reception.dashboard
export const selectReceptionistFilters = (state) =>
  state.reception.dashboardFilters

export default receptionistSlice.reducer
