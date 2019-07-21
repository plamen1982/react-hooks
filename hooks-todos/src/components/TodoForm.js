import React, { useState, useEffect, useContext } from 'react';
import TodosContext from '../context';

export default function TodoForm() {
    const [todoText, setTodoText] = useState("");
    const { state: { currentTodo = {} }, dispatch } = useContext(TodosContext);

    useEffect(() => {
        if(currentTodo.text) {
            setTodoText(currentTodo.text);
        } else {
            setTodoText("")
        }
    }, [currentTodo.id]);

    function handleSumbit(event) {
        event.preventDefault();
        if(currentTodo.text) {
            dispatch({ type: "UPDATE_TODO", payload: todoText })
        } else {
            dispatch({ type: "ADD_TODO", payload: todoText });
        }
        setTodoText("");
    }

    return(
        <form onSubmit={handleSumbit} className="flex justify-center p-5">
            <input 
                onChange={event => setTodoText(event.target.value)}
                value={todoText}
                type="text"  
                className="text-white bg-orange-600"
                />
        </form>
    );
}