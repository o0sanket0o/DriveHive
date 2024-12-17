import React from 'react'
import map from '../../Images/map.png'
import { FaMapMarkerAlt, FaFlagCheckered } from 'react-icons/fa';
import Map from './Map';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import store from '../../redux/store';
import { GET_COORDINATES } from '../../utils/constants';
import axios from 'axios';
import { setLatitude, setLongitude } from '../../redux/locationSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const handleChange = (e) => {
        console.log("Address is ", address);
        setAddress(e.target.value);
    }
    const latitude = useSelector(state => state.location.latitude);
    const longitude = useSelector(state => state.location.longitude);
    console.log("Latitude and longitude in dashboard ", latitude, longitude);
    const fetchLocation = async (address) => {
        console.log("Address is", address);
        const res = await axios.get(GET_COORDINATES, {
            params: {
                address: address
            },
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const {data: {ltd, lng} } = res.data;
        dispatch(setLatitude(ltd));
        dispatch(setLongitude(lng));
    }
  return (
    <div className='mt-16 max-w-[80%] mx-auto'>
        <div className='flex flex-col justify-between items-center sm:flex-row'>
            <div className='mt-8 flex flex-col'>
                <h1 className='text-3xl font-semibold lg:text-5xl'>Go anywhere with DriveHive</h1>
                <div className='flex flex-col gap-4 my-16 '>
                    <div className='flex gap-2 items-center'>
                        <input type="text" className='bg-gray-100 min-w-[65%] p-3 rounded outline-black' placeholder='Pickup location'/>
                        <FaFlagCheckered className='text-2xl'/>
                    </div>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <input onChange={handleChange} type="text" className='bg-gray-100 min-w-[65%] p-3 rounded outline-black' value={address} placeholder='Destination'/>
                            <FaMapMarkerAlt className='text-2xl'/>
                        </div>
                        <button className='bg-black rounded px-4 py-2 w-[65%] sm:w-[65%] text-white mt-4 hover:opacity-70 duration-500 ease-in-out' onClick={(e) => {
                            e.preventDefault();
                            // fetchLocation(address);
                        }}>Search</button>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center w-[75%] '>
                <Map/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
