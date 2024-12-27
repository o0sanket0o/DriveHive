import React, { useEffect, useState } from "react";
import Map from "./Map";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import { FETCH_RIDES_API } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { BOOK_RIDE_API } from "../../utils/constants";
import ConnectedMap from "./ConnectedMap";
import { setLoading } from "../../redux/loadingSlice";
import { GET_COORDINATES } from "../../utils/constants";
import { setStartSlice } from "../../redux/startSlice";
import { setEndSlice } from "../../redux/endSlice";

const CheckRides = () => {
  const startLocation = useSelector((state) => state.start.startValue);
  const endLocation = useSelector((state) => state.end.endValue);
  const [pickUp, setPickUp] = useState({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ lat: 0, lng: 0 });
  const userId = useSelector((state) => state.auth.user.id);
  // console.log("User id ", userId);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loading.isLoading);
  const [rides, setRides] = useState([]);
  const fetchLocation = async (address, turn) => {
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
      const location = res.data.data;
      if (turn === 0) {
        // console.log("Object is ", obj);
        setPickUp({
          lat: location.ltd,
          lng: location.lng,
        });
      } else {
        // console.log("Object is ", obj);
        setDestination({
          lat: location.ltd,
          lng: location.lng,
        });
      }
      // console.log("We got", data);
      // console.log("In the use effect the coordinates are ", startLocation);
      // console.log("In the use effect the coordinates are ", endLocation);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchLocation(startLocation, 0);
    fetchLocation(endLocation, 1);
    console.log("Pickup is", pickUp);
    console.log("Destination is", destination);
    const fetchRides = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(FETCH_RIDES_API, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("Response is", res.data);
        let rides = res.data;
        let availableRides = rides.filter((ride) => ride.user === null);
        setRides(availableRides);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchRides();
  }, [setRides]);
  const bookRide = async (rideId) => {
    const link = BOOK_RIDE_API;
    try{
      const res = await axios.put(link, {userId: userId, rideId: rideId},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        toast.success(res.data.message);
        setRides((prevRides) =>
          prevRides.filter((ride) => ride._id !== rideId)
        );
    }
    catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <Navbar />
          <div className="flex flex-col justify-between items-center mt-16 sm:flex-row">
            <div className="ml-2 mt-8 flex flex-col">
              <h1 className="text-2xl min-w-[40vw] font-semibold mb-6 lg:text-3xl">
                Available Rides:
              </h1>
              {
                rides.length === 0? (
                  <>No rides found</>
                ) : (
                  <div className="flex flex-col gap-4">
                {rides.map((ride) => (
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
                        Duration:{" "}
                        <span className="font-bold">{ride.duration}</span>{" "}
                      </div>
                    </div>
                    <div className="w-full mt-4 flex justify-end">
                    <button className="mr-0 border-[#4d878f] border bg-none px-4 py-2 rounded-md hover:bg-[#4d878f] hover:duration-500" onClick={() => bookRide(ride._id)}>
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
                )
              }
              
            </div>
            <div className="flex justify-center items-center w-[75%] ">
              <ConnectedMap pickUp={pickUp} destination={destination}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckRides;
