import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { setUser } from "../../redux/authSlice";
import { END_RIDE_API, FETCH_RIDES_API } from "../../utils/constants";
import { setLoading } from "../../redux/loadingSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { FETCH_RIDES_DRIVER__API } from "../../utils/constants";

const Profile = () => {
  const [rides, setRides] = useState([]);
  const [userId, setuserId] = useState("");
  const [role, setRole] = useState("");
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [pendingRides, setPending] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const loader = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const fetchRides = async () => {
    const strUser = localStorage.getItem("user");
    const userObj = JSON.parse(strUser);
    // console.log("User obj is ", userObj);
    dispatch(setUser(userObj));
    setUser(userObj);
    setuserId(userObj.id);
    setRole(userObj.role);
    try {
      dispatch(setLoading(true));
      let link =
        userObj.role === "captain"
          ? FETCH_RIDES_DRIVER__API
          : FETCH_RIDES_API;
      const res = await axios.get(link, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let rides = res.data;
      // console.log("Rides are", rides);
      // console.log("User id is", userId);
      let availableRides = [];
      if (userObj.role === "captain") availableRides = rides.filter((ride) => ride.captain === userId);
      else availableRides = rides.filter((ride) => ride.user === userId);
      setRides(availableRides);
      let temp = availableRides.filter((ride) => ride.status === "accepted");
      // setRides(rides);
      setAcceptedRides(temp);
      temp = availableRides.filter((ride) => ride.status === "completed");
      setCompletedRides(temp);
      temp = availableRides.filter((ride) => ride.status === "pending");
      setPending(temp);
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    // console.log("user id is", userObj.id);
    fetchRides();
  }, [userId, setAcceptedRides, setCompletedRides]);
  const user = useSelector((state) => state.auth.user);
  // console.log("User is", user);
  const endRide = async (rideid) => {
    const link = END_RIDE_API;
    try{
      const res = await axios.put(link, {captainId:userId, rideId:rideid}, {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.status === 200){
        toast.success("Ride ended successsfully.");
        setRides((prevRides) => {
          const updatedRides = prevRides.map((ride) => 
            ride._id === rideid ? {...ride, status: "completed"}: ride
          );
          const updatedAcceptedRides = updatedRides.filter((ride) => ride.status === 'accepted');
          const updatedCompletedRides = updatedRides.filter((ride) => ride.status === 'completed');
          setAcceptedRides(updatedAcceptedRides);
          setCompletedRides(updatedCompletedRides);
          return updatedRides;
        })
      }
    }
    catch(err){
      toast.error("Couldn't end the Ride.");
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-72 sm:flex-row  max-w-7xl mx-auto mt-10 min-h-[100vh]">
        <div className="bg-gray-100 rounded w-[30%] h-[350px] py-4 text-white">
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-col gap-2">
              <img
                src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-full w-48 h-48 object-fit"
              />
              <p className="text-center font-bold text-lg text-black">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-center font-bold text-lg text-black">
                {user.email}
              </p>
              {
                user.role === 'captain' && 
                  <p className="text-black font-bold text-lg text-center">Vehicle: <span className='uppercase'>{user.vehicle}</span></p>
              }
            </div>
          </div>
        </div>
        <div className="w-[70%]">
          
          <h1 className="text-2xl font-bold mb-4">Pending:</h1>
          <div className="flex flex-col gap-4">
                <div>
                  {pendingRides.map((ride) => (
              <div
                key={ride._id}
                className="bg-[rgb(64,64,64)] text-white p-4 rounded-md"
              >
                <div className="flex justify-between text-[1.4rem] ">
                  <div>
                    PickUp: <span className="font-bold">{ride.pickup}</span>{" "}
                  </div>
                  <div>
                    Destination:{" "}
                    <span className="font-bold">{ride.destination}</span>{" "}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    Price: <span className="font-bold">${ride.fare}</span>{" "}
                  </div>
                  <div>
                    Duration: <span className="font-bold">{ride.duration}</span>{" "}
                  </div>
                </div>
              </div>
            ))}
                </div>
              
            
          </div>
          <h1 className="text-2xl font-bold mb-4">On going:</h1>
          <div className="flex flex-col gap-4">
                <div>
                  {acceptedRides.map((ride) => (
              <div
                key={ride._id}
                className="bg-[rgb(64,64,64)] text-white p-4 rounded-md"
              >
                <div className="flex justify-between text-[1.4rem] ">
                  <div>
                    PickUp: <span className="font-bold">{ride.pickup}</span>{" "}
                  </div>
                  <div>
                    Destination:{" "}
                    <span className="font-bold">{ride.destination}</span>{" "}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    Price: <span className="font-bold">${ride.fare}</span>{" "}
                  </div>
                  <div>
                    Duration: <span className="font-bold">{ride.duration}</span>{" "}
                  </div>
                </div>
                <div className="mt-2 flex gap-4">
                  <div className="text-green-500">
                    {ride.status === "accepted" ? "Booked" : "Completed"}
                  </div>
                  {
                    user.role === 'captain' && 
                    <button className="text-red-500" onClick={() => endRide(ride._id)}>End Ride</button>
                  }
                </div>
              </div>
            ))}
                </div>
              
            
          </div>
          <h1 className="text-2xl font-bold my-4">Completed:</h1>
          <div className="flex flex-col gap-4">
            {completedRides.map((ride) => (
              <div
                key={ride._id}
                className="bg-[rgb(64,64,64)] text-white p-4 rounded-md"
              >
                <div className="flex justify-between text-[1.4rem] ">
                  <div>
                    PickUp: <span className="font-bold">{ride.pickup}</span>{" "}
                  </div>
                  <div>
                    Destination:{" "}
                    <span className="font-bold">{ride.destination}</span>{" "}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    Price: <span className="font-bold">${ride.fare}</span>{" "}
                  </div>
                  <div>
                    Duration: <span className="font-bold">{ride.duration}</span>{" "}
                  </div>
                </div>
                <div className="text-green-500 mt-2">
                  {ride.status === "accepted" ? "Booked" : "Completed"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
