const { Router } = require('express')
const dispenser = require('./dispenser')
const revenue = require('./record')

const router = Router()

router.use('/', dispenser)
router.use('/', revenue)

module.exports = router
