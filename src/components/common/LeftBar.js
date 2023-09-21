import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  filterToys,
  selectFilters,
  selectToys,
  updateFilters,
} from '../../redux_setup/slices/toysSlice'
import { ReduxActions } from '../../constants/redux_actions'

function LeftBar() {
  const filtrs = useSelector(selectFilters)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('wfilters changed')
    dispatch(filterToys())
  }, [filtrs])

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
  return (
    <div>
      <button
        class="btn btn-outline-secondary mb-3 w-100 d-lg-none collapsed"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span>Show filter</span>
      </button>

      <div class="collapse card d-lg-block mb-5" id="navbarSupportedContent">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Age
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
            >
              <div class="accordion-body">
                <div>
                  {[
                    '12-18 months',
                    '18-24 months',
                    '2-5 years',
                    '5-10 years',
                    '10+ years',
                  ].map((age, index) => (
                    <div class="form-check" key={index}>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value={age}
                        checked={filtrs.age?.includes(age)}
                        id={`age${index}`}
                        onChange={(e) => checkboxChange('age', e)}
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
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseTwo"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Category
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              class="accordion-collapse collapse show"
              aria-labelledby="headingTwo"
            >
              <div class="accordion-body">
                <div>
                  {['Action figures', 'Creative', 'Dolls', 'Transport'].map(
                    (category, index) => (
                      <div class="form-check" key={index}>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={category}
                          checked={filtrs.category?.includes(category)}
                          id={`category${index}`}
                          onChange={(e) => checkboxChange('category', e)}
                        />
                        <label
                          class="form-check-label"
                          for={`category${index}`}
                        >
                          {category}
                        </label>
                        <span class="badge badge-secondary float-end"></span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseThree"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseThree"
              >
                Price
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseThree"
              class="accordion-collapse collapse show"
              aria-labelledby="headingThree"
            >
              <div class="accordion-body">
                <div class="row mb-3">
                  <div class="col-6">
                    <p class="mb-0">Min</p>
                    <div class="form-outline">
                      <input
                        type="number"
                        id="typeNumberMin"
                        class="form-control"
                        value={filtrs?.minPrice || ''}
                        onChange={(el) =>
                          dispatch(
                            updateFilters({
                              action_type: ReduxActions.updateMinPrice,
                              val: el.target.value,
                            }),
                          )
                        }
                      />
                      <label
                        class="form-label"
                        for="typeNumberMin"
                        style={{ marginLeft: '0px' }}
                      >
                        {filtrs?.minPrice || ''}
                      </label>
                      <div class="form-notch">
                        <div
                          class="form-notch-leading"
                          style={{ width: '9px' }}
                        ></div>
                        <div
                          class="form-notch-middle"
                          style={{ width: '22.4px' }}
                        ></div>
                        <div class="form-notch-trailing"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <p class="mb-0">Max</p>
                    <div class="form-outline">
                      <input
                        type="number"
                        id="typeNumberMax"
                        class="form-control"
                        value={filtrs?.maxPrice || ''}
                        onChange={(el) =>
                          dispatch(
                            updateFilters({
                              action_type: ReduxActions.updateMaxPrice,
                              val: el.target.value,
                            }),
                          )
                        }
                      />
                      <label
                        class="form-label"
                        for="typeNumberMax"
                        style={{ marginLeft: '0px' }}
                      >
                        {filtrs?.maxPrice || ''}
                      </label>
                      <div class="form-notch">
                        <div
                          class="form-notch-leading"
                          style={{ width: '9px' }}
                        ></div>
                        <div
                          class="form-notch-middle"
                          style={{ width: '22.4px' }}
                        ></div>
                        <div class="form-notch-trailing"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <button
                  type="button"
                  class="btn btn-white w-100 border border-secondary"
                >
                  apply
                </button> */}
              </div>
            </div>
          </div>
          {/* <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseFour"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseFour"
              >
                Size
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFour"
              class="accordion-collapse collapse show"
              aria-labelledby="headingThree"
            >
              <div class="accordion-body">
                <input
                  type="checkbox"
                  class="btn-check border justify-content-center"
                  id="btn-check1"
                  checked=""
                  autocomplete="off"
                />
                <label
                  class="btn btn-white mb-1 px-1"
                  style={{ width: '60px' }}
                  for="btn-check1"
                >
                  XS
                </label>
                <input
                  type="checkbox"
                  class="btn-check border justify-content-center"
                  id="btn-check2"
                  checked=""
                  autocomplete="off"
                />
                <label
                  class="btn btn-white mb-1 px-1"
                  style={{ width: '60px' }}
                  for="btn-check2"
                >
                  SM
                </label>
                <input
                  type="checkbox"
                  class="btn-check border justify-content-center"
                  id="btn-check3"
                  checked=""
                  autocomplete="off"
                />
                <label
                  class="btn btn-white mb-1 px-1"
                  style={{ width: '60px' }}
                  for="btn-check3"
                >
                  LG
                </label>
                <input
                  type="checkbox"
                  class="btn-check border justify-content-center"
                  id="btn-check4"
                  checked=""
                  autocomplete="off"
                />
                <label
                  class="btn btn-white mb-1 px-1"
                  style={{ width: '60px' }}
                  for="btn-check4"
                >
                  XXL
                </label>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="accordion-button text-dark bg-light"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#panelsStayOpen-collapseFive"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseFive"
              >
                Ratings
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFive"
              class="accordion-collapse collapse show"
              aria-labelledby="headingThree"
            >
              <div class="accordion-body">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked=""
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                  </label>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked=""
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-secondary"></i>
                  </label>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked=""
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-secondary"></i>
                    <i class="fas fa-star text-secondary"></i>
                  </label>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked=""
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-secondary"></i>
                    <i class="fas fa-star text-secondary"></i>
                    <i class="fas fa-star text-secondary"></i>
                  </label>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default LeftBar
