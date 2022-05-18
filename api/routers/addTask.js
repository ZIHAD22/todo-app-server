const { Router } = require('express')
const AddTask = require('../models/AddTask')

const addTask = Router()

addTask.get('/getAllTask', async (req, res) => {
  const findAllData = await AddTask.find()
  res.json(findAllData)
})

addTask.get('/taskComplete', async (req, res) => {
  const _id = req.query.id
  const query = { _id }

  const findTaskToComplited = await AddTask.findOneAndUpdate(query, {
    completed: true,
  })

  res.json(findTaskToComplited)
})

addTask.delete('/taskDelete', async (req, res) => {
  const _id = req.query.id
  const query = { _id }

  const deleteTask = await AddTask.findOneAndDelete(query)

  res.json(deleteTask)
})

addTask.post('/addTask', async (req, res) => {
  const addTask = new AddTask(req.body)
  const result = await addTask.save()
  console.log(result)
  res.json(result)
})

module.exports = addTask
