import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  function handleCount() {
    setCount(previousCount => previousCount + 1);
  }
  return (
    <button onClick={handleCount}>Count, clicked {count} times</button>
  );
}

export default App;
