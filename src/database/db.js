const mongoose = require('mongoose')
const { MONGO_URI } = require('../utils/config')

const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  try {
    mongoose.connect(MONGO_URI, connectionParams)
    console.log('Database connected successfully')
  } catch (error) {
    console.log(error)
    console.log('Database connection failed')
  }
})

module.exports = { database }
