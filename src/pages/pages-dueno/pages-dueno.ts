import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuario } from '../../clases/usuario';
import { SpinnerPage } from "../../pages/pages-spinner/pages-spinner";
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage } from 'firebase';


/**
 * Generated class for the PagesDuenoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-dueno',
  templateUrl: 'pages-dueno.html',
})
export class PagesDuenoPage {

  loginFields: { nombre: string, apellido: string, clave:string, email:string, dni: number, cuil: number } = {
    nombre: '',
    apellido: '',
    clave:'',
    email:'',
    dni: null,
    cuil: null
  };


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private objFirebase: AngularFirestore,
    public modalVotacion: ModalController,
    private camera: Camera
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesDuenoPage');
  }

  
  Alta() {
    
    if(this.loginFields.email == "" || this.loginFields.clave == ""){

      let toast = this.toastCtrl.create({
        message: "Debe ingresar todos los datos.",
        duration: 4000,
        position: 'top' //middle || top
      });
      toast.present();

    } else {

        this.objFirebase
            .collection("SP_usuarios")
            .add({
              'apellido': this.loginFields.apellido,
              'nombre':this.loginFields.nombre,
              'email': this.loginFields.email,
              'clave': this.loginFields.clave,
              'dni': this.loginFields.dni,
              'cuil': this.loginFields.cuil,
              'foto': '' 
            })
            .then(res => {

              console.log(res);
              let toast = this.toastCtrl.create({
                message: "Registracion Exitosa!",
                duration: 3000,
                position: 'middle' //middle || top
              });
              toast.present();

              this.loginFields.apellido = '';
              this.loginFields.nombre = '';
              this.loginFields.email = '';
              this.loginFields.clave = '';
              this.loginFields.dni = null;
              this.loginFields.cuil = null;
              


            }, err => console.log(err));
    }
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
     
     const fotos = storage().ref('clientes/'+ this.loginFields.dni);
     const imagen= 'data:image/jpeg;base64,'+result;
     fotos.putString(imagen,'data_url');

    
  }






}





