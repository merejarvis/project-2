var express = require('express')
var router = express.Router()

const ansController = require('../controllers/ans_controllers')


router.get('/:id', ansController.showQn)
router.post('/', ansController.postAns)

module.exports = router
