import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { PagesReservaPage } from '../../pages-reserva/pages-reserva';
import { ListaDeEsperaMenuPage } from '../../pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu';
import { PagesJuegosMenuPage } from '../../pages-juegos/pages-juegos-menu/pages-juegos-menu';
import { PagesPedidosAltaPage } from '../../pages-pedidos/pages-pedidos-alta/pages-pedidos-alta';

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

  juegos(){
    this.navCtrl.push(PagesJuegosMenuPage, {"pedido": "asñdlkwdowiw"}); //TODO Aca deberia enviarsele el id del pedido al cual se le aplicara el descuento
  }

  pedido(){
    this.navCtrl.push(PagesPedidosAltaPage);
  }

}
