import React from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Suggestions from './Suggestions'
import Features from './Features'
import Footer from './Footer'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loading.isLoading);
  return (
    <div>
      {
        loader ? (<Loader/>) : (
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
      </div>
  )
}

export default Home