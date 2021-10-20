var express = require('express')
const app = express()
var router = express.Router()
const axios = require('axios')
const bodyParser = require('body-parser')
const {db, testFirebase} = require('../controllers/firebase')


testFirebase();

const BASE_URL = process.env.BASE_URL
const AUTH_KEY = process.env.AUTH_KEY

//Get Quotes with Shipping Companies
router.post('/quotes', async function (req, res) {
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

//Create Shipment (Shipment is unpaid order)
router.post('/', async function(req,res){
    data = req.body
    axios.post(`${BASE_URL}/shipments`, data, {
        headers: {
            "Authorization": AUTH_KEY
        }
    }).then(async function(result) {
        shipmentId = result.data.shipment.easyship_shipment_id
        resultData = result.data
        const shipmentCollection = await db.collection('shipments').doc(shipmentId).set(resultData)
        res
            .status(201)
            .json(resultData) 
    }).catch(err=>{
        res
            .status(400)
            .json({
                errorMessage:err.response.statusText,
                errors: err.response.data.errors
            })
    })
})

//Get all shipments
router.get('/', async function(req,res){
    let allShipmentsArray = []
    const allShipments = await db.collection('shipments').get();
    allShipments.forEach(function(result){
        allShipmentsArray.push(result.data())
    })
    res
        .status(200)
        .json(allShipmentsArray)
})

// Get a single Shipment
router.get('/:shipmentId', async function(req,res){
    let id = req.params.shipmentId
    const shipment = await db.collection('shipments').doc(id).get()
    if (!shipment.exists){
        res
            .status(404)
            .json({errorMessage:"Shipments doesn't exists"})
    } 
    res
        .status(200)
        .json(shipment.data()) 
})

// Delete a shipment

router.delete('/:shipmentId', async function(req,res){
    let id = req.params.shipmentId
    const shipment = await db.collection('shipments').doc(id).delete()
    res
        .status(204)
        .json({})
})

module.exports = {router,app} 
