import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Context from './utils/context.jsx'
// import { Context } from './utils/Context'

ReactDOM.createRoot(document.getElementById('root')).render(
<Context>
<BrowserRouter>
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  </BrowserRouter>
  </Context>
)
