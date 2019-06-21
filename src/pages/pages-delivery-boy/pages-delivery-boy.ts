import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../services/pedidos-service';
import { Pedido } from '../../clases/Pedido';

/**
 * Generated class for the PagesDeliveryBoyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-delivery-boy',
  templateUrl: 'pages-delivery-boy.html',
})
export class PagesDeliveryBoyPage {

  pedidos: Array<Pedido>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidosService: PedidoService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesDeliveryBoyPage');
  }


  CargarPedidosPendientes(filtro: string){
    
    this.pedidosService.traerPedidos().subscribe( pedidos => {
      var array = new Array<Pedido>();
      pedidos.forEach(pedido => {
        array.push(pedido);      
      });
    
      
      this.pedidos = array.filter( pedido =>   pedido.tipo == 'delivery');
      //this.pedidos = array.filter( pedido => pedido.estado == filtro );
      
      this.pedidos.forEach( pedido => {
        pedido.productos.forEach( (producto,index) => {
          producto.id = index;
        })
      })

      console.log(this.pedidos);

      

      /*
      this.pedidos.forEach( pedido =>{
        pedido.productos = pedido.productos.filter( producto => producto.tipo == 'comida');
      })
      */
     
    })
   
  }





}
