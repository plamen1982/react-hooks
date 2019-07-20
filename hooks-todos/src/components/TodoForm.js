import React, { useState, useReducer, useContext } from 'react';
import TodosContext from '../context';
export default function TodoForm() {
    const [todo, setTodo] = useState("");
    const { state, dispatch } = useContext(TodosContext);

    function handleSumbit(event) {
        event.preventDefault();
        dispatch({ type: "ADD_TODO", payload: todo });
        setTodo("");
    }

    return(
        <form onSubmit={handleSumbit} className="flex justify-center p-5">
            <input 
                onChange={event => setTodo(event.target.value)}
                value={todo.text}
                type="text"  
                className="text-white bg-orange-600"
                />
        </form>
    );
}