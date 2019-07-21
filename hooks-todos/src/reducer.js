import uuidv4 from "uuid/v4";

export default function reducer(state, action) {
    function isTodoTextExistAlready(todoText) {
        if(state.todos.findIndex(todo => todo.text.toLowerCase() === todoText.toLowerCase()) > -1) {
            return true;
        }
    }

    function isTodoTextEmpty(todoText) {
        if(!todoText) {
            return true;
        }
    }

    switch (action.type) {
        case "GET_TODOS": 
            return {
                ...state,
                todos: action.payload
            }

        case "ADD_TODO":
            const isTodoTextEmptyForAdd = isTodoTextEmpty(action.payload.text);
            const isTodoTextExistAlreadyForAdd = isTodoTextExistAlready(action.payload.text);

             if(isTodoTextEmptyForAdd) {
                return state;
            }

            if(isTodoTextExistAlreadyForAdd) {
                return state;
            }
            
            const addedTodos = [...state.todos, action.payload];

            return {
                ...state,
                todos: addedTodos
            };

        case "UPDATE_TODO": 
            // const isTodoTextEmptyForUpdate = isTodoTextEmpty(action.payload);
            // const isTodoTextExistAlreadyForUpdate = isTodoTextExistAlready(action.payload);

            // if(isTodoTextEmptyForUpdate) {
            //     return state;
            // }

            // if(isTodoTextExistAlreadyForUpdate) {
            //     return state;
            // }
            const updatedTodo = { ...action.payload }
            const updatedTodoIndex = state.todos.findIndex(
                todo => todo.id === state.currentTodo.id
            );
        const updatedTodos = [
            ...state.todos.slice(0, updatedTodoIndex),
            updatedTodo,
            ...state.todos.slice(updatedTodoIndex + 1)
        ];
            return {
                ...state,
                currentTodo: {},
                todos: updatedTodos
            }

        case "SET_CURRENT_TODO":
            return {
                ...state,
                currentTodo: action.payload
            }

        case "TOOGLE_TODO":
            const toggledTodos = state.todos.map(todo =>
                todo.id === action.payload.id ? action.payload : todo
            );
            return {
                ...state,
                todos: toggledTodos
            };

        case "REMOVE_TODO":
            const filteredTodos = state.todos.filter(todo => todo.id !== action.payload.id);
            const removedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo
            return {
                ...state,
                todos: filteredTodos,
                currentTodo: removedTodo
            };

        default:
            return state;
    }
}
