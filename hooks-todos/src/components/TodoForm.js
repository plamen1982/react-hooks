import React, { useState, useEffect, useContext } from 'react';
import TodosContext from '../context';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

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

    async function handleSumbit(event) {
        event.preventDefault();
        if(currentTodo.text) {
            dispatch({ type: "UPDATE_TODO", payload: todoText })
        } else {
           const response = await axios.post('https://hooks-api-fulxelnqo.now.sh/todos', {
                id: uuidv4,
                text: todoText,
                complete: false
            });

            dispatch({ type: "ADD_TODO", payload: response.data });
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