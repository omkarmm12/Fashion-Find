import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import WelcomeHeader from '../WelcomeHeader'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'boxicons/css/boxicons.min.css'
import 'aos/dist/aos.css'

import './index.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    showSubmitError: false,
    errorMsg: '',
    isLoading: false,
  }

  componentDidMount() {
    AOS.init()
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onBlurEmail = () => {
    const {email} = this.state
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      this.setState({emailError: true})
    } else {
      this.setState({emailError: false})
    }
  }

  onBlurPassword = () => {
    const {password} = this.state
    if (password.trim().length < 5) {
      this.setState({passwordError: true})
    } else {
      this.setState({passwordError: false})
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    this.setState({showSubmitError: false, errorMsg: ''})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const userDetails = {email, password}
    const url = 'https://user-api-production-18c7.up.railway.app/users/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Inform the server about the data type
      },
      body: JSON.stringify(userDetails),
    }

    this.setState({isLoading: true})
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        this.onSubmitSuccess(data.jwt_token)
      } else {
        const errorMsg = await response.text()
        this.onSubmitFailure(errorMsg)
      }
    } catch (error) {
      console.log('error:' + error)
      if (error.message.includes('Failed to fetch')) {
        this.onSubmitFailure('Unable to connect to the server')
      } else {
        this.onSubmitFailure('Something went wrong. Please try again later.')
      }
    } finally {
      this.setState({isLoading: false, email: '', password: ''})
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          onBlur={this.onBlurPassword}
          placeholder="Password"
          required
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL ID
        </label>
        <input
          type="email"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeEmail}
          onBlur={this.onBlurEmail}
          placeholder="Email id"
          required
        />
      </>
    )
  }

  render() {
    const {emailError, passwordError, showSubmitError, errorMsg, isLoading} =
      this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <WelcomeHeader />
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            className="login-img"
            alt="website login"
            data-aos="fade-right"
            data-aos-delay="350"
          />
          <form
            className="login-form-container"
            onSubmit={this.submitForm}
            data-aos="fade-left"
            data-aos-delay="350"
          >
            <img
              src="https://i.ibb.co/PxxwvgV/Fashion-Find-Logo.png"
              className="login-website-logo-img"
              alt="website logo"
            />
            <div className="input-container">{this.renderEmailField()}</div>
            {emailError && <p className="error-message">* Enter valid email</p>}
            <div className="input-container">{this.renderPasswordField()}</div>
            {passwordError && (
              <p className="error-message">* Enter valid password</p>
            )}
            <button type="submit" className="login-button">
              {isLoading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> // Spinner inside the button
              ) : (
                'Login'
              )}
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <p>
              New user ?
              <Link to="/registration">
                <button type="button" className="registerBtn">
                  Register
                </button>
              </Link>
            </p>
          </form>
        </div>
      </>
    )
  }
}

export default LoginForm
