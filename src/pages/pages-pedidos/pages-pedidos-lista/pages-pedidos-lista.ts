import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Pedido } from '../../../clases/Pedido';
import { Producto } from '../../../clases/Producto';
import { round } from '../../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-lista',
  templateUrl: 'pages-pedidos-lista.html',
})
export class PagesPedidosListaPage {

  pedido: Pedido;
  productos: Array<Producto>;

  costo: number;
  duracion: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.pedido = navParams.get("pedido");
    this.productos = navParams.get("productos");
    this.costo = 0;
    this.duracion = 0;
    this.calcularPedido();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  calcularPedido(){
    let productosEnPedido: Array<any> = new Array<any>();
    this.productos.forEach((producto)=>{
      this.pedido.productos.forEach((productoEnPedido)=>{
        if(producto.nombre === productoEnPedido.nombre){
          productosEnPedido.push({
            "costo": producto.precio * productoEnPedido.cantidad,
            "duracion": producto.tiempo
          });
        }
      })
    })
    productosEnPedido.forEach(producto=>{
      this.costo += producto.costo;
      this.duracion += producto.duracion;
    })
    this.costo = round(this.costo,2);
  }

}
