import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/shared/Home'
import SignUpUser from './components/SignUpUser'
import LoginUser from './components/LoginUser'
import SignUpCaptain from './components/SignUpCaptain'
import LoginCaptain from './components/LoginCaptain'
import Map from './components/shared/Map'
import Profile from './components/shared/Profile'
import About from './components/shared/About'
import Contact from './components/shared/Contact'
import CheckRides from './components/shared/CheckRides'

const appRouter = createBrowserRouter([
  {path: '/', element:<Home/>},
  {path: '/signUser', element: <SignUpUser/>},
  {path: '/loginUser', element: <LoginUser/>},
  {path: '/signCaptain', element: <SignUpCaptain/>},
  {path: '/loginCaptain', element: <LoginCaptain/>},
  {path: '/profile', element: <Profile/>},
  {path: '/about', element: <About/>},
  {path: '/contact', element: <Contact/>},
  {path: '/findRides', element: <CheckRides />}

])

function App() {
  

  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
