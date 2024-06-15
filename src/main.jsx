import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Signin from './Components/Signin.jsx'
import SignUp from './Components/SignUp.jsx'
import Layout from './Layout.jsx'
import Home from './Components/Home.jsx'
import Account from './Components/Account.jsx'
import Billing from './Components/Billing.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
     <Route path='/' element={<Signin />} />,
     <Route path='/signup' element={<SignUp />} />,
     <Route path='/app' element={<Layout />}>
      <Route path="/app" element={<Home />} />
      <Route path="/app/account" element={<Account />} />
      <Route path="/app/billing" element={<Billing />} />
     </Route>
     </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
