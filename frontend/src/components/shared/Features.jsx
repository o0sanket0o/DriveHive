import React from 'react'
import driver from '../../Images/driver.png'
import business from '../../Images/business.png'
import car_Rent from '../../Images/car_Rent.png'

const Features = () => {
    return (
        <div className='mt-48 max-w-[80%] mx-auto'>
            <div className='flex flex-col gap-8'>     
                <div className='flex flex-col gap-12 sm:flex sm:justify-start sm:flex-row sm:gap-24'>
                    <div className='w-[100%] sm:w-[45%]'>
                        <img src={driver} alt="" width={"600px"}/>
                    </div>
                    <div className='w-full flex flex-col items-start gap-8 md:w-[40%] md:justify-center'>
                        <h3 className='text-2xl sm:text-5xl font-bold'>Drive when you want, make what you need</h3>
                        <p>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through DriveHive.</p>
                        <button className='hover:opacity-80 hover:duration-500 bg-black w-[140px] rounded text-white p-3'>Get Started</button>
                    </div>
                </div>
                <div className='flex flex-col gap-12 sm:flex sm:justify-start sm:flex-row sm:gap-24'>
                    <div className='w-full flex flex-col items-start gap-8 md:w-[40%] md:justify-center'>
                        <h3 className='text-2xl sm:text-5xl font-bold'>The DriveHive you know, reimagined for business</h3>
                        <p>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through DriveHive.</p>
                        <button className='bg-black hover:opacity-80 hover:duration-500 w-[140px] rounded text-white p-3'>Get Started</button>
                    </div>
                    <div className='w-[100%] flex justify-center items-center sm:w-[45%]'>
                        <img src={business} alt="" width={"600px"}/>
                    </div>
                </div>
                <div className='flex flex-col gap-12 sm:flex sm:justify-start sm:flex-row sm:gap-24'>
                    <div className='w-[100%] sm:w-[45%]'>
                        <img src={car_Rent} alt="" width={"600px"}/>
                    </div>
                    <div className='w-full flex flex-col items-start gap-8 md:w-[40%] md:justify-center'>
                        <h3 className='text-2xl sm:text-5xl font-bold'>Make money by renting out your car</h3>
                        <p>Connect with thousands of drivers and earn more per week with DriveHive's free fleet management tools.</p>
                        <button className='bg-black hover:opacity-80 hover:duration-500 w-[140px] rounded text-white p-3'>Get Started</button>
                    </div>
                </div>

            </div>
        </div>
      )
}

export default Features