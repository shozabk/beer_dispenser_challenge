require('dotenv').config()
const express = require('express')
const app = express()
const { database } = require('./database/db')
const { PORT } = require('./utils/config')
const router = require('./routes/router')

app.use(express.json())

app.use('/api', router)

database()

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
)
