import { createSlice } from '@reduxjs/toolkit' //importing create slice
import { ReduxActions } from '../../constants/redux_actions'
import { defaultTestsData } from '../../constants/testsdata'

// define initialState

const initialState = {
  testsArray: defaultTestsData,
}

// function to export
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    updateTests: (state, action) => {
      const { val, action_type, motherObject, child } = action.payload

      switch (action_type) {
        case ReduxActions.expand_test_option:
          const index = state.testsArray.findIndex((item) => item.name === val)
          if (state.testsArray[index].expanded) {
            state.testsArray[index].selectedChildren = []
          }
          state.testsArray[index].expanded = !state.testsArray[index].expanded
          break

        case ReduxActions.change_child_option:
          const index1 = state.testsArray.findIndex(
            (item) => item.name === motherObject['name'],
          )
          const selectedArray = state.testsArray[index1].selectedChildren

          const childIndex = selectedArray.indexOf(child)
          if (childIndex !== -1) {
            //it is there, so remove it
            selectedArray.splice(childIndex, 1)
          } else {
            selectedArray.push(child)
          }
          break

        default:
          break
      }
    },
    setTestsFromSever: (state, action) => {
      state.testsArray = action.payload
    },
    resetTests: (state) => {
      state.testsArray = defaultTestsData
    },
  },
})

export const { updateTests, resetTests, setTestsFromSever } = testSlice.actions

// selectors
export const selectTests = (state) => state.test.testsArray
export default testSlice.reducer
