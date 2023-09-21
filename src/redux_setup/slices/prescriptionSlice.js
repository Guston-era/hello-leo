import { createSlice } from '@reduxjs/toolkit' //importing create slice

// define initialState

const initialState = {
  prescription:null,
  rx_number: null
}

// function to export
const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    updatePrescription: (state, action) => {
      state.prescription = action.payload
    },
    updateRx: (state, payload) =>{
      state.rx_number = payload
    }
  },
})

export const { updatePrescription,updateRx } = prescriptionSlice.actions

// selectors
export const selectprescription = (state) => state.prescription.prescription
export const selectRx = (state) => state.prescription.rx_number

export default prescriptionSlice.reducer
