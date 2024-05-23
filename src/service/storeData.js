const { FIREBASE_DB } = require('../FirebaseConfig')
const { collection, doc, addDoc } = require('firebase/firestore')

const storeData = (id, data) => {
   const db = new Firestore();
 
   const predictCollection = db.collection(FIREBASE_DB, 'prediction');
   return predictCollection.doc(id).set(data);
}

module.exports = storeData;