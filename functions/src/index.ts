import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

admin.initializeApp();

exports.createUser = functions.firestore
    .document('SP_usuarios/{userId}')
    .onCreate(async (snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      //const newValue = snap.data();

      // access a particular field as you would any JS property
      
        //const name = newValue!.name;
        const payload = {
            notification: {
                title: 'Prueba',
                //body: `${data} is following your content!`,
                body: `Damian is watching you!`,
                icon: 'https://goo.gl/Fz9nrQ'
            }
          }
      
          // ref to the device collection for the user
          const db = admin.firestore()
          const devicesRef = db.collection("devices")
          //.where('userId', '==', userId)
      
      
          // get the user's tokens and send notifications
          const devices = await devicesRef.get();
      
          const tokens = new Array();
      
          // send a notification to each device token
          devices.forEach(result => {
            const token = result.data().token;
      
            tokens.push( token )
          })
    
    
    
        
        return admin.messaging().sendToDevice(tokens, payload)
      // perform desired operations ...
    });





