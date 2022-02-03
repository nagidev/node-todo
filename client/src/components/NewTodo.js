import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { setTodos } from '../features/todos'

function NewTodo({ apiUrl }) {
    const [task, setTask] = useState('')
    const dispatch = useDispatch()

    const addTodo = async (task) => {
        console.log('Sending POST request with data: ', task)

        const response = await axios
            .post(apiUrl + '/todos', { task })
            .catch((err) => { console.log('Error: ', err) })

        console.log('Response recieved: ', response.data)
        dispatch(setTodos(response.data))
        setTask('')
    }

    return (
        <div>
            <input type="text" placeholder='New to-do item...' value={task} onChange={(event) => { setTask(event.target.value) }} />
            <button onClick={() => { addTodo(task) }}>Add</button>
        </div>
    )
}

export default NewTodo;
