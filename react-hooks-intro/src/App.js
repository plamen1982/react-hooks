import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(true);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0 });

  function handleCount() {
    setCount(previousCount => previousCount + 1);
  }

  function toggleLight() {

    setIsOn((prevIsOn) => !prevIsOn);
  }

  useEffect(() => {
    document.title = `useEffect runs ${count} times`;
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove');
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
    </>
  );
}

export default App;
