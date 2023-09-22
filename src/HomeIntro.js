import StepWizard from 'react-step-wizard'
import Nav from './components/common/Nav'
import React, { Fragment, useState, useEffect } from 'react'

import styles from './components/common/wizard.less'
import transitions from './components/common/transitions.less'
import Plugs from './components/common/Plug'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilters, updateFilters } from './redux_setup/slices/toysSlice'
import { ReduxActions } from './constants/redux_actions'
import { useNavigate } from 'react-router-dom'
/* eslint react/prop-types: 0 */

/**
 * A basic demonstration of how to use the step wizard
 */
const HomeIntro = () => {
  const [state, updateState] = useState({
    form: {},
    transitions: {
      enterRight: `${transitions.animated} ${transitions.enterRight}`,
      enterLeft: `${transitions.animated} ${transitions.enterLeft}`,
      exitRight: `${transitions.animated} ${transitions.exitRight}`,
      exitLeft: `${transitions.animated} ${transitions.exitLeft}`,
      intro: `${transitions.animated} ${transitions.intro}`,
    },
    demo: true, // uncomment to see more
  })
  const filtrs = useSelector(selectFilters)
  const dispatch = useDispatch()
  //   useEffect(() => {
  //     console.log('wfilters changed')
  //     // dispatch(filterToys())
  //   }, [filtrs])

  const checkboxChange = (checkbox, el) => {
    console.log(checkbox, el.target.checked, el.target.value)
    if (checkbox === 'age') {
      dispatch(
        updateFilters({
          action_type: el.target.checked
            ? ReduxActions.addAge
            : ReduxActions.removeAge,
          val: el.target.value,
        }),
      )
    }
    if (checkbox === 'category') {
      dispatch(
        updateFilters({
          action_type: el.target.checked
            ? ReduxActions.addCategory
            : ReduxActions.removeCategory,
          val: el.target.value,
        }),
      )
    }
  }

  const updateForm = (key, value) => {
    const { form } = state

    form[key] = value
    updateState({
      ...state,
      form,
    })
  }

  // Do something on step change
  const onStepChange = (stats) => {
    // console.log(stats);
  }

  const setInstance = (SW) =>
    updateState({
      ...state,
      SW,
    })

  const { SW, demo } = state

  return (
    <div className="container">
      <h3>Hello Leo</h3>
      <div className={'jumbotron'}>
        <div className="row">
          <div
            className={`col-12 col-sm-6 offset-sm-3 ${styles['rsw-wrapper']}`}
          >
            <StepWizard
              onStepChange={onStepChange}
              isHashEnabled
              transitions={state.transitions} // comment out for default transitions
              nav={<Nav />}
              instance={setInstance}
            >
              <First
                hashKey={'FirstStep'}
                update={updateForm}
                checkboxChange={checkboxChange}
              />
              <Second form={state.form} checkboxChange={checkboxChange} />
              {/* <Progress stepName="progress" /> */}
              {null /* will be ignored */}
              {/* <Last hashKey={'TheEnd!'} /> */}
            </StepWizard>
          </div>
        </div>
      </div>
      {/* {demo && SW && <InstanceDemo SW={SW} />} */}
    </div>
  )
}

export default HomeIntro

/** Demo of using instance */
const InstanceDemo = ({ SW }) => (
  <Fragment>
    <h4>Control from outside component</h4>
    <button className={'btn btn-secondary'} onClick={SW.previousStep}>
      Previous Step
    </button>
    &nbsp;
    <button className={'btn btn-secondary'} onClick={SW.nextStep}>
      Next Step
    </button>
    &nbsp;
    <button
      className={'btn btn-secondary'}
      onClick={() => SW.goToNamedStep('progress')}
    >
      Go to 'progress'
    </button>
  </Fragment>
)

/**
 * Stats Component - to illustrate the possible functions
 * Could be used for nav buttons or overview
 */
const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  step,
}) => {
  let navigate = useNavigate()
  return (
    <div>
      <hr />
      {step > 1 && (
        <button className="btn btn-default btn-block" onClick={previousStep}>
          Go Back
        </button>
      )}
      {step < totalSteps ? (
        <button className="btn btn-primary btn-block" onClick={nextStep}>
          Continue
        </button>
      ) : (
        <button
          className="btn btn-success btn-block"
          onClick={() => navigate('/home')}
        >
          Finish
        </button>
      )}
      <hr />
    </div>
  )
}

/** Steps */

const First = (props) => {
  const update = (e) => {
    props.update(e.target.name, e.target.value)
  }

  return (
    <div>
      <h3 className="text-center">Welcome to Hello Leo!</h3>
      <h5 className="text-center">Which age gap does your kid(s) lie?</h5>

      <div>
        <div class="accordion-body">
          <div>
            {[
              '1-4 years',
              '2-4 years',
              '3-5 years',
              '5-7 years',
              '6-8 years',
              '8-10 years',
            ].map((age, index) => (
              <div class="form-check" key={index}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={age}
                  id={`age${index}`}
                  onChange={(e) => props.checkboxChange('age', e)}
                />
                <label class="form-check-label" for={`age${index}`}>
                  {age}
                </label>
                <span class="badge badge-secondary float-end"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Stats step={1} {...props} />
    </div>
  )
}

const Second = (props) => {
  const validate = () => {
    // eslint-disable-line
    props.previousStep()
  }

  return (
    <div>
      <h5 className="text-center">
        Fantastic! what category(s) of books would you buy for your kid(s)?
      </h5>

      <div>
        <div class="accordion-body">
          <div>
            {[
              'self-acceptance',
              'healthy coping strategies',
              'emotional regulation and resilience',
              'perfectionist and anxious tendencies',
            ].map((category, index) => (
              <div class="form-check" key={index}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={category}
                  id={`category${index}`}
                  onChange={(e) => props.checkboxChange('category', e)}
                />
                <label class="form-check-label" for={`category${index}`}>
                  {category}
                </label>
                <span class="badge badge-secondary float-end"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Stats step={2} {...props} previousStep={validate} />
    </div>
  )
}

const Progress = (props) => {
  const [state, updateState] = useState({
    isActiveClass: '',
    timeout: null,
  })

  useEffect(() => {
    const { timeout } = state

    if (props.isActive && !timeout) {
      updateState({
        isActiveClass: styles.loaded,
        timeout: setTimeout(() => {
          props.nextStep()
        }, 3000),
      })
    } else if (!props.isActive && timeout) {
      clearTimeout(timeout)
      updateState({
        isActiveClass: '',
        timeout: null,
      })
    }
  })

  return (
    <div className={styles['progress-wrapper']}>
      <p className="text-center">Automated Progress...</p>
      <div className={`${styles.progress} ${state.isActiveClass}`}>
        <div className={`${styles['progress-bar']} progress-bar-striped`} />
      </div>
    </div>
  )
}

const Last = (props) => {
  const submit = () => {
    alert('You did it! Yay!') // eslint-disable-line
  }

  return (
    <div>
      <div className={'text-center'}>
        <h3>This is the last step in this example!</h3>
        <hr />
        <Plugs />
      </div>
      <Stats step={4} {...props} nextStep={submit} />
    </div>
  )
}
