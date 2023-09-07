import React from 'react';
import CameraScreen from './CameraScreen';
import CurrentLocation from './CurrentLocation';

const App = () => {
  return (
      <div className="camera-container">
        <CameraScreen />
        <CurrentLocation />
      </div>
  );
};

export default App;
