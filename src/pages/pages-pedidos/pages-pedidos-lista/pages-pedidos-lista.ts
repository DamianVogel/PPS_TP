import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Pedido } from '../../../clases/Pedido';

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-lista',
  templateUrl: 'pages-pedidos-lista.html',
})
export class PagesPedidosListaPage {

  pedido: Pedido;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.pedido = navParams.get("pedido");
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
