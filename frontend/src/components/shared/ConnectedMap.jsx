import React, { useEffect, useRef } from "react";
import { GOOGLE_API_KEY } from "../../utils/constants";

const ConnectedMap = ({ pickUp, destination }) => {
  const mapRef = useRef(null);
  console.log("We got", pickUp, destination);
  useEffect(() => {
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
        const map = new window.google.maps.Map(mapRef.current, {
          center: pickUp, // Center map on the starting location
          zoom: 8, // Adjust zoom level as needed
        });

        // Add markers for the two locations
        new window.google.maps.Marker({
          position: pickUp,
          map,
          title: "Start Location",
        });

        new window.google.maps.Marker({
          position: destination,
          map,
          title: "End Location",
        });

        // Draw a red line connecting the two locations
        const line = new window.google.maps.Polyline({
          path: [pickUp, destination],
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
        line.setMap(map);

        // Adjust map bounds to fit both locations
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(pickUp);
        bounds.extend(destination);
        map.fitBounds(bounds);
      } else {
        console.error("Google Maps API not loaded properly.");
      }
    };

    loadGoogleMapsScript();
  }, [pickUp, destination]);

  return (
    <div
      id="connected-map"
      ref={mapRef}
      style={{ height: "550px", width: "650px" }}
    ></div>
  );
};

export default ConnectedMap;
