import { useSelector } from 'react-redux'
import './App.css'
import Toy from './components/Toy'
import Footer from './components/common/Footer'
import LeftBar from './components/common/LeftBar'
import { selectToys } from './redux_setup/slices/toysSlice'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { selectUser } from './redux_setup/slices/userSlice'
import keyword_extractor from 'keyword-extractor'

function Home() {
  const toys = useSelector(selectToys)
  const user = useSelector(selectUser)
  const [searchedToys, setSearchedToys] = useState([])

  const testKeywordExtraction = () => {
    const sentence = 'I am looking for a toy that a 12 year old can play with.'

    //  Extract the keywords
    const extraction_result = keyword_extractor.extract(sentence, {
      language: 'english',
      // remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false,
    })

    console.log('im trying relax', extraction_result)
  }

  const searchToys = (el) => {
    if (el.target?.value !== '') {
      const filteredToys = toys.filter((t) => {
        if (t.name?.toLowerCase()?.includes(el.target?.value?.toLowerCase())) {
          return true
        }
        if (t.desc?.toLowerCase()?.includes(el.target?.value?.toLowerCase())) {
          return true
        }
        if (el.target?.value?.toLowerCase()?.includes(t?.price)) {
          return true
        }
        if (el.target?.value?.toLowerCase()?.includes(t?.age?.toLowerCase())) {
          return true
        }
      })
      // console.log(filteredToys)
      setSearchedToys(filteredToys)
    } else {
      setSearchedToys([])
    }
  }
  const toysToDisplay = searchedToys.length > 0 ? searchedToys : toys
  return (
    <div className="App">
      <header>
        <div class="p-3 text-center bg-white border-bottom">
          <div class="container">
            <div class="row gy-3">
              <div class="col-lg-5 col-sm-6 col-6">
                <a href="" target="_blank" class="float-start display-6">
                  Hello Leo
                </a>
              </div>

              <div class="order-lg-last col-lg-5 col-sm-6 col-6">
                <div class="d-flex float-end">
                  {!user ? (
                    <Link
                      to="/login"
                      className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                    >
                      {' '}
                      <i class="fas fa-user-alt m-1 me-md-2"></i>
                      <p class="d-none d-md-block mb-0">Sign in</p>{' '}
                    </Link>
                  ) : (
                    <div>
                      <a
                        href="#"
                        class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                        target="_blank"
                      >
                        {' '}
                        <i class="fas fa-heart m-1 me-md-2"></i>
                        <p class="d-none d-md-block mb-0 text-warning">
                          My Orders
                        </p>{' '}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="row gy-3 mt-1">
              <div class="col-lg-5 col-md-12 col-12">
                <div class="input-group float-center">
                  <div class="form-outline">
                    <input
                      type="search"
                      id="form1"
                      class="form-control"
                      onChange={(e) => searchToys(e)}
                    />
                    <label
                      class="form-label"
                      for="form1"
                      style={{ marginLeft: '0px' }}
                    >
                      Search
                    </label>
                    <div class="form-notch">
                      <div
                        class="form-notch-leading"
                        style={{ width: '9px' }}
                      ></div>
                      <div
                        class="form-notch-middle"
                        style={{ width: '47.2px' }}
                      ></div>
                      <div class="form-notch-trailing"></div>
                    </div>
                  </div>
                  {/* <button
                    type="button"
                    class="btn btn-danger shadow-0"
                    disabled={searchedToys?.length <= 0}
                    onClick={(e) => {
                      console.log('not working', searchedToys)
                      setSearchedToys([])
                    }}
                  >
                    Cancel
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class="">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <LeftBar />
            </div>

            <div
              class="col-lg-9"
              style={{ maxHeight: '750px', overflowY: 'scroll' }}
            >
              <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                <strong class="d-block py-2">
                  {toysToDisplay?.length} Items found{' '}
                </strong>
                {/* <div class="ms-auto">
                  <select class="form-select d-inline-block w-auto border pt-1">
                    <option value="0">Best match</option>
                    <option value="1">Recommended</option>
                    <option value="2">High rated</option>
                    <option value="3">Randomly</option>
                  </select>
                  <div class="btn-group shadow-0 border">
                    <a href="#" class="btn btn-light" title="List view">
                      <i class="fa fa-bars fa-lg"></i>
                    </a>
                    <a href="#" class="btn btn-light active" title="Grid view">
                      <i class="fa fa-th fa-lg"></i>
                    </a>
                  </div>
                </div> */}
              </header>
              <div>
                {toysToDisplay?.length > 0 ? (
                  toysToDisplay.map((item, index) => (
                    <Toy toy={item} key={index} />
                  ))
                ) : (
                  <div className="alert alert-info">
                    We are still populating our inventory for this criteria.
                    Please try again later
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={testKeywordExtraction}
                    >
                      Test
                    </button>
                  </div>
                )}
              </div>
              <hr />

              {/* <nav
                aria-label="Page navigation example"
                class="d-flex justify-content-center mt-3"
              >
                <ul class="pagination">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      4
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      5
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
