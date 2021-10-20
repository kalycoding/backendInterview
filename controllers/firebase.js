const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../munchy-f94d6-a8c4842a0e70.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function testFirebase(){
   try {
        const snapshot = await db.collection('test').get()
        console.log("Google fire-store Connected Successfully")
   } catch (error) {
        console.log('Google fire-store Connection Failed, Please Check your settings')
   }
}



module.exports = {db, testFirebase}