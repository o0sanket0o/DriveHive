import React from 'react'
import Navbar from './shared/Navbar'
import taxi from '../../src/Images/taxi.avif'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { CAPTAIN_LOGIN_API } from '../utils/constants'
import { set } from 'mongoose'
import toast from 'react-hot-toast'

const LoginCaptain = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  function handleChange(e){
    setInput({...input, [e.target.name]: e.target.value});
    console.log("Input is", input);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Final data is ", input);
    const link = CAPTAIN_LOGIN_API;
    try{
      const res = await axios.post(link, input, {
        header: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      const token = res.data.token;
      localStorage.setItem('token', token);
      toast.success("Logged in successfully");
      navigate("/");
      setInput({
        email: '',
        password: ''
      })
    }
    catch(err){
      console.log("Error is ", err);
      toast.error("Invalid credentials");
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
                  <input type="email" id='email' name="email" value={input.email} onChange={handleChange} placeholder='Email' className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <br />
                  <input type="password" id='password' value={input.password} onChange={handleChange} name='password' placeholder='Password' className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
              </div>
              <div className='w-full'>
              <button onClick={handleSubmit} className='bg-black text-white p-2 rounded w-full mt-2 mb-4'>Login</button>
              <p>Join as a user?<Link to='/signUser' className='text-blue-500 hover:underline'>Register as a user</Link> </p>
              <p>Don't have an account?<Link to='/signUser' className='text-blue-500 hover:underline'>Sign Up</Link> </p>
              </div>
            </div>
          </form>
        </div>
          <div className=''>
            <img src={taxi} alt="" width={"500px"} className='rounded max-h-[600px]'/>
          </div>
      </div>
    </div>
  )
}

export default LoginCaptain