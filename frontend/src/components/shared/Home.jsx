import React from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Suggestions from './Suggestions'
import Features from './Features'
import Footer from './Footer'


const Home = () => {
  return (
    <div>
      <div className='h-[105vh]'>
        <Navbar/>
        <Dashboard/>
      </div>
        <Suggestions/>
        <Features/>
        <Footer/>
    </div>
  )
}

export default Home