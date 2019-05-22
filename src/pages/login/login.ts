import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ModalController, ToastController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../clases/usuario';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { User } from '../../providers';
import { SpinnerPage } from "../../pages/pages-spinner/pages-spinner";
//import { PagesDuenoPage } from "../index";

import { PagesDuenoPage } from '../pages-dueno/pages-dueno';
import { PagesSupervisorPage } from '../pages-supervisor/pages-supervisor';
import { PagesEmpleadoPage } from '../pages-empleado/pages-empleado';
import { PagesClientePage } from '../pages-cliente/pages-cliente';
import { PagesRegistroUsuarioPage } from '../pages-registro-usuario/pages-registro-usuario';



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
  loginFields: { email: string, clave: string } = {
    email: '',
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

    if(this.loginFields.email == "" || this.loginFields.clave == ""){

      let toast = this.toastCtrl.create({
        message: "Debe ingresar todos los datos.",
        duration: 4000,
        position: 'top' //middle || top
      });
      toast.present();

    } else {

      let modal = this.modalVotacion.create(SpinnerPage);
      modal.present();
      this.coleccionTipadaFirebase = this.objFirebase.collection<Usuario>('SP_usuarios', ref=> ref.orderBy('id','asc'));
      this.ListadoUsuariosObservable = this.coleccionTipadaFirebase.valueChanges();
      this.ListadoUsuariosObservable.subscribe(x => {
        console.info("Conexión correcta con Firebase. Usuarios: ", x);
      });
      
      this.ListadoUsuariosObservable.forEach((el)=>{
        this.accounts = el;
        let user: Usuario = this.accounts.find(elem => ( this.loginFields.email == elem.email && (this.loginFields.clave == elem.clave)));
        modal.dismiss();
        if( user !== undefined ) {
          sessionStorage.setItem('usuario', JSON.stringify(user));
          this.ModalVotacion();
          //this.navCtrl.push(MainPage);
          
          /* SWITCH CON DIFERENTES PERFILES */
          //// minima diferencia

          switch (user.perfil) {
            case 'supervisor':
              this.navCtrl.push(PagesSupervisorPage);
              break;
          
            case 'empleado':
              this.navCtrl.push(PagesEmpleadoPage);
              break;
            
            case 'cliente':
              this.navCtrl.push(PagesClientePage);
              break;

            case 'dueno':
              this.navCtrl.push(PagesDuenoPage);
              break;
            
            default:
              
              break;
          }
     
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

  
  loginDueno(){
    this.loginFields.email ="dueño@comanda.com";
    this.loginFields.clave ="1234";
  }

  loginSupervisor(){
    this.loginFields.email ="supervisor@comanda.com";
    this.loginFields.clave ="1234";
  }

  loginCocinero(){
    this.loginFields.email ="cocinero@comanda.com";
    this.loginFields.clave ="1234";
  }

  loginMozo(){
    this.loginFields.email ="mozo@comanda.com";
    this.loginFields.clave ="1234";
  }

  loginBarTender(){
    this.loginFields.email ="bartender@comanda.com";
    this.loginFields.clave ="1234";
  }

  loginDelivery(){
    this.loginFields.email ="delivery@comanda.com";
    this.loginFields.clave ="1234";
  }

  loginCliente(){
    this.loginFields.email ="cliente@comanda.com";
    this.loginFields.clave ="1234";
  }

  loginClienteRegistrado(){
    this.loginFields.email ="clienteregistrado@comanda.com";
    this.loginFields.clave ="1234";
  }




  login(){

    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Dueno',
          icon: 'people',
          cssClass: 'loginProfileButton',
          handler: () => {
            this.loginDueno();
          }
        },{
          text: 'Supervisor',
          icon: 'people',
          cssClass: 'loginProfileButton',
          handler: () => {
            this.loginSupervisor();
          }
        },{
            text: 'Cocinero',
            icon: 'people',
            cssClass: 'loginProfileButton',
            handler: () => {
              this.loginCocinero();
            }        
        },{
          text: 'Mozo',
          icon: 'people',
          cssClass: 'loginProfileButton',
          handler: () => {
            this.loginMozo();
          }        
        },{
          text: 'Bar Tender',
          icon: 'people',
          cssClass: 'loginProfileButton',
          handler: () => {
            this.loginBarTender();
          }        
      },{
        text: 'Delivery',
        icon: 'people',
        cssClass: 'loginProfileButton',
        handler: () => {
          this.loginDelivery();
        }        
      },{
        text: 'Cliente',
        icon: 'people',
        cssClass: 'loginProfileButton',
        handler: () => {
          this.loginCliente();
        }        
      },{
        text: 'Cliente Registrado',
        icon: 'people',
        cssClass: 'loginProfileButton',
        handler: () => {
          this.loginClienteRegistrado();
        }        
      }
      
    ]
    });
    actionSheet.present();

  }

  irARegistro()
  {
    this.navCtrl.push(PagesRegistroUsuarioPage);
  }

}
