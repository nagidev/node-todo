const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv/config')

const Todo = require('./models/Todo')
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app
    .get('/todos', (req, res) => {
        // Get Todos
        console.log('Received GET request')

        Todo
            .find()
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ message: err }))
    })
    .get('/todos/:id', (req, res) => {
        // Get One Todo
        console.log('Received GET request for single todo')

        Todo
            .findById(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ message: err }))
    })
    .post('/todos', (req, res) => {
        // Add new todo
        console.log('Received POST request')

        if (req.body.task) {
            // Create new todo
            const todo = new Todo({
                task: req.body.task
            })

            // Save new data
            todo
                .save()
                .then((data) => {
                    Todo
                        .find()
                        .then(data => res.json(data))
                        .catch(err => res.status(500).json({ message: err }))
                })
                .catch(err => res.status(500).json({ message: err }))

        } else {
            res.status(400).json({ message: "Data incomplete!" })
        }
    })
    .put('/todos/:id', (req, res) => {
        // Update todo
        console.log('Received PUT request')
        const id = req.params.id

        if (id && req.body) {
            const task = req.body.task
            const done = req.body.done

            Todo
                .updateOne(
                    { _id: id },
                    { $set: { task, done } }
                )
                .then((data) => {
                    Todo
                        .find()
                        .then(data => res.json(data))
                        .catch(err => res.status(500).json({ message: err }))
                })
                .catch(err => res.status(500).json({ message: err }))
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
            Todo
                .deleteOne({ _id: id })
                .then((data) => {
                    Todo
                        .find()
                        .then(data => res.json(data))
                        .catch(err => res.status(500).json({ message: err }))
                })
                .catch(err => res.status(500).json({ message: err }))
        } else {
            const message = { message: "No id specified!" }
            res.status(400)
            res.send(message)
        }
    })

// Connect to MongoDB
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Database connected."))
    .catch(err => console.log(err))

// Start server
app.listen(process.env.PORT, function () { console.log(`Server started at port ${process.env.PORT}.`) })