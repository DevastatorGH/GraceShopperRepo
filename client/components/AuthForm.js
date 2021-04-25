import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { Link } from "react-router-dom"

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="auth-body">
    <div className="auth-container">
      <form id="form" className="form" onSubmit={handleSubmit} name={name}>
      <h2>{displayName}</h2>
      <h5>Enter Login details to get access</h5>
        <div className="form-control">
          <label htmlFor="username">
            Username
          </label>
          <input id="username" name="username" type="text" placeholder="Username/ Email address" />

        </div>
        <div className="form-control">
          <label htmlFor="password">
           Password
          </label>
          <input id="password" name="password" type="password" placeholder="Enter password" />

        </div>
        <div class="redirect-link">

          <h5>Don't have an account? <Link to="/signup">Sign Up</Link> here. </h5>
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        <div className="error-message">
      {error && error.response && <div> {error.response.data} </div>}
        </div>
      </form>
    </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

// These are exported to the Routes page as single components
export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
