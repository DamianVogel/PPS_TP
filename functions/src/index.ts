import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

admin.initializeApp();


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'duenolacomanda@gmail.com',
      pass: 'practica2019'
  }
});

exports.validarMail= functions.https.onRequest((req, res)=>{

   const db = admin.firestore()
    db.collection("SP_usuarios").doc(req.query.id).update("estado","Registrado").then((data)=>{
        return res.send('Registro completo!');
   }).catch((data)=>{
    return res.send(' Error!');
   });

})


exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    
      // getting dest email by query string
      const dest = req.query.dest;
      const idUsr = req.query.id;

      const mailOptions = {
          from: 'La comanda <duenolacomanda@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
          to: dest,
          subject: 'Verificacion de correo', // email subject
          html:" <p style='font-size: 16px;'>Te damos la bienvenida a la familia de LA COMANDA EQUIPO 5. <br>Por favor haz click en el siguiente enlace para terminar el proceso de registro de usuario:<br><a href='https://us-central1-practicaprofesional-dbd4e.cloudfunctions.net/validarMail?id="+idUsr+"'>Validar Mail</a></p>"

      };

      // returning result
      return transporter.sendMail(mailOptions, (erro:any, info:any) => {
          if(erro){
              return res.send(erro.toString());
          }
          return res.send('Sended');
      });
  });    
});


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





