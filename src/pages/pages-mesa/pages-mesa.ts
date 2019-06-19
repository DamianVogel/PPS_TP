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


  TomarPedido()
  {
    this.navCtrl.push(PagesPedidosAltaPage, {"idMesa": this.mesa.id, "idUsuario": this.mesa.usuario.id})
  }


  TraerPedidos()
  {
    
    console.log("mesa: " +this.mesa.id);
    this.pedidosProv.TraerPedidos().subscribe((pedidos)=>{
      
      this.listaPedidos = pedidos.filter((pedido)=>{
        console.log("id<mesaPedido: " +pedido.mesa);
        return pedido.mesa == this.mesa.id && pedido.estado != "entregado";


      });

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesMesaPage');
  }

}
