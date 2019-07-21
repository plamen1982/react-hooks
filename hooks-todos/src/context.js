import { createContext } from 'react';

const todos = [];

const TodosContext = createContext({ todos, currentTodo: {} });

export default TodosContext;