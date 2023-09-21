import { createSlice } from "@reduxjs/toolkit"; //importing create slice

// define initialState

const initialState = {
  invoice: null,
  identification: null,
  pharmacy: null,
  consultation: null,
  total: null
};

// function to export
const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    updateInvoice: (state, action) => {
      state.invoice = action.payload;
    },
    updateInvoiceIdentification: (state, action) => {
      state.identification = action.payload;
    },
    updatePharmacy: (state, action) => {
      state.pharmacy = action.payload;
    },
    updateConsultation: (state, action) => {
      state.consultation = action.payload;
    },
    updateTotalCalculation: (state,action) =>{
      state.total = action.payload
    }
    
  },
});

export const { updateInvoice, updateInvoiceIdentification, updatePharmacy,updateConsultation,updateTotalCalculation } =
  invoiceSlice.actions;

// selectors
export const selectInvoice = (state) => state.invoice.invoice;
export const selectIdentification = (state) => state.invoice.identification;
export const selectPharmacy = (state) => state.invoice.pharmacy;
export const selectConsultation = (state) => state.invoice.consultation
export const selectTotal = (state) => state.invoice.total
export default invoiceSlice.reducer;
