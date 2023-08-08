const express = require('express')
const router = express.Router()

const controllers = require('../controller/record/record')

router.get('/revenue', controllers.getRevenue)

module.exports = router
