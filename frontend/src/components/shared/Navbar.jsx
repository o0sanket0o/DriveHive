import React from 'react'
import companyLogo from '../../Images/VistaLogos/logo-png.png'
import companySvg from '../../Images/VistaLogos/logo-svg.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-[rgb(64,64,64)] w-[100vw]'>
        <div className='flex justify-between max-w-[95%]'>
            <div>
                <img src={companyLogo} alt="" width={"320px"}/>
            </div>
            <div className='flex justify-center gap-4 items-center text-white'>
            <button class=" bg-white py-2 px-4 text-black rounded" onClick={() => {
              navigate('/loginUser')
            }}>
            LogIn
            </button>
            <button class= "bg-white py-2 px-4 text-black rounded" onClick={() => {
              navigate('/signUser')
            }}>
              Sign Up
            </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar