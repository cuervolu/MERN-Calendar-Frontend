import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { CalendarApp } from './CalendarApp'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <HashRouter>
    <CalendarApp />
    </HashRouter>
  </React.StrictMode>,
)
