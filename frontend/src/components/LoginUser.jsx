import React from 'react'
import Navbar from './shared/Navbar'
import lights from '../../src/Images/lights.avif'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { USER_LOGIN_API } from '../utils/constants';

const LogInUser = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  function handleChange(e){
    setInput({...input, [e.target.name]: e.target.value});
    // console.log("Input is", input);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const link = USER_LOGIN_API;
      const res = await axios.post(link, input, {
          headers:{
            "Content-Type": "application/json"
          },
          withCredentials: true
      })
      if(res.data.success){
        toast.success(res.data.message);
        navigate('/');
        localStorage.setItem('token', res.data.token);
        setInput({
          email: '',
          password: ''
        })
      }else{
        toast.error(res.data.message);
      }
    }
    catch(err){
      console.log("Error occured in handleSubmit function in LoginUser.jsx", err);
      toast.error("Internal Server Error occured.");
    }

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