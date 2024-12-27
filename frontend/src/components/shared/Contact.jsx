import React from 'react'
import Navbar from './Navbar'
import Location from '../../../dist/assets/Location.png'
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const Contact = () => {
  return (
    <div>
      <Navbar/>
      <div className='w-full h-[100vh] flex gap-96 flex-col sm:flex-row mt-10 max-w-7xl mx-auto'>
        <div>
          <h1 className='text-3xl font-bold mb-4'>Find us:</h1>
          <a href="https://www.google.com/maps/dir/30.0777431,74.6700019/Chitkara+University,+Chandigarh-Patiala+National+Highway+(NH-+64+Village+Jansla,+Rajpura,+Punjab+140401/@30.2743477,75.0053954,9z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x390fc32344a6e2d7:0x81b346dee91799ca!2m2!1d76.6597778!2d30.5160865!3e0?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" target='blank'>
          <img src={Location} alt=""  width={400} className='rounded'/>
          </a>
        </div>
        <div>
          <h1 className='text-3xl font-bold mb-4'>Meet us:</h1>
          <div className='flex items-center justify-center gap-4'>
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-4'>
                <FaPhoneAlt/>
                <p>+915647389012</p>
              </div>
              <div className='flex items-center gap-3'>
                <IoIosMail className='text-[20px]'/>
                <p>support@drive.gmail.com</p>
              </div>
              <div className='flex items-center gap-3'>
                <FaLocationDot/>
                <p>Chitkara University, Rajpura Punjab</p>
              </div>
              <p></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact