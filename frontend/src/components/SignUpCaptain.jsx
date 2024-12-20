import React from 'react'
import Navbar from './shared/Navbar'
import taxi from '../../src/Images/taxi.avif'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CAPTAIN_REGISTER_API } from '../utils/constants'

const SignUpCaptain = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    color: '',
    plate: '',
    capacity: 0,
    vehicleType: ''
  })
  function handleChange(e){
    setInput({...input, [e.target.name]: e.target.value});
    // console.log("Input is", input);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Final data is ", input);
    const sendData = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
      vehicle: {
        color: input.color,
        plate: input.plate,
        capacity: input.capacity,
        vehicleType: input.vehicleType
      }
    }
    try{
      const link = CAPTAIN_REGISTER_API;
      const res = await axios.post(link, sendData, {
        header: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if(res.data.success){
        toast.success("Captain registered successfully.");
        setInput({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          color: '',
          plate: '',
          capacity: 0,
          vehicleType: ''
        })
        navigate('/');
        localStorage.setItem('token', res.data.token);
      }else{
        toast.error(res.data.message);
      }
    }
    catch(err){
      console.log("Error is ", err);
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
                  <input type="text" id="firstName" value={input.firstName} name='firstName' placeholder='Enter your first Name' onChange={handleChange} className='border-2 border-gray-400 p-2 rounded w-full'/>
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <br />
                  <input type="text" value={input.lastName} id='lastName' name='lastName' onChange={handleChange} placeholder='Last Name' className='border-2 border-gray-400 p-2 rounded w-full'/>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <input type="email" id='email' value={input.email} name='email' onChange={handleChange} placeholder='Email' className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <br />
                  <input type="password" id='password' value={input.password} name='password' placeholder='Password' onChange={handleChange} className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
                <div>
                  <label htmlFor="color">Vehicle Color</label>
                  <br />
                  <input type="text" id='color' value={input.color} name='color' placeholder='Enter your vehicle color'  onChange={handleChange} className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
                <div>
                  <label htmlFor="plate">Number Plate</label>
                  <br />
                  <input type="text" id='plate' name='plate' value={input.plate} placeholder='Enter the number plate of your vehicle' onChange={handleChange} className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
                <div>
                  <label htmlFor="capacity">Capacity</label>
                  <br />
                  <input type="number" name='capacity' value={input.capacity} id='capacity' placeholder='Enter the capacity of your vehicle' onChange={handleChange} className='w-full border-2 border-gray-400 p-2 rounded'/>
                </div>
                <div>
                  <label htmlFor="vehicleType">Vehicle Type</label>
                  <br />
                  <select name="vehicleType" value={input.vehicleType} id="vehicleType" className='border-black border cursor-pointer' onChange={handleChange} >
                    <option value='car'>Car</option>
                    <option value='auto'>Auto</option>
                    <option value='motorcycle'>Motorcycle</option>
                  </select>
                </div>
              </div>
              <div className='w-full'>
              <button className='bg-black text-white p-2 rounded w-full mb-4' onClick={handleSubmit}>Sign Up</button>
              <p>Join as a user?<Link to='/signUser' className='text-blue-500 hover:underline'>Register as a user</Link> </p>
              <p>Already have an account?<Link to='/loginCaptain' className='text-blue-500 hover:underline'>Login</Link> </p>
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
//plate, color, car/auto/motorcycle, capacity
export default SignUpCaptain