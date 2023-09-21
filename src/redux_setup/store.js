import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import dashboardReducer from './slices/dashboardSlice'
import receptionReducer from './slices/receptionistSlice'
import hypertensionReducer from './slices/hypertensionSlice'
import stepReducer from './slices/stepSlice'
import invoiceReducer from './slices/invoiceSlice'
import testReducer from './slices/testSlice'
import presriptionReducer from './slices/prescriptionSlice'
import insuranceInvoiceReducer from './slices/insuranceInvoiceSlice'
import basketFoodReducer from './slices/basketFoodSlice'
import nutritionBasketReducer from './slices/nutritionBasketSlice'
import patientDataReducer from './slices/patientDataSlice'
import menuReducer from './slices/menuSlice'
import toysReducer from './slices/toysSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    reception: receptionReducer,
    hypertension: hypertensionReducer,
    step: stepReducer,
    invoice: invoiceReducer,
    insuranceInvoice: insuranceInvoiceReducer,
    test: testReducer,
    prescription: presriptionReducer,
    basketFood: basketFoodReducer,
    patient: patientDataReducer,
    nutritionBasket: nutritionBasketReducer,
    menu: menuReducer,
    toys: toysReducer,
  },
})
