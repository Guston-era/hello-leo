import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { login } from './redux_setup/slices/userSlice'

function Login() {
  toast.configure()
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const loginF = () => {
    toast.success('You have successfully logged in', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
    })
    dispatch(
      login({
        userName: 'Demo User',
      }),
    )
    navigate('/home')
  }
  return (
    <div>
      <div className="container">
        <div className="row vh-100 d-flex justify-content-center align-items-center">
          <div className="col-md-8 col-lg-6 col-xs-12">
            <div className="border border-3 border-primary"></div>
            <div className="card shadow">
              <div className="card-body">
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2">ToyS p a c e</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <div className="form">
                      <div
                        className="mb-3 form-group"
                        controlId="formBasicEmail"
                      >
                        <div className="form-label">Email address</div>
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Enter email"
                        />
                      </div>

                      <div
                        className="form-group mb-3"
                        controlId="formBasicPassword"
                      >
                        <div className="form-label">Password</div>
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                      <div
                        className="form-group mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </div>
                      <div className="d-grid">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={loginF}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{' '}
                        <a href="{''}" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
