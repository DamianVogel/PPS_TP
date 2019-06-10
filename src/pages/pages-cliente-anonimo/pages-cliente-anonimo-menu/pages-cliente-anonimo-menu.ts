import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../../clases/usuario';
import { ListaDeEsperaMenuPage } from '../../pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu';
import { PagesJuegosMenuPage } from '../../pages-juegos/pages-juegos-menu/pages-juegos-menu';

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

  juegos(){
    this.navCtrl.push(PagesJuegosMenuPage, {"pedido": "asñdlkwdowiw"}); //TODO Aca deberia enviarsele el id del pedido al cual se le aplicara el descuento
  }

}
