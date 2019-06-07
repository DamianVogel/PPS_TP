import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  IonicPage,
  NavController,
  ModalController,
  ToastController,
  ActionSheetController
} from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Usuario } from "../../clases/usuario";

import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";

import { User } from "../../providers";
import { SpinnerPage } from "../../pages/pages-spinner/pages-spinner";

import { PagesDuenoMenuPage } from "../pages-dueno/pages-dueno-menu/pages-dueno-menu";
import { PagesSupervisorPage } from "../pages-supervisor/pages-supervisor";
import { PagesEmpleadoPage } from "../pages-empleado/pages-empleado";
import { PagesClienteMenuPage } from "../pages-cliente/pages-cliente-menu/pages-cliente-menu";
import { PagesClienteAnonimoPage } from "../pages-cliente-anonimo/pages-cliente-anonimo";
import { PagesRegistroUsuarioPage } from "../pages-registro-usuario/pages-registro-usuario";
import { BartenderMenuPage } from "../pages-bartender/pages-bartender-menu/pages-bartender-menu";
import { CocineroMenuPage } from "../pages-cocinero/pages-cocinero-menu/pages-cocinero-menu";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  coleccionTipadaFirebase: AngularFirestoreCollection<Usuario>;
  ListadoUsuariosObservable: Observable<Usuario[]>;

  usuarioLogeado: any;

  loginFields: { email: string, clave: string } = {
    email: "",
    clave: ""
  };

  splash = true;
  accounts: Array<Usuario>;

  private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public modalVotacion: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public objFirebase: AngularFirestore
  ) {
    this.translateService.get("LOGIN_ERROR").subscribe(value => {
      this.loginErrorString = value;
    });
  }

  doLogin() {
    if (this.loginFields.email == "" || this.loginFields.clave == "") {
      this.navCtrl.push(PagesClienteAnonimoPage);
    } else {
      let modal = this.modalVotacion.create(SpinnerPage);
      modal.present();
      this.coleccionTipadaFirebase = this.objFirebase.collection<Usuario>("SP_usuarios");
      this.ListadoUsuariosObservable = this.coleccionTipadaFirebase.valueChanges();
      this.ListadoUsuariosObservable.forEach(el => {
        this.accounts = el;
        let user: Usuario = this.accounts.find(
          elem =>
            this.loginFields.email == elem.email &&
            this.loginFields.clave == elem.clave
        );
        modal.dismiss();
        if (user !== undefined) {
          sessionStorage.setItem("usuario", JSON.stringify(user));

          /* SWITCH CON DIFERENTES PERFILES */

          switch (user.perfil) {
            case "supervisor":
              this.navCtrl.push(PagesSupervisorPage);
              break;

            case "empleado":

              switch(user.tipo) {
                case "cocinero":
                  this.navCtrl.push(CocineroMenuPage);
                  break;

                case "bartender":
                  this.navCtrl.push(BartenderMenuPage);
                  break;

                default:
                  this.navCtrl.push(PagesEmpleadoPage);
                  break;
              }
              break;

            case "cliente":
              this.navCtrl.push(PagesClienteMenuPage);
              break;

            case "dueno":
              this.navCtrl.push(PagesDuenoMenuPage);
              break;

            default:
              break;
          }
        } else {
          let toast = this.toastCtrl.create({
            message: "Acceso denegado.",
            duration: 4000,
            position: "bottom" //middle || top
          });
          toast.present();
        }
      });
    }
  }

  loadLoginFields(email: string, clave: string) {
    this.loginFields.email = email;
    this.loginFields.clave = clave;
  }

  login() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Dueño",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("dueño@comanda.com", "1234");
          }
        },
        {
          text: "Supervisor",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("supervisor@comanda.com", "1234");
          }
        },
        {
          text: "Cocinero",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("cocinero@comanda.com", "1234");
          }
        },
        {
          text: "Mozo",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("mozo@comanda.com", "1234");
          }
        },
        {
          text: "Bartender",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("bartender@comanda.com", "1234");
          }
        },
        {
          text: "Delivery",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("delivery@comanda.com", "1234");
          }
        },
        {
          text: "Cliente Anónimo",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("", "");
          }
        },
        {
          text: "Cliente Registrado",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("clienteregistrado@comanda.com", "1234");
          }
        }
      ]
    });
    actionSheet.present();
  }

  irARegistro() {
    this.navCtrl.push(PagesRegistroUsuarioPage);
  }
}
