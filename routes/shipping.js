var express = require('express')
const app = express()
var router = express.Router()
const bodyParser = require('body-parser')
const {db, testFirebase} = require('../controllers/firebase')

testFirebase();
shipping = router.post('/quotes', async function (req, res) {
    res.json({statusMessage: 'Ok'})
})


module.exports = {shipping,app} 
