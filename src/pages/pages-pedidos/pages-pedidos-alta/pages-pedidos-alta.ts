import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pedido } from '../../../clases/Pedido';

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-alta',
  templateUrl: 'pages-pedidos-alta.html',
})
export class PagesPedidosAltaPage {

  pedido: Pedido;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pedido = new Pedido();
    this.pedido.mesa = navParams.get("mesa");
    this.pedido.cliente = navParams.get("cliente");
  }

}
