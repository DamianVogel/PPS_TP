import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../../clases/usuario';
import { ListaDeEsperaMenuPage } from '../../pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu';

@IonicPage()
@Component({
  selector: 'pages-cliente-anonimo-menu',
  templateUrl: 'pages-cliente-anonimo-menu.html',
})
export class PagesClienteAnonimoMenuPage {

  usuario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  listaDeEspera(){
    this.navCtrl.push(ListaDeEsperaMenuPage);
  }

}
