import React, { useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { setTodos } from '../features/todos'

import TodoItem from './TodoItem';

function TodoList({ apiUrl }) {
    const todos = useSelector((state) => state.todosReducer.todos)
    const dispatch = useDispatch()

    const fetchTodos = async () => {
        const response = await axios
            .get(apiUrl + '/todos')
            .catch((err) => { console.log('Error: ', err) })

        dispatch(setTodos(response.data))
    }

    useEffect(() => {
        fetchTodos()
        // eslint-disable-next-line
    }, [])

    return (
        <div className='w-100 flex-column'>
            {todos && todos.map((todo) => (
                <TodoItem
                    apiUrl={apiUrl}
                    key={todo.id}
                    id={todo.id}
                    text={todo.task}
                    done={todo.done}
                />
            ))}
        </div>
    )
}

export default TodoList;
