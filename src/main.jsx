import React from 'react'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

// import Amplify from 'aws-amplify'
import ReactDOM from 'react-dom/client'

// import awsconfig from './aws-exports'
import { AppRouter } from './routes/AppRouter.jsx'

// console.log(Amplify)

// Amplify.configure()

ReactDOM.createRoot(document.getElementById('root')).render(<AppRouter />)
