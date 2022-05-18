const { Router } = require('express')
const AddTask = require('../models/AddTask')
const jwt = require('jsonwebtoken')

const addTask = Router()

// middleware

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).send({ message: 'UnAuthorization' })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: 'Forbidden Access' })
    }
    req.decoded = decoded
    next()
  })
}

addTask.get('/getAllTask', verifyJwt, async (req, res) => {
  const email = req.query.email
  if (req.decoded.email === email) {
    const query = { email }
    const findAllData = await AddTask.find(query)
    res.json(findAllData)
  } else {
    return res.status(403).send({ message: 'Forbidden Access' })
  }
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

addTask.post('/getJwt', async (req, res) => {
  const user = req.body
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1 d',
  })

  res.send({ accessToken })
})

addTask.post('/addTask', async (req, res) => {
  const addTask = new AddTask(req.body)
  const result = await addTask.save()
  res.json(result)
})

module.exports = addTask
