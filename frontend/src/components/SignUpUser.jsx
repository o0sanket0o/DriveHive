import React from 'react'
import Navbar from './shared/Navbar'
import lights from '../../src/Images/lights.avif'
import { Link } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_REGISTER_API } from '../utils/constants';

const SignUpUser = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  function handleChange(e){
    setInput({...input, [e.target.name]: e.target.value});
    // console.log("Input is", input);
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const link = USER_REGISTER_API;
      const res = await axios.post(link, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if(res.data.success){
        toast.success(res.data.message);
        navigate('/');
        localStorage.setItem('token', res.data.token);
        setInput({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        })
      }else{
        toast.error(res.data.message);
      }
    }
    catch(err){
      console.log("Error occured in SignUpUser.jsx", err);
      toast.error("Internal server error");
    }
  }
  return (
    <div>
      <Navbar/>
      <div className='flex justify-between items-center min-h-[600px] max-w-6xl h-auto mx-auto mt-12'>
        <div className='border-[#487075] h-auto rounded border p-4'>
          <h2 className='text-center font-bold text-lg'>Welcome to DriveHive</h2>
          <form action="" className='min-w-[400px] my-4'>
            <div className='flex flex-col justify-between gap-4 min-h-[350px]'>
              <div className='gap-4 flex flex-col'>
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <br />
                  <input type="text" onChange={handleChange} id="firstName" name='firstName' placeholder='Enter your first Name' className='border-2 border-gray-400 p-2 rounded w-full'/>
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <br />
                  <input type="text" onChange={handleChange} id='lastName' name='lastName' placeholder='Last Name' className='border-2 border-gray-400 p-2 rounded w-full'/>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <input type="email" onChange={handleChange} id='email' name='email' placeholder='Email' className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <br />
                  <input type="password" onChange={handleChange} name='password' id='password' placeholder='Password' className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
              </div>
              <div className='w-full'>
              <button onClick={handleSubmit} className='bg-black text-white p-2 rounded w-full mb-4'>Sign Up</button>
              <p>Join as a fleet?<Link to='/signCaptain' className='text-blue-500 hover:underline'>Register as a captain</Link> </p>
              <p>Already have an account?<Link to='/loginUser' className='text-blue-500 hover:underline'>Login</Link> </p>
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

export default SignUpUser