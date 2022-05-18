const { Schema, model } = require('mongoose')

const AddTaskSchema = new Schema({
  taskName: {
    type: String,
    trim: true,
  },
  taskDescription: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

const AddTask = model('task', AddTaskSchema)

module.exports = AddTask
