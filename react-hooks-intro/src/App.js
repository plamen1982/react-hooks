import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(true);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0 });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    }
  }, [count]);

  function handleMouseMove(event) {
    setMousePosition({
      x: event.pageX,
      y: event.pageY,
    });
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
        Netword status: {isOnline ? <p>Your network status is Online</p>: <p>Your network status in Offline</p>}
      </div>
    </>
  );
}

export default App;
