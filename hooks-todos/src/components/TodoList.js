import React, { useContext } from 'react';
import TodosContext from '../context';

export default function TodoList() {
    const { state, dispatch } = useContext(TodosContext);
    const { todos } = state;
    const title = todos.length > 0 
                    ? `${todos.length} Todos`
                    : `Nothing To Do!`;
    return (
        <div className="container mx-auto max-w-md text-center font-mono">
            <h1 className="text-bold">{title}</h1>
            <ul className="list=reset text-white p-o">
                {state.todos.map(todo => (
                    <li 
                        key={todo.id}
                        className="flex items-center
                        bg-orange-600 border-black border-dashed border-2 my-2 py-4"
                    >
                        
                        <span
                            onDoubleClick={() => dispatch({ type: "TOOGLE_TODO", payload: todo })}
                            className={`flex-1 ml-12 cursor-pointer ${todo.complete && "line-through text-grey-900"}`}
                        >{todo.text}</span>
                        <button>
                            <img src="https://icon.now.sh/edit/0050c5" 
                                alt="Edit Icon"
                                className="h-6"
                            />
                        </button>
                        <button>
                            <img src="https://icon.now.sh/delete/8b0000" 
                                alt="Delete Icon"
                                className="h-6"
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}