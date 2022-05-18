const express = require('express')
const cors = require('cors')
const addTask = require('./api/routers/addTask')
require('dotenv').config()
const mongoose = require('mongoose')

main().catch((err) => console.log(err))

async function main() {
  try {
    console.log(process.env.DB_USER)
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.87xmq.mongodb.net/?retryWrites=true&w=majority`,
    )
  } finally {
    console.log('database Connected')
  }
}

// app
const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())
app.use(addTask)

// router
app.get('/', (req, res) => {
  res.send('all ok')
})

// server running
app.listen(port, () => {
  console.log(`server is running on this url http://localhost:${port}`)
})
