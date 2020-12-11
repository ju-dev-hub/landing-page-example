
import React from 'react'
import ReactDOM from 'react-dom'
import Routing from '../src/screens/routes'

import * as serviceWorker from './serviceWorker'

import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.css'

// Import CSS Files
import './style/desktop.css'
import './style/tablet.css'
import './style/mobile.css'
import './style/index.css'

ReactDOM.render(<Routing />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
