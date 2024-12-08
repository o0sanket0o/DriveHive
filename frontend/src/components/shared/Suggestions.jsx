import React from 'react'
import car from '../../Images/car.png'
import clock from '../../Images/clock.png'
import key from '../../Images/key.png'
const Suggestions = () => {
  return (
    <div className='max-w-[80%] mx-auto'>
        <div className='w-full justify-center items-center'>
            <h2 className='text-4xl font-bold mb-6'>Suggestions</h2>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-3'>
                <div className='bg-[#F3F3F3] w-[350px] px-4 rounded flex justify-between items-center'>
                    <div className='flex py-3 flex-col gap-2 justify-center'>
                        <h3 className='font-semibold'>Ride</h3>
                        <p className='w-full text-left text-sm'>Go anywhere with Uber. Request a ride, hop in, and go.</p>
                        <button className='bg-white py-2 px-3 mt-2 w-[120px] rounded hover:opacity-50 hover:duration-500'>Details</button>
                    </div>
                    <div>
                        <img src={car} alt="" width={"250px"}/>
                    </div>
                </div>
                <div className='bg-[#F3F3F3] w-[350px] px-4 rounded flex justify-between items-center'>
                    <div className='flex py-3 flex-col gap-2 justify-center'>
                        <h3 className='font-semibold'>Reserve</h3>
                        <p className='w-full text-left text-sm'>Reserve your ride in advance so you can relax on the day of your trip.</p>
                        <button className='bg-white py-2 px-3 mt-2 w-[120px] rounded hover:opacity-50 hover:duration-500'>Details</button>
                    </div>
                    <div >
                        <img src={clock} alt="" width={"250px"}/>
                    </div>
                </div>
                <div className='bg-[#F3F3F3] w-[350px] px-4 rounded flex justify-between items-center'>
                    <div className='flex py-3 flex-col gap-2 justify-center'>
                        <h3 className='font-semibold'>Rental Cars</h3>
                        <p className='w-full text-left text-sm'>Your perfect rental car is a few clicks away. Learn more about Uber Rent.</p>
                        <button className='bg-white py-2 px-3 mt-2 w-[120px] rounded hover:opacity-50 hover:duration-500'>Details</button>
                    </div>
                    <div>
                        <img src={key} alt="" width={"250px"}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Suggestions