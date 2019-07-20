import React, { useState, useEffect, useContext } from 'react';
import TodosContext from '../context';

export default function TodoForm() {
    const [todo, setTodo] = useState("");
    const { state: { currentTodo = {} }, dispatch } = useContext(TodosContext);

    useEffect(() => {
        if(currentTodo.text) {
            setTodo(currentTodo.text);
        }

    }, [currentTodo.id]);

    function handleSumbit(event) {
        event.preventDefault();
        if(currentTodo.text) {
            dispatch({ type: "UPDATE_TODO", payload: todo })
        } else {
            dispatch({ type: "ADD_TODO", payload: todo });
        }
        setTodo("");
    }

    return(
        <form onSubmit={handleSumbit} className="flex justify-center p-5">
            <input 
                onChange={event => setTodo(event.target.value)}
                value={todo}
                type="text"  
                className="text-white bg-orange-600"
                />
        </form>
    );
}