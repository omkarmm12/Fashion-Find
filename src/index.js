import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import AOS from 'aos'
import App from './App'
import 'aos/dist/aos.css'
import 'boxicons/css/boxicons.min.css'

AOS.init()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
