import { createSlice } from '@reduxjs/toolkit' //importing create slice
import { findTotalsInArrayOfObjects } from '../../constants/Essentials'
import { defaultinvoiceData } from '../../constants/invoicedata'
import { ReduxActions } from '../../constants/redux_actions'

// define initialState

const initialState = {
  invoice: defaultinvoiceData,
}

// function to export
const insuranceInvoiceSlice = createSlice({
  name: 'insuranceInvoice',
  initialState,
  reducers: {
    adjustSections: (state, action) => {
      const { val, fieldToEdit, fieldValue, action_type } = action.payload
      const index = state.invoice.findIndex((inv) => inv.service === val)

      switch (action_type) {
        case ReduxActions.add_invoice_section:
          state.invoice[index].selected = true
          break
        case ReduxActions.remove_invoice_section:
          state.invoice[index].selected = false
          break
        case ReduxActions.edit_invoice_section:
          state.invoice[index][fieldToEdit] = fieldValue
          if (fieldToEdit === 'taxfield') {
            //adjust total amount
            const tax = parseFloat(fieldValue)
            const subtotal = state.invoice[index].subtotalfield
            let finalTotal = subtotal
            if (!isNaN(tax) && tax > 0) {
              finalTotal = ((tax + 100) * subtotal) / 100
            }
            state.invoice[index].totalfield = finalTotal
          }
          break

        default:
          break
      }
    },
    addInvoiceLabTest: (state, action) => {
      const { val, action_type } = action.payload
      const index = state.invoice.findIndex((inv) => inv.service === 'Labs')

      switch (action_type) {
        case ReduxActions.add_invoice_labtest:
          //check if val is in chosen tests
          const searchedIndex = state.invoice[index].chosenTests.findIndex(
            (test) => test.name === val,
          )
          if (searchedIndex === -1) {
            //it was not found in the array so form an object
            const obj = {
              name: val,
              price: 0,
              quantity: 1,
              discount: 0,
              amount: 0,
            }
            //push to array
            state.invoice[index].chosenTests.push(obj)
          } else {
            // console.log('adding failed')
          }

          break

        default:
          break
      }
    },
    adjustInvoiceLabTestItem: (state, action) => {
      const { val, field, testname, action_type } = action.payload
      const index = state.invoice.findIndex((inv) => inv.service === 'Labs')
      //check if val is in chosen tests
      const searchedIndex = state.invoice[index].chosenTests.findIndex(
        (test) => test.name === testname,
      )
      switch (action_type) {
        case ReduxActions.edit_invoice_labtest_item:
          if (searchedIndex !== -1) {
            //it was found in the array
            // const obj = {
            //   name: val,
            //   price: 0,
            //   quantity: 1,
            //   discount: 0,
            //   amount: 0,
            // }
            const testToEdit = state.invoice[index].chosenTests[searchedIndex]

            // testToEdit?.price = 67
            testToEdit[field] = val

            //adjust the amount
            const amount =
              testToEdit?.price * testToEdit?.quantity - testToEdit?.discount
            testToEdit.amount = amount

            // adjust the subtotal amount
            const subtotal = findTotalsInArrayOfObjects(
              state.invoice[index].chosenTests,
              'amount',
            )
            state.invoice[index].subtotalfield = subtotal

            //adjust final amount

            const tax = parseFloat(state.invoice[index].taxfield)
            let finalTotal = subtotal
            if (!isNaN(tax) && tax > 0) {
              finalTotal = ((tax + 100) * subtotal) / 100
            }
            state.invoice[index].totalfield = finalTotal
          } else {
            // console.log('adding failed')
          }

          break
        case ReduxActions.delete_invoice_labtest_item:
          if (searchedIndex !== -1) {
            const testToEdit = state.invoice[index].chosenTests[searchedIndex]

            // adjust the subtotal amount
            let subtotal = state.invoice[index].subtotalfield
            subtotal = subtotal - testToEdit.amount
            state.invoice[index].subtotalfield = subtotal

            //adjust final amount

            const tax = parseFloat(state.invoice[index].taxfield)
            let finalTotal = subtotal
            if (!isNaN(tax) && tax > 0) {
              finalTotal = ((tax + 100) * subtotal) / 100
            }
            state.invoice[index].totalfield = finalTotal

            // it was found in the array so remove it
            state.invoice[index].chosenTests.splice(searchedIndex, 1)
          } else {
            // console.log('adding failed')
          }

          break

        default:
          break
      }
    },
    adjustInvoicePharmacy: (state, action) => {
      const { slug, val, field, action_type } = action.payload
      const index = state.invoice.findIndex((inv) => inv.service === 'Pharmacy')
      const searchedIndex = state.invoice[index].chosenDrugs.findIndex(
        (drug) => drug.slug === slug,
      )

      switch (action_type) {
        case ReduxActions.add_invoice_pharmacy:
          //check if val is in chosen drugs

          if (searchedIndex === -1) {
            //it was not found in the array so form an object
            const obj = {
              slug: slug,
              price: 0,
              quantity: 1,
              discount: 0,
              amount: 0,
            }
            //push to array
            state.invoice[index].chosenDrugs.push(obj)
          } else {
            // console.log('adding failed')
          }

          break

        case ReduxActions.delete_invoice_drug:
          if (searchedIndex !== -1) {
            const drugToRemove = state.invoice[index].chosenDrugs[searchedIndex]

            // adjust the subtotal amount
            let subtotal = state.invoice[index].subtotalfield
            subtotal = subtotal - drugToRemove.amount
            state.invoice[index].subtotalfield = subtotal

            //adjust final amount

            const tax = parseFloat(state.invoice[index].taxfield)
            let finalTotal = subtotal
            if (!isNaN(tax) && tax > 0) {
              finalTotal = ((tax + 100) * subtotal) / 100
            }
            state.invoice[index].totalfield = finalTotal

            // it was found in the array so remove it
            state.invoice[index].chosenDrugs.splice(searchedIndex, 1)
          } else {
            // console.log('adding failed')
          }

          break

        case ReduxActions.edit_invoice_drug:
          if (searchedIndex !== -1) {
            //it was found in the array
            // const obj = {
            //   name: val,
            //   price: 0,
            //   quantity: 1,
            //   discount: 0,
            //   amount: 0,
            // }
            const drugToEdit = state.invoice[index].chosenDrugs[searchedIndex]

            // drugToEdit?.price = 67
            drugToEdit[field] = val

            //adjust the amount
            const amount =
              drugToEdit?.price * drugToEdit?.quantity - drugToEdit?.discount
            drugToEdit.amount = amount

            // adjust the subtotal amount
            const subtotal = findTotalsInArrayOfObjects(
              state.invoice[index].chosenDrugs,
              'amount',
            )
            state.invoice[index].subtotalfield = subtotal

            //adjust final amount

            const tax = parseFloat(state.invoice[index].taxfield)
            let finalTotal = subtotal
            if (!isNaN(tax) && tax > 0) {
              finalTotal = ((tax + 100) * subtotal) / 100
            }
            state.invoice[index].totalfield = finalTotal
          } else {
            // console.log('adding failed')
          }

        default:
          break
      }
    },
    adjustInvoiceConsultation: (state, action) => {
      const { val, field, action_type } = action.payload
      const index = state.invoice.findIndex(
        (inv) => inv.service === 'Consultation',
      )

      switch (action_type) {
        case ReduxActions.change_consultation_field:
          state.invoice[index][field] = val
          const itemToEdit = state.invoice[index]
          //adjust the amount
          const amount =
            itemToEdit?.pricefield * itemToEdit?.quantityfield -
            itemToEdit?.discountfield
          itemToEdit.amount = amount

          // adjust the amount and subtotal amount

          state.invoice[index].amountfield = amount
          state.invoice[index].subtotalfield = amount

          //adjust final amount

          const tax = parseFloat(state.invoice[index].taxfield)
          let finalTotal = amount
          if (!isNaN(tax) && tax > 0) {
            finalTotal = ((tax + 100) * amount) / 100
          }
          state.invoice[index].totalfield = finalTotal

          break

        default:
          break
      }
    },
  },
})

export const {
  adjustSections,
  addInvoiceLabTest,
  adjustInvoiceLabTestItem,
  adjustInvoicePharmacy,
  adjustInvoiceConsultation,
} = insuranceInvoiceSlice.actions

// selectors
export const selectInsuranceInvoice = (state) => state.insuranceInvoice.invoice
// export const selectIdentification = (state) => state.invoice.identification;
// export const selectPharmacy = (state) => state.invoice.pharmacy;
// export const selectConsultation = (state) => state.invoice.consultation
// export const selectTotal = (state) => state.invoice.total
export default insuranceInvoiceSlice.reducer
