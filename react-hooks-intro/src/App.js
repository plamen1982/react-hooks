import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(true);

  function handleCount() {
    setCount(previousCount => previousCount + 1);
  }

  function toggleLight() {

    setIsOn((prevIsOn) => !prevIsOn);
  }

  useEffect(() => {
    document.title = `useEffect runs ${count} times`
  });

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
    </>
  );
}

export default App;
