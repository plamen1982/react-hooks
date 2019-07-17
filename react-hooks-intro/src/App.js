import React, { useState, useEffect } from 'react';

const initialLocation = {
  longitude: 0,
  latitude: 0,
  speed: 0
}

function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(true);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0 });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [{ longitude, latitude, speed }, setLocation] = useState(initialLocation);
  let mounted = true;

  function handleCount() {
    setCount(previousCount => previousCount + 1);
  }

  function toggleLight() {
    setIsOn((prevIsOn) => !prevIsOn);
  }

  function handleOnlineStatus() {
    setIsOnline(true);
  }

  function handleOfflineStatus() {
    setIsOnline(false);
  }

  useEffect(() => {
    document.title = `useEffect runs ${count} times`;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);
    navigator.geolocation.getCurrentPosition((event) => {
      if(mounted) {
        setLocation({
          latitude: event.coords.latitude,
          longitude: event.coords.longitude,
          speed: event.coords.speed
        })
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
      mounted = false;
    }
  }, [count]);

  function handleMouseMove(event) {
    if(mounted) {
      setMousePosition({
        x: event.pageX,
        y: event.pageY
      });
    }
  }

  return (
    <>
      <button onClick={handleCount}>Count, clicked {count} times</button>
      <div>Toggle Light</div>
      <img
        src={
          isOn ? "https://icon.now.sh/highlight/fd0"
               : "https://icon.now.sh/highlight/aaa"
        }
        style={{
          height: "50px",
          width: "50px",
        }}
        alt="Flashlight"
        onClick={toggleLight}
      />
      <h2>Mouse position</h2>
      <div>
        {JSON.stringify(mousePosition, null, 2)}
      </div>
      <div>
        Netword status: {isOnline ? <p>Your network status is <b>Online</b></p>: <p>Your network status in <b>Offline</b></p>}
      </div>
      <div>
        Your coordinates are: { 
          <>
            <p>Latitude: <b>{latitude}</b></p>
            <p>Longitude: <b>{longitude}</b></p>
            <p>Speed: <b>{speed ? speed: 0}</b></p>
          </>
      }
      </div>
    </>
  );
}

export default App;
