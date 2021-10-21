require('dotenv').config()
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const PATH_GOOGLE_SERVICE_ACCOUNT_KEYS = '../munchy-f94d6-a8c4842a0e70.json' //path to google cloud service account json file
const serviceAccount = require(PATH_GOOGLE_SERVICE_ACCOUNT_KEYS); 

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function testFirebase(){
   try {
        const snapshot = await db.collection('test').doc('test').set({data:'Test'})
        if (snapshot){
            console.log('Google fire-store Connected Successfully😀')
        }
   } catch (error) {
        console.log('Google fire-store Connection Failed, Please Check your settings')
   }
}



module.exports = {db, testFirebase}