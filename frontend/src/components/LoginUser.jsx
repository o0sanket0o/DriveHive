import React from 'react'
import Navbar from './shared/Navbar'
import lights from '../../src/Images/lights.avif'
import { Link } from "react-router-dom";
import { useState } from 'react';

const LogInUser = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  function handleChange(e){
    setInput({...input, [e.target.name]: e.target.value});
    console.log("Input is", input);
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log("Final data is ", input);
  }
  return (
    <div>
      <Navbar/>
      <div className='flex justify-between items-center min-h-[600px] max-w-6xl h-auto mx-auto mt-12'>
        <div className='border-[#487075] h-auto rounded border p-4'>
          <h2 className='text-center font-bold text-lg'>Welcome to DriveHive</h2>
          <form action="" className='min-w-[400px] my-4'>
            <div className='flex flex-col justify-between gap-4'>
              <div className='gap-4 flex flex-col'>
                <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <input type="email" name='email' onChange={handleChange} id='email' placeholder='Email' className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <br />
                  <input type="password" name='password' onChange={handleChange} id='password' placeholder='Password' className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
              </div>
              <div className='w-full'>
              <button onClick={handleSubmit} className='bg-black text-white p-2 rounded w-full mb-4 mt-2'>Login</button>
              <p>Join as a fleet?<Link to='/signCaptain' className='text-blue-500 hover:underline'>Register as a captain</Link> </p>
              <p>Don't have an account?<Link to='/signUser' className='text-blue-500 hover:underline'>Sign Up</Link> </p>
              </div>
            </div>
          </form>
        </div>
          <div className=''>
            <img src={lights} alt="" width={"500px"} className='rounded max-h-[600px]'/>
          </div>
      </div>
    </div>
  )
}

export default LogInUser;