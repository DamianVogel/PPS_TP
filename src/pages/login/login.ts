import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ModalController, ToastController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../clases/usuario';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { User } from '../../providers';
import { SpinnerPage } from "../../pages/pages-spinner/pages-spinner";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  coleccionTipadaFirebase:AngularFirestoreCollection<Usuario>;
  ListadoUsuariosObservable: Observable<Usuario[]>;

  usuarioLogeado: any;

  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  loginFields: { nombre: string, clave: string } = {
    nombre: '',
    clave: ''
  };

  splash = true;
  accounts: Array<Usuario>;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public modalVotacion: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private objFirebase: AngularFirestore/*,
    private firebase: Firebase*/) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {

    if(this.loginFields.nombre == "" || this.loginFields.clave == ""){

      let toast = this.toastCtrl.create({
        message: "Debe ingresar todos los datos.",
        duration: 4000,
        position: 'top' //middle || top
      });
      toast.present();

    } else {

      let modal = this.modalVotacion.create(SpinnerPage);
      modal.present();
      this.coleccionTipadaFirebase = this.objFirebase.collection<Usuario>('users_recursada', ref=> ref.orderBy('id','asc'));
      this.ListadoUsuariosObservable = this.coleccionTipadaFirebase.valueChanges();
      this.ListadoUsuariosObservable.subscribe(x => {
        console.info("Conexión correcta con Firebase. Usuarios: ", x);
      });
      
      this.ListadoUsuariosObservable.forEach((el)=>{
        this.accounts = el;
        let user: Usuario = this.accounts.find(elem => ( this.loginFields.nombre == elem.nombre && (this.loginFields.clave == elem.clave)));
        modal.dismiss();
        if( user !== undefined ) {
          sessionStorage.setItem('usuario', JSON.stringify(user));
          this.ModalVotacion();
          //this.navCtrl.push(MainPage);
        } else {
          let toast = this.toastCtrl.create({
            message: "Acceso denegado.",
            duration: 4000,
            position: 'bottom' //middle || top
          });
          toast.present();
        }
      });

    }

  }

  ModalVotacion() {
    //this.modalVotacion.create(PagesModalVotacionPage).present();
  }

  loginAdmin(){
    this.loginFields.nombre ="admin@gmail.com";
    this.loginFields.clave ="11";
  }

  loginInvitado(){
    this.loginFields.nombre ="invitado@gmail.com";
    this.loginFields.clave ="22";
  }

  loginUsuario(){
    this.loginFields.nombre ="usuario@gmail.com";
    this.loginFields.clave ="33";
  }

  loginTester(){
    this.loginFields.nombre ="tester@gmail.com";
    this.loginFields.clave ="55";
  }

  login(){

    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Admin',
          icon: 'people',
          cssClass: 'loginProfileButton',
          handler: () => {
            this.loginAdmin();
          }
        },{
          text: 'Invitado',
          icon: 'people',
          cssClass: 'loginProfileButton',
          handler: () => {
            this.loginInvitado();
          }
        },{
          text: 'Usuario',
          icon: 'people',
          cssClass: 'loginProfileButton',
          handler: () => {
            this.loginUsuario();
          }
        },{
          text: 'Tester',
          icon: 'people',
          cssClass: 'loginProfileButton',
          handler: () => {
            this.loginTester();
          }
        }
      ]
    });
    actionSheet.present();

  }

}
