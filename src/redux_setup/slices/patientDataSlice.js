import { createSlice } from "@reduxjs/toolkit"; //importing create slice

// define initialState

const initialState = {};

// function to export
const patientDataSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    updatePatientData: (state, action) => {
      state.patient = action.payload;
    },
    patientLogin: (state, action) => {
      state.patient = action.payload;
    },
  },
});

export const { updatePatientData, patientLogin } = patientDataSlice.actions;

// selectors
export const selectPatientData = (state) => state.patient.patient;

export default patientDataSlice.reducer;
