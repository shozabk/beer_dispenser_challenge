const express = require('express')
const router = express.Router()

const controllers = require('../controller/dispenser/dispenser')

router.post('/dispenser', controllers.createDispenser)
router.post('/dispenserOpenClose/:id', controllers.openCloseTap)

module.exports = router
