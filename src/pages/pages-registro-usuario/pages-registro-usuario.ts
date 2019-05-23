import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage } from 'firebase';

/**
 * Generated class for the PagesRegistroUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-registro-usuario',
  templateUrl: 'pages-registro-usuario.html',
})
export class PagesRegistroUsuarioPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private builder: FormBuilder,
    public toastCtrl: ToastController,
    private camera: Camera
  ) {}

  nombre = new FormControl('', [
    Validators.required
  ]);
  apellido = new FormControl('', [
    Validators.required
  ]);

  dni = new FormControl('', [
    Validators.required,
    Validators.minLength(7)
  ]);

  email = new FormControl('', [
    Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])
    
  ]);
  
  clave = new FormControl('', [
    Validators.required
  ]);
  

  registroForm: FormGroup = this.builder.group({
    nombre: this.nombre,
    apellido: this.apellido,
    dni: this.dni,
    email: this.email,
    clave: this.clave,
    
  });

  Registrar()
  {
    let usuario= new Usuario();

     usuario.nombre= this.registroForm.get('nombre').value;
     usuario.apellido= this.registroForm.get('apellido').value;
     usuario.dni= this.registroForm.get('dni').value;
     usuario.email= this.registroForm.get('email').value;
     usuario.clave= this.registroForm.get('clave').value;
     usuario.perfil= "Cliente";

    
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
     
     const fotos = storage().ref('clientes/'+ this.registroForm.get('dni').value);
     const imagen= 'data:image/jpeg;base64,'+result;
     fotos.putString(imagen,'data_url');

    
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesRegistroUsuarioPage');
  }

}
