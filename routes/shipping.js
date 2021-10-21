var express = require('express')
const app = express()
var router = express.Router()
const axios = require('axios')
const bodyParser = require('body-parser')
const {db, testFirebase} = require('../controllers/firebase')


testFirebase();

const BASE_URL = process.env.BASE_URL
const BASE_URL_V1 = process.env.BASE_URL
const AUTH_KEY = process.env.AUTH_KEY


/*Create Shipment (Shipment is unpaid order)
it saved the shipment data to firestore
*/
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

/*
Retrieve all shipments data from google firestore
*/
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

/*
Retrieve a single shipment data from google firestore
*/
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

/*
Search for shipment data in firestore, 
update in easyship.com and update the firestore with new data
*/
router.put('/:shipmentId', async function(req,res){
    let id = req.params.shipmentId
    data = req.body
    const shipment = await db.collection('shipments').doc(id).get()
    if (!shipment.exists){
        res
            .status(404)
            .json({errorMessage:"Shipments doesn't exists"})
    }
    res.json(shipment.data())

    // Todo: Update Functionality here
})

/*
Delete a single shipment data from google firestore
*/
router.delete('/:shipmentId', async function(req,res){
    let id = req.params.shipmentId
    const shipment = await db.collection('shipments').doc(id).delete()
    res
        .status(204)
        .json({})
})


/*
Delete all shipments data from google firestore
*/
router.delete('/', async function(req,res){
    let id = req.params.shipmentId
    const shipment = await db.collection('shipments').get()
    shipment.forEach(async function(result){
       await db.collection('shipments').doc(result.data().shipment.easyship_shipment_id).delete()
    })
    res
        .status(204)
        .json({})
})


module.exports = {router,app} 
