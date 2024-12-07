import {useEffect} from 'react'
import AOS from 'aos'
import WelcomeHeader from '../WelcomeHeader'
import 'boxicons/css/boxicons.min.css'
import 'aos/dist/aos.css'

import './index.css'

const Welcome = () => {
  useEffect(() => {
    AOS.init({duration: 1000}) // Initialize AOS animations with options
  }, [])

  return (
    <div className="welcome-container">
      <WelcomeHeader />
      <div className="welcome-home-container">
        <div
          className="welcome-home-content"
          data-aos="fade-right"
          data-aos-delay="350"
        >
          <h1 className="welcome-home-heading">Clothes That Get YOU Noticed</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="clothes that get you noticed"
            className="welcome-home-mobile-img"
          />
          <p className="welcome-home-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="welcome-home-desktop-img"
          data-aos="fade-left"
          data-aos-delay="350"
        />
      </div>
    </div>
  )
}

export default Welcome
