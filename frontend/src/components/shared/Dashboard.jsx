import React from "react";
import map from "../../Images/map.png";
import { FaMapMarkerAlt, FaFlagCheckered } from "react-icons/fa";
import Map from "./Map";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import toast from "react-hot-toast";
import { ADD_RIDE_API, GET_COORDINATES } from "../../utils/constants";
import axios from "axios";
import { setLatitude, setLongitude } from "../../redux/locationSlice";
import { useNavigate } from "react-router-dom";
import { GET_SUGGESTIONS_API } from "../../utils/constants";
import {setStartSlice} from "../../redux/startSlice";
import {setEndSlice} from "../../redux/endSlice";

const Dashboard = () => {
  const addRide = async (captainId, pickup, destination, vehicleType) => {
    let link = ADD_RIDE_API;
    // console.log(captainId, pickup, destination, vehicleType, link);
    try{
      const res = await axios.post(link, {captainId: captainId, pickup: pickup, destination:destination, vehicleType:vehicleType}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      if(res.status === 201){
        toast.success("Ride added successfully.");
      }
    }
    catch(err){
      console.log(err);
      toast.error("Couldn't add the ride.");
    }
  }
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // console.log("User is", user);  
  const [address, setAddress] = useState("");
  const [start, setStart] = useState("");
  const [chosen, setChosen] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const handleChange = async (e) => {
    if(e.target.value === '') setSuggestions([]);
    if (e.target.name === "pick"){
        setChosen(1);
        setStart(e.target.value);
        dispatch(setStartSlice(e.target.value));
    } 
    else{
        setChosen(2);
        setAddress(e.target.value);
        dispatch(setEndSlice(e.target.value));
    } 
    let link = `${GET_SUGGESTIONS_API}?input=${e.target.value}`;
    const res = await axios.get(link, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    let currSuggestions = res?.data?.data;
    if(currSuggestions.length > 0) setSuggestions(currSuggestions);
  };
  const latitude = useSelector((state) => state.location.latitude);
  const longitude = useSelector((state) => state.location.longitude);
  const fetchLocation = async (address) => {
    try {
      const res = await axios.get(GET_COORDINATES, {
        params: {
          address: address,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const {
        data: { ltd, lng },
      } = res.data;
      dispatch(setLatitude(ltd));
      dispatch(setLongitude(lng));
    } catch (err) {
      console.log(err);
      toast.error("Internal Server error.");
    }
    // console.log("Address is", address);
  };
  let text =
    user?.role === "user" ? "Go anywhere with DriveHive" : "Add a new ride";
  let btnText = user?.role === "user" ? "Search" : "Add";
  return (
    <div className="mt-16 max-w-[80%] mx-auto">
      <div className="flex flex-col justify-between items-center sm:flex-row">
        <div className="mt-8 flex flex-col">
          <h1 className="text-3xl min-w-[40vw] font-semibold lg:text-5xl">
            {text}
          </h1>
          <div className="flex flex-col gap-4 my-16 ">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={start}
                name="pick"
                onChange={handleChange}
                className="bg-gray-100 min-w-[65%] p-3 rounded outline-black"
                placeholder="Pickup location"
              />
              <FaFlagCheckered className="text-2xl" />
              {
                suggestions?.length > 0 && (
                    <ul className="absolute left-1/2 bg-white border rounded shadow-lg mt-1 max-h-48 overflow-y-auto w-[50%] z-10">
            {suggestions?.map((suggestion, index) => (
                <li
                    key={index}
                    onClick={() => {
                        // console.log("Choosen location is", suggestion.description); // Set the selected suggestion
                        fetchLocation(suggestion.description);
                        if(chosen === 1) setStart(suggestion.description);
                        else setAddress(suggestion.description);
                        setSuggestions([]); // Clear suggestions
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                    {suggestion.description}
                </li>
            ))}
        </ul>
                )
              }
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <input
                  onChange={handleChange}
                  name="destination"
                  type="text"
                  className="bg-gray-100 min-w-[65%] p-3 rounded outline-black"
                  value={address}
                  placeholder="Destination"
                />
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <button
                className="bg-black rounded px-4 py-2 w-[100%] sm:w-[65%] text-white mt-4 hover:opacity-70 duration-500 ease-in-out"
                onClick={(e) => {
                  if(start === "" || address === ""){
                    toast.caller("Please fill both the fields.");
                    return;
                  }else{
                    if(user.role === 'user'){
                      e.preventDefault();
                      dispatch(setStartSlice(start));
                      dispatch(setEndSlice(address));
                      fetchLocation(address);
                      navigate("/findRides");
                    }else{
                      e.preventDefault();
                      dispatch(setStartSlice(start));
                      dispatch(setEndSlice(address));
                      fetchLocation(address);
                      addRide(user.id, start, address, user.vehicle);
                    }
                  }
                }}
              >
                {btnText}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-[75%] ">
            <Map/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
