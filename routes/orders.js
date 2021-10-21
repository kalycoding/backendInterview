var express = require('express')
const app = express()
var router = express.Router()
const axios = require('axios')
const { db } = require('../controllers/firebase')
require('dotenv').config()



const BASE_URL_V1 = process.env.BASE_URL_V1
const AUTH_KEY = process.env.AUTH_KEY


router.post('/', async function(req,res){
    data = req.body
    const paymentId = await db.collection('paymentorders').doc(req.body.shipments[0].easyship_shipment_id).get()
    const shipId = await db.collection('shipments').doc(req.body.shipments[0].easyship_shipment_id).get()
    if (!shipId.exists){
        res
            .status(404)
            .json({errorMessage:"Shipment does'nt exists"})
    }
    if (paymentId.exists){
        res
            .status(200)
            .json({message:'This shipment has already been paid'})
    }
    axios.post(`${BASE_URL_V1}/labels`, data, {
        headers: {
            "Authorization": AUTH_KEY
        }
    }).then(async function(result) {
        shipmentId = result.data.labels[0].easyship_shipment_id
        const paymentCollection = await db.collection('paymentorders').doc(shipmentId).set(result.data)
        res
            .status(201)
            .json(result.data)
    }).catch(err=>{
        res
            .status(400)
            .json({errorMessage:err.message})
    })
})


/* Retrieve all paid shipments from firestore */
router.get('/', async function(req,res){
    const payment = await db.collection('paymentorders').get()
    const paymentArr = []
    payment.forEach(function(result){
        paymentArr.push(result.data())
    })
    res
        .status(200)
        .json(paymentArr)
})

/* Retrieve a single paid shipment data from google firestore */
router.get('/:paidShipmentId', async function(req,res){
    const paidShipmentId = req.params.paidShipmentId
    const paymentData = await db.collection('paymentorders').doc(paidShipmentId).get()
    if (!paymentData.exists) {
        res
            .status(404)
            .json({errorMessage:'Payment shipment not found'})
    }
    res
        .status(200)
        .json(paymentData.data())
})

module.exports = router