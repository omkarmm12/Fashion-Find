import {Component} from 'react'
import {Link} from 'react-router-dom'
import AOS from 'aos'
import 'bootstrap/dist/css/bootstrap.min.css'
import WelcomeHeader from '../WelcomeHeader'
import 'boxicons/css/boxicons.min.css'
import 'aos/dist/aos.css'

import './index.css'

class Registration extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    conformpassword: '',
    emailError: false,
    usernameError: false,
    passwordError: false,
    conformpasswordError: false,
    showSubmitSuccess: false,
    showSubmitError: false,
    successMsg: '',
    errorMsg: '',
    isFormValid: false,
    isLoading: false,
  }

  componentDidMount() {
    AOS.init()
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value}, () => this.validateForm())
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value}, () => this.validateForm())
  }

  onChangePassword = event => {
    this.setState({password: event.target.value}, () => this.validateForm())
  }

  onChangeConformPassword = event => {
    this.setState({conformpassword: event.target.value}, () =>
      this.validateForm(),
    )
  }

  validateForm = () => {
    const {username, email, password, conformpassword} = this.state
    const isFormValid =
      email.trim().length >= 11 &&
      username.trim().length >= 5 &&
      password.trim().length >= 5 &&
      password === conformpassword

    this.setState({isFormValid})
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

  onBlurUsername = () => {
    const {username} = this.state
    if (username.length < 5) {
      this.setState({usernameError: true})
    } else {
      this.setState({usernameError: false})
    }
  }

  onBlurPassword = () => {
    const {password} = this.state
    if (password.length < 5) {
      this.setState({passwordError: true})
    } else {
      this.setState({passwordError: false})
    }
  }

  onBlurConformPassword = () => {
    const {password, conformpassword} = this.state
    if (password !== conformpassword) {
      this.setState({conformpasswordError: true})
    } else {
      this.setState({conformpasswordError: false})
    }
  }

  onSubmitSuccess = successMsg => {
    // const {history} = this.props
    this.setState({
      showSubmitSuccess: true,
      successMsg,
      showSubmitError: false,
      errorMsg: '',
    })
    // history.replace('/login')
  }

  onSubmitFailure = msg => {
    console.log(msg)
    this.setState({showSubmitError: true, errorMsg: msg})
  }

  registerForm = async event => {
    event.preventDefault()
    const {email, username, password} = this.state
    const userDetails = {email, username, password}
    const url = 'https://user-api-production-18c7.up.railway.app/users/register'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Inform the server about the data type
      },
      body: JSON.stringify(userDetails),
    }
    this.setState({isLoading: true})
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.text()
      if (data === 'Successfully Registered') {
        this.onSubmitSuccess(data)
      } else {
        this.onSubmitFailure(data)
      }
    }

    this.setState({
      email: '',
      username: '',
      password: '',
      conformpassword: '',
      emailError: false,
      usernameError: false,
      passwordError: false,
      conformpasswordError: false,
      isFormValid: false,
      isLoading: false,
    })
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className='input-label' htmlFor='email'>
          EMAIL ID
        </label>
        <input
          type='text'
          id='email'
          className='username-input-field'
          value={email}
          onChange={this.onChangeEmail}
          onBlur={this.onBlurEmail}
          placeholder='Email id'
          required
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className='input-label' htmlFor='password'>
          PASSWORD
        </label>
        <input
          type='password'
          id='password'
          className='password-input-field'
          value={password}
          onChange={this.onChangePassword}
          onBlur={this.onBlurPassword}
          placeholder='Password'
          required
        />
      </>
    )
  }

  renderConformPasswordField = () => {
    const {conformpassword} = this.state

    return (
      <>
        <label className='input-label' htmlFor='conformpassword'>
          CONFORM PASSWORD
        </label>
        <input
          type='password'
          id='conformpassword'
          className='password-input-field'
          value={conformpassword}
          onChange={this.onChangeConformPassword}
          onBlur={this.onBlurConformPassword}
          placeholder='Conform Password'
          required
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className='input-label' htmlFor='username'>
          USERNAME
        </label>
        <input
          type='text'
          id='username'
          className='username-input-field'
          value={username}
          onChange={this.onChangeUsername}
          onBlur={this.onBlurUsername}
          placeholder='Username'
          required
        />
      </>
    )
  }

  render() {
    const {
      emailError,
      usernameError,
      passwordError,
      conformpasswordError,
      showSubmitSuccess,
      successMsg,
      showSubmitError,
      errorMsg,
      isFormValid,
      isLoading,
    } = this.state

    return (
      <>
        <WelcomeHeader />
        <div className='register-container'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'
            className='register-img'
            alt='website login'
            data-aos='fade-right'
            data-aos-delay='350'
          />
          <form
            className='register-form-container'
            onSubmit={this.registerForm}
            data-aos='fade-left'
            data-aos-delay='350'
          >
            <img
              src='https://i.ibb.co/CWjQGwg/Fasionfind-logo.png'
              className='register-website-logo-img'
              alt='website logo'
            />
            <div className='input-container'>{this.renderEmailField()}</div>
            {emailError && <p className='error-message'>* Enter valid email</p>}
            <div className='input-container'>{this.renderUsernameField()}</div>
            {usernameError && (
              <p className='error-message'>
                * Username must be at least 6 characters long
              </p>
            )}
            <div className='input-container'>{this.renderPasswordField()}</div>
            {passwordError && (
              <p className='error-message'>
                * Password must be at least 6 characters long
              </p>
            )}
            <div className='input-container'>
              {this.renderConformPasswordField()}
            </div>
            {conformpasswordError && (
              <p className='error-message'>* Confirm Password not match</p>
            )}
            <button
              type='submit'
              className={`login-button ${
                !isFormValid && 'cursorBlock'
              } btn btn-primary`}
              disabled={!isFormValid}
            >
              {isLoading ? (
                <div className='spinner-border text-light' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div> // Spinner inside the button
              ) : (
                'Register'
              )}
            </button>
            {showSubmitSuccess && (
              <p className='success-message'>{successMsg}</p>
            )}
            {showSubmitError && <p className='error-message'>{errorMsg}</p>}
            <p>
              Already user ?
              <Link to='/login'>
                <button type='button' className='loginBtn'>
                  Login
                </button>
              </Link>
            </p>
          </form>
        </div>
      </>
    )
  }
}

export default Registration
