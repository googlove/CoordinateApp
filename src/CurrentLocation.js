import React, { useEffect, useState } from "react";
import "./CameraScreen.css";

const CurrentLocation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  useEffect(() => {
    // Check if the geolocation API is supported by the browser
    if ("geolocation" in navigator) {
      const getLocation = () => {
        // Enable location permission
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Extract the latitude and longitude from the position object
            const { latitude, longitude } = position.coords;
            setCoordinates({ latitude, longitude });
          },
          (error) => {
            console.log("Error getting geolocation:", error);
          }
        );
      };

      if (isLocationEnabled) {
        // Enable location permission
        getLocation();
      } else {
        // Disable location permission
        setCoordinates(null);
      }
    } else {
      console.log("Geolocation API not supported.");
    }
  }, [isLocationEnabled]);

  const toggleLocationPermission = () => {
    setIsLocationEnabled(!isLocationEnabled);
  };

  useEffect(() => {
    // On the first load, request location permission by default
    if ("geolocation" in navigator && !coordinates) {
      toggleLocationPermission();
    }
  }, []);

  return (
    <div style={{ color: "#fff" }}>
      <h3>Current geo-location</h3>
      <button
        className={`location-button ${isLocationEnabled ? "enabled" : ""}`}
        onClick={toggleLocationPermission}
      >
        {isLocationEnabled ? "Disable Location" : "Enable Location"}
      </button>
      {coordinates ? (
        <div>
          Latitude: {coordinates.latitude} <br />
          Longitude: {coordinates.longitude}
        </div>
      ) : (
        <div>Loading coordinates...</div>
      )}
    </div>
  );
};

export default CurrentLocation;
