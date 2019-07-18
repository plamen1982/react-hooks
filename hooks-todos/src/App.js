import React, { useContext, useReducer } from 'react';
import { UserContext } from './index';

export default function App() {

  const initialState = {
    count: 0
  }

  function reducer(state, action) {
    switch(action.type) {
      case 'increment': 
        return { count: state.count + 1 };
      case 'decrement': 
        return { count: state.count - 1 };
      case 'reset': 
        return { count: 0 };
      default: 
        return initialState
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  // const value = useContext(UserContext);
  return (
    <div>
      <div>Count was clicked: {state.count}</div>
      <button className="border p-1 m-1" onClick={() => { dispatch({ type: 'increment' })}} >Increment</button>
      <button className="border p-1 m-1" onClick={() => { dispatch({ type: 'decrement' })}} >Decrement</button>
      <button className="border p-1 m-1" onClick={() => { dispatch({ type: 'reset' })}} >Reset</button>
    </div>
  );
}