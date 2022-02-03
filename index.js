const express = require('express')
const cors = require('cors')
const fs = require('fs')

const PORT = 3001

const data = fs.readFileSync('./data.json')
let todos = JSON.parse(data)
let lastId = todos.length === 0 ? 0 : todos[todos.length - 1].id

const app = express()

app.use(cors())
app.use(express.json())

app
    .get('/todos', (req, res) => {
        // Get Todos
        console.log('Received GET request')
        res.send(todos)
    })
    .post('/todos', (req, res) => {
        // Add new todo
        console.log('Received POST request')

        if (req.body.task) {
            todos.push({ id: ++lastId, task: req.body.task, done: false })

            fs.writeFile('./data.json', JSON.stringify(todos), (err) => {
                if (err) {
                    const message = { message: "Could not save data!" }
                    res.status(500)
                    res.send(message)
                    console.log('File not saved')
                } else {
                    res.send(todos)
                }
            })
        } else {
            const message = { message: "Data incomplete!" }
            res.status(400)
            res.send(message)
        }
    })
    .put('/todos/:id', (req, res) => {
        // Update todo
        console.log('Received PUT request')
        const id = req.params.id

        if (id && req.body) {
            const task = req.body.task
            const done = req.body.done

            todos.forEach((todo, index) => {
                if (todo.id.toString() === id) {
                    todos[index].task = task
                    todos[index].done = done
                }
            })

            fs.writeFile('./data.json', JSON.stringify(todos), (err) => {
                if (err) {
                    const message = { message: "Could not save data!" }
                    res.status(500)
                    res.send(message)
                    console.log('File not saved')
                } else {
                    res.send(todos)
                }
            })
        } else {
            const message = { message: "Incomplete request data!" }
            res.status(400)
            res.send(message)
        }
    })
    .delete('/todos/:id', (req, res) => {
        // Delete todo
        console.log('Received DELETE request')

        const id = req.params.id

        if (id) {
            todos = todos.filter(todo => todo.id != id)

            fs.writeFile('./data.json', JSON.stringify(todos), (err) => {
                if (err) {
                    const message = { message: "Could not save data!" }
                    res.status(500)
                    res.send(message)
                    console.log('File not saved')
                } else {
                    res.send(todos)
                }
            })
        } else {
            const message = { message: "No id specified!" }
            res.status(400)
            res.send(message)
        }
    })

app.listen(PORT, function () { console.log(`Server started at port ${PORT}`) })