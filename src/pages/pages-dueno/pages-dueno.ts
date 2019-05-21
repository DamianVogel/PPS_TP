import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuario } from '../../clases/usuario';


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

  loginFields: { nombre: string, apellido: string, dni: number, cuil: number } = {
    nombre: '',
    apellido: '',
    dni: null,
    cuil: null
  };


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private objFirebase: AngularFirestore
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesDuenoPage');
  }

  
  Alta() {
    let usuario = new Usuario();

    usuario.apellido = 'Test';
    usuario.nombre = 'test';
    usuario.email = 'test@gmail.com'
    
    //this.objFirebase.createId()
    return new Promise<any>((resolve, reject) =>{
      this.objFirebase
          .collection("SP_usuarios")
          .add({
            //'hola':'chau', 'chau':'nos vemos'
            'apellido': usuario.apellido,
            'nombre':usuario.nombre,
            'email': usuario.email 
          })
          .then(res => {}, err => reject(err));
  });


  }






}





