var express = require('express')
var router = express.Router()

var bodyParser = require('body-parser')
app = express()
app.use(bodyParser.json())


const qnController = require('../controllers/qn_controllers')

router.get('/', qnController.showQn)
router.post('/', qnController.postQn)

module.exports = router
