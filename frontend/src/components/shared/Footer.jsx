import React from 'react'
import { FaRegCopyright } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-black w-[100vw] mt-36 sm:mt-10 text-white'>
        <div className='max-w-[80%] mx-auto'>
            <h1 className='pt-20 font-bold text-3xl'>DriveHive</h1>
            <div className='flex flex-col sm:flex-row justify-between mt-20'>
                <div>
                    <h2 className='text-lg mb-6'>Company</h2>
                    <ul className='flex flex-col gap-4'>
                        <li>About</li>
                        <li>Blog</li>
                        <li>Careers</li>
                        <li>Our Investors</li>
                    </ul>
                </div>
                <div className='mt-20 sm:mt-0'>
                    <h2 className='text-lg mb-6'>Products</h2>
                    <ul className='flex flex-col gap-4'>
                        <li>Ride</li>
                        <li>Drive</li>
                        <li>Deliver</li>
                        <li>For Business</li>
                        <li>Eat</li>
                    </ul>
                </div>
                <div className='mt-20 sm:mt-0'>
                    <h2 className='text-lg mb-6'>Travel</h2>
                    <ul className='flex flex-col gap-4'>
                        <li>Reserve</li>
                        <li>Cities</li>
                        <li>Safety</li>
                    </ul>
                </div>
                <div className='flex mt-20 flex-col gap-4 justify-start'>
                    <div className='uppercase '>Subscribe to newsletter</div>
                    <div className='flex gap-0 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
                        <input type='text' placeholder='Enter your email address' className='bg-white p-2 rounded w-[200px] rounded-r-none outline-none text-black'/>
                        <button className='bg-black hover:opacity-60 hover:duration-500 rounded-tr w-[6rem] text-white'>Join</button>
                    </div>
                    <div></div>
                </div>
            </div>
            <hr className='text-white my-8'/>
            <div className='flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between pb-10'>
                <div className='flex gap-2 items-center'>
                    <FaRegCopyright/> 
                    <div>Copyright 2024, All Rights Reserved</div>
                </div>
                <div className='flex gap-4 text-[1.3rem] '>
                    <FaInstagram/>
                    <FaFacebookF/>
                    <FaGithub/>
                    <FaTwitter/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer