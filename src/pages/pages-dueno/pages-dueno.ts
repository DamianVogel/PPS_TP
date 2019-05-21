import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuario } from '../../clases/usuario';
import { SpinnerPage } from "../../pages/pages-spinner/pages-spinner";


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

      let usuario = new Usuario();

      usuario.apellido = 'Test';
      usuario.nombre = 'test';
      usuario.email = 'test@gmail.com';
      usuario.dni  = 12345678;
      usuario.cuil = 20123456782;
      usuario.foto = 'rutaFoto'
      
      //this.objFirebase.createId()
      //return new Promise<any>((resolve, reject) =>{
        this.objFirebase
            .collection("SP_usuarios")
            .add({
              //'hola':'chau', 'chau':'nos vemos'
              'apellido': usuario.apellido,
              'nombre':usuario.nombre,
              'email': usuario.email,
              'dni': usuario.dni,
              'cuil': usuario.cuil,
              'foto': usuario.foto 
            })
            .then(res => {}, err => console.log(err));
    }
  }
}





