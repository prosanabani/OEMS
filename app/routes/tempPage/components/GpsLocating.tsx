import React, { useEffect, useState } from 'react';

function GpsLocating() {
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     const watchId = navigator.geolocation.watchPosition(
  //       successCallback,
  //       errorCallback
  //     );
  //     return () => {
  //       navigator.geolocation.clearWatch(watchId);
  //     };
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // });

  // const successCallback = (position) => {
  //   setLatitude(position.coords.latitude);
  //   setLongitude(position.coords.longitude);
  //   console.log(latitude);
  //   console.log(longitude);
  // };

  // const errorCallback = (error) => {
  //   console.log("Error occurred: " + error.message);
  //   // Handle errors as needed
  // };

  // function success(pos) {
  //   const crd = pos.coords;

  //   console.log("Your current position is:");
  //   console.log(`Latitude : ${crd.latitude}`);
  //   console.log(`Longitude: ${crd.longitude}`);
  //   console.log(`More or less ${crd.accuracy} meters.`);
  // }

  // function error(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }

  // navigator.geolocation.getCurrentPosition(success, error);

  return (
    <div>
      <div>
        Latitude:
        <br />
        Longitude:
      </div>
    </div>
  );
}

export default GpsLocating;
