import React from 'react'
import map from '../../Images/map.png'
import { FaMapMarkerAlt, FaFlagCheckered } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className='mt-16 max-w-[80%] mx-auto'>
        <div className='flex flex-col justify-center items-center gap-8 sm:flex-row'>
        
            <div className='w-[60%] mt-8 flex flex-col'>
                <h1 className='text-3xl font-semibold lg:text-5xl'>Go anywhere with DriveHive</h1>
                <div className='flex flex-col gap-4 my-16 '>
                    <div className='flex gap-2 items-center'>
                        <input type="text" className='bg-gray-100 min-w-[65%] p-3 rounded outline-black' placeholder='Pickup location'/>
                        <FaFlagCheckered className='text-2xl'/>
                    </div>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <input type="text" className='bg-gray-100 min-w-[65%] p-3 rounded outline-black' placeholder='Destination'/>
                            <FaMapMarkerAlt className='text-2xl'/>
                        </div>
                        <button className='bg-black rounded px-4 py-2 w-full sm:w-[65%] text-white mt-4 hover:opacity-70 duration-500 ease-in-out'>See Prices</button>
                    </div>
                </div>
            </div>
            <div>
                <img src={map} alt=""  width={"600px"} />
            </div>

        </div>
    </div>
  )
}

export default Dashboard