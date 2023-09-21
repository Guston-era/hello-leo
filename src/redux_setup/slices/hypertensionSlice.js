import { createSlice } from '@reduxjs/toolkit' //importing create slice
import {
  defaultfamilyHistoryData,
  defaultLabData,
  defaultLifeStyleReviewData,
  defaultSummaryData,
  defaultUnderlyingConditions,
  defaultVitalsData,
} from '../../constants/hypertension_data'
import { ReduxActions } from '../../constants/redux_actions'

// define initialState

const initialState = {
  labs: defaultLabData,
  summary: defaultSummaryData,
  vitals: defaultVitalsData,
  familyhistory: defaultfamilyHistoryData,
  underlyingconditions: defaultUnderlyingConditions,
  lifestylereview: defaultLifeStyleReviewData,
}

// function to export
const hypertensionSlice = createSlice({
  name: 'hypertension',
  initialState,
  reducers: {
    populateLabs: (state, action) => {
      const { val, subcategory, category, action_type } = action.payload
      switch (action_type) {
        case ReduxActions.add_initial_data_from_server:
          state.labs = val
          break
        case ReduxActions.set_range_value:
          state.labs[category][subcategory]['value'] = val
          break

        case ReduxActions.set_level:
          state.labs[category][subcategory]['level'] = val
          break

        case ReduxActions.reset_to_default_value:
          state.labs = defaultLabData
          break

        case ReduxActions.add_property:
          state.labs[category] = val
          break

        default:
          break
      }

      // state.labs = action.payload
    },
    destroyLabs: (state) => {
      state.labs = defaultLabData
    },

    populateSummary: (state, action) => {
      const { data, property, action_type } = action.payload
      switch (action_type) {
        case ReduxActions.add_property:
          state.summary[property] = data
          break

        default:
          break
      }
    },

    populateVitals: (state, action) => {
      const { data, main_property, sub_property, action_type } = action.payload
      switch (action_type) {
        case ReduxActions.add_property:
          state.vitals[main_property] = data
          break

        case ReduxActions.add_property_in_property:
          state.vitals[main_property][sub_property] = data
          break

        case ReduxActions.add_initial_data_from_server:
          state.vitals = data
          break

        case ReduxActions.reset_to_default_value:
          state.vitals = defaultVitalsData
          break

        default:
          break
      }
    },

    populateFamilyHistory: (state, action) => {
      const { value, category, property, action_type } = action.payload
      switch (action_type) {
        case ReduxActions.add_initial_data_from_server:
          state.familyhistory = value
          break
        case ReduxActions.change_object_property_in_array:
          // state.familyhistory[main_property] = data
          const filteredConditions = state.familyhistory.condition_obj.filter(
            (d) => d.condition === category,
          )
          filteredConditions[0].cases[0][property] = value

          break

        case ReduxActions.reset_to_default_value:
          state.familyhistory = defaultfamilyHistoryData
          break

        default:
          break
      }
    },

    populateUnderlyingConditions: (state, action) => {
      const { value, category, property, action_type } = action.payload
      switch (action_type) {
        case ReduxActions.add_initial_data_from_server:
          state.underlyingconditions = value
          break
        case ReduxActions.change_object_property_in_array:
          const filteredConditions = state.underlyingconditions.condition_obj.filter(
            (d) => d.condition === category,
          )
          filteredConditions[0].cases[0][property] = value

          break
        case ReduxActions.add_property_in_property:
          state.underlyingconditions[category][property] = value
          break
        case ReduxActions.add_property:
          state.underlyingconditions[property] = value
          break

        case ReduxActions.reset_to_default_value:
          state.underlyingconditions = defaultUnderlyingConditions
          break

        default:
          break
      }
    },

    populateLifeStyleReview: (state, action) => {
      const { data, property, inner_property, action_type } = action.payload
      switch (action_type) {
        case ReduxActions.add_initial_data_from_server:
          state.lifestylereview = data
          break
        case ReduxActions.add_property:
          state.lifestylereview[property] = data
          break

        case ReduxActions.add_property_in_property:
          state.lifestylereview[property][inner_property] = data
          break

        case ReduxActions.reset_to_default_value:
          state.lifestylereview = defaultLifeStyleReviewData
          break

        default:
          break
      }
    },
  },
})

export const {
  populateLabs,
  destroyLabs,
  populateSummary,
  populateVitals,
  populateFamilyHistory,
  populateUnderlyingConditions,
  populateLifeStyleReview,
} = hypertensionSlice.actions

// selectors
export const selectLabs = (state) => state.hypertension.labs
export const selectSummary = (state) => state.hypertension.summary
export const selectVitals = (state) => state.hypertension.vitals
export const selectFamilyHistory = (state) => state.hypertension.familyhistory
export const selectUnderlyingConditions = (state) =>
  state.hypertension.underlyingconditions

export const selectLifestyleReview = (state) =>
  state.hypertension.lifestylereview

export default hypertensionSlice.reducer
