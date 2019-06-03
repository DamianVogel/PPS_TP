import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { PagesReservaPage } from '../../pages-reserva/pages-reserva';
import { ListaDeEsperaMenuPage } from '../../pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu';

@IonicPage()
@Component({
  selector: 'pages-cliente-menu',
  templateUrl: 'pages-cliente-menu.html',
})
export class PagesClienteMenuPage {

  reservaPage = PagesReservaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetController: ActionSheetController) {
  }

  reserva(){
    this.navCtrl.push(this.reservaPage);
  }

  listaDeEspera(){
    this.navCtrl.push(ListaDeEsperaMenuPage);
  }

}
