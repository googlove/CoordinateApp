import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import "./CameraScreen.css";

const CameraScreen = () => {
  const webcamRef = useRef(null); // Reference to access the video element of the Webcam component
  const [coordinates, setCoordinates] = useState({}); // State to store the captured coordinates from the video frame
  const [isCapturing, setIsCapturing] = useState(false); // State to track capturing status

  // Function to capture coordinates from the video frame
  const captureCoordinates = () => {
    const video = webcamRef.current.video; // Get the video element from the Webcam component
    const canvas = document.createElement("canvas"); // Create a canvas element to draw the video frame
    const context = canvas.getContext("2d"); // Get the 2D drawing context of the canvas

    // Set canvas dimensions to match the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data from the center pixel of the canvas
    const imageData = context.getImageData(
      canvas.width / 2,
      canvas.height / 2,
      1,
      1
    ).data;
    console.log("imageData", imageData);
    // Calculate and set the coordinates
    const longitude = imageData[0];
    const latitude = imageData[1];
    const altitude = imageData[2];

    setCoordinates({ longitude, latitude, altitude });
  };

  // Function to start capturing coordinates
  const startCapture = () => {
    setIsCapturing(true);
  };

  // Function to stop capturing coordinates
  const stopCapture = () => {
    setIsCapturing(false);
  };

  // Set up an effect to run when the `isCapturing` state changes
  useEffect(() => {
    let interval = null; //variable to store the interval ID

    if (isCapturing) {
      interval = setInterval(captureCoordinates, 1000); // Capture coordinates every 1 second
    } else {
      clearInterval(interval); // Clear the interval when capturing is stopped
    }

    return () => clearInterval(interval); // Clean up function to clear the interval when the component unmounts or `isCapturing` changes
  }, [isCapturing]);

  return (
    <section className="camera-wrapper" style={{display: 'flex'}}>
      <div className="camera-screen">
        <video
          src="/planet1.mp4"
          autoPlay
          muted
          loop
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <Webcam ref={webcamRef} />{" "}
      {/* Render the Webcam component and assign the ref */}
      <section id="coordinates">
      <h3>Camera's current RGB values</h3>
        <div>Longitude: {coordinates.longitude}</div>
        <div>Latitude: {coordinates.latitude}</div>
        <div>Altitude: {coordinates.altitude}</div>
        <div className="controls">
          {/* Toggle between Start Capture and Stop Capture buttons based on the capturing status */}
          {isCapturing ? (
            <button className="stop-button" onClick={stopCapture}>
              Stop Capture
            </button>
          ) : (
            <button className="start-button" onClick={startCapture}>
              Start Capture
            </button>
          )}
        </div>
      </section>
    </section>
  );
};

export default CameraScreen;
