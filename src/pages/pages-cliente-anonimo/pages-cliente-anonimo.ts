import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from '../../clases/usuario';
import { PagesClienteAnonimoMenuPage } from './pages-cliente-anonimo-menu/pages-cliente-anonimo-menu';
import { showAlert } from '../../environments/environment';

@IonicPage()
@Component({
  selector: 'pages-cliente-anonimo',
  templateUrl: 'pages-cliente-anonimo.html',
})
export class PagesClienteAnonimoPage {

  usuario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController) {
    this.usuario = new Usuario;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesClientePage');
  }

  acceder() {
    if(this.usuario.nombre === undefined || this.usuario.nombre === ""){
      showAlert(this.alertController,"Error","Debe ingresar un nombre");
    } else {
      sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
      this.navCtrl.push(PagesClienteAnonimoMenuPage);
    }
  }

}
