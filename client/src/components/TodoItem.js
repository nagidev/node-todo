import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setTodos } from '../features/todos'

function TodoItem({ apiUrl, id, text, done }) {
    const [editing, setEditing] = useState(false)
    const [newTask, setNewTask] = useState(text)
    const [newDone, setNewDone] = useState(done)
    const dispatch = useDispatch()

    const deleteTodo = async () => {
        const response = await axios
            .delete(`${apiUrl}/todos/${id}`)
            .catch((err) => { console.log('Error: ', err) })

        dispatch(setTodos(response.data))
    }

    const updateTodo = async () => {
        const response = await axios
            .put(`${apiUrl}/todos/${id}`, { task: newTask, done: newDone })
            .catch((err) => { console.log('Error: ', err) })

        dispatch(setTodos(response.data))
        setEditing(false)
    }

    useEffect(() => {
        updateTodo()
    }, [newDone])

    return (
        <div className='todo-item'>
            {!editing ?
                <>
                    <input type="checkbox" defaultChecked={newDone} onChange={(event) => { setNewDone(event.target.checked) }} />
                    <p style={{ marginRight: "auto" }}>{text}</p>
                    <button onClick={() => { setEditing(true); setNewTask(text) }}>Edit</button>
                    <button onClick={() => { deleteTodo() }}>Delete</button>
                </>
                :
                <>
                    <input type="text" value={newTask} onChange={(event) => { setNewTask(event.target.value) }} className='w-100' />
                    <button onClick={() => { updateTodo() }}>Update</button>
                    <button onClick={() => { setEditing(false) }}>Cancel</button>
                </>
            }
        </div>
    )
}

export default TodoItem;
