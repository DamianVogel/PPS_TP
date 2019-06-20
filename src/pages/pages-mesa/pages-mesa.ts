import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { Pedido } from '../../clases/Pedido';
import { PagesPedidosAltaPage } from '../pages-pedidos/pages-pedidos-alta/pages-pedidos-alta';

/**
 * Generated class for the PagesMesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-mesa',
  templateUrl: 'pages-mesa.html',
})
export class PagesMesaPage {

  mesa;
  listaPedidos:Array<Pedido>;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private pedidosProv: PedidosProvider
  ) {
    this.listaPedidos= new Array<Pedido>();
    this.mesa=this.navParams.get("mesa");
    this.TraerPedidos();
   
  }

  AceptarPedido(pedido: Pedido)
  {
    this.pedidosProv.AceptarPedido(pedido);
  }

  ServirPedido(pedido: Pedido)
  {
    this.pedidosProv.ServirPedido(pedido);
  }


  TomarPedido()
  {
    this.navCtrl.push(PagesPedidosAltaPage, {"mesa": this.mesa, "cliente": this.mesa.usuario.id, "tipo": "restaurant"})
  }


  TraerPedidos()
  {
    
    console.log("mesa: " +this.mesa.id);
    this.pedidosProv.TraerPedidos().subscribe((pedidos)=>{
      console.log(pedidos)
      this.listaPedidos = pedidos.filter((pedido)=>{
       
        return pedido.mesaId == this.mesa.id && pedido.estado != "entregado";


      });

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesMesaPage');
  }

}
