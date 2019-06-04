import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Mesa } from '../../clases/mesa';
import { SpinnerPage } from "../../pages/pages-spinner/pages-spinner";
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage } from 'firebase';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the AltaMesaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'alta-mesa',
  templateUrl: 'alta-mesa.html'
})
export class AltaMesaComponent {

  
  numero = new FormControl(null, [
    Validators.required
  ]);

  cantidadComensales = new FormControl(null, [
    Validators.required
  ]);

  tipoMesa = new FormControl('', [
    Validators.required
  ]);

  

  altaMesaForm: FormGroup = this.builder.group({
    
    numero: this.numero,
    cantidadComensales: this.cantidadComensales,
    tipoMesa: this.tipoMesa,
   
  });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private objFirebase: AngularFirestore,
    public modalVotacion: ModalController,
    private builder: FormBuilder,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner
  ) {
    
  }

  AltaMesa(){
    var nuevaMesa= new Mesa();  

    nuevaMesa.numero= parseInt(this.altaMesaForm.get('numero').value);
    nuevaMesa.cantidadComensales= parseInt(this.altaMesaForm.get('cantidadComensales').value);
    nuevaMesa.tipoMesa= this.altaMesaForm.get('tipoMesa').value;
    
      
      //this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, nuevaMesa).then((encodedData) => {
  
          //console.log(encodedData);
          //nuevaMesa.codigoQr = encodedData;
  
          this.objFirebase.collection("SP_mesas")
          .add({
                  
              'numero': nuevaMesa.numero,
              'cantidadComensales':nuevaMesa.cantidadComensales,
              'tipoMesa': nuevaMesa.tipoMesa,
              'estado':'disponible',
              'timestamp': Date()
                  
          }).then(res => {

                  console.log(res);
                  let toast = this.toastCtrl.create({
                    message: "Alta de Mesa correcta!",
                    duration: 3000,
                    position: 'middle' //middle || top
                  });
                  toast.present();

                  this.altaMesaForm.reset();

                }, err => console.log(err));

    //  }, (err) => {
    //      console.log("Error occured : " + err);
    //  });                 
     
    
  }

  Volver(){
    this.navCtrl.pop();
  }

  async SacarFoto(){

    const options: CameraOptions = {
      quality: 50,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }
    
     let hora= new Date();
     
     const result= await this.camera.getPicture(options);
     
     const fotos = storage().ref('mesas/'+ this.altaMesaForm.get('numero').value);
     const imagen= 'data:image/jpeg;base64,'+result;
     fotos.putString(imagen,'data_url');   
  }
}
