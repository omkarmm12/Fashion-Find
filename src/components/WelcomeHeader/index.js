import {Link, withRouter} from 'react-router-dom'

import './index.css'

const WelcomeHeader = () => (
  <nav className="welcome-nav-header">
    <div className="welcome-nav-content">
      <Link to="/welcome">
        <img
          className="welcome-website-logo"
          src="https://i.ibb.co/PxxwvgV/Fashion-Find-Logo.png"
          alt="website logo"
        />
      </Link>
      <ul className="welcome-nav-menu">
        <li className="welcome-nav-menu-item">
          <Link to="/Registration" className="welcome-nav-link">
            <button type="button" className="welcome-nav-register-btn">
              Register
            </button>
          </Link>
        </li>

        <li className="welcome-nav-menu-item">
          <Link to="/login" className="welcome-nav-link">
            <button type="button" className="welcome-nav-register-btn">
              Login
            </button>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default withRouter(WelcomeHeader)
