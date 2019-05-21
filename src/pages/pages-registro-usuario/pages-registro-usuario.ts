import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../../clases/usuario';

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
    public toastCtrl: ToastController
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



  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesRegistroUsuarioPage');
  }

}
