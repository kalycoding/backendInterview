var express = require('express')
const app = express()
var router = express.Router()
const axios = require('axios')
const { db } = require('../controllers/firebase')
require('dotenv').config()


const BASE_URL = process.env.BASE_URL
const AUTH_KEY = process.env.AUTH_KEY

/*
Retrieve shipments rate from easyship.com
*/
router.get('/', async function (req, res) {
    data = req.body
    axios.post(`${BASE_URL}/rates`, data=data, {
        headers: {
            "Authorization": AUTH_KEY
        }
    }).then(result => {
        res
            .status(200)
            .json(result.data)
    }).catch(err=>{
        res
            .status(err.response.status)
            .json({
                errorMessage:err.response.statusText,
                errors: err.response.data.errors
            })
    })
})

module.exports = router