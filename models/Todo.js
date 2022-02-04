const mongoose = require('mongoose')

const TodosSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('todos', TodosSchema)