import React, { useEffect, useRef } from "react";
import { GOOGLE_API_KEY } from "../../utils/constants";
import { useSelector } from "react-redux";


const Map = () => {
  const latitude = useSelector(state => state.location.latitude);
  const longitude = useSelector(state => state.location.longitude);
  console.log("Latitude and longitude in the map component are", latitude, longitude);
  const mapRef = useRef(null);
  useEffect(() => {
    console.log("Came in use effect.");
    const loadGoogleMapsScript = () => {
      if (!document.getElementById("googleMaps")) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;
        script.id = "googleMaps";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        window.initMap = initMap;
      } else {
        initMap(); // Script already loaded, directly initialize the map
      }
    };
    const initMap = () => {
      if (window.google && window.google.maps) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude}, // Latitude and Longitude for Delhi
          zoom: 10, // Zoom level
        });
      } else {
        console.error("Google Maps API not loaded properly.");
      }
    };
    
    // loadGoogleMapsScript();
  },[latitude, longitude]);

  return (
    <div>
      {/* <div className="w-full"
       id="map" ref={mapRef}
        style={{ height: "550px", width: "650px" }}>
        </div>  */}
    </div>
  );
};

export default Map;
