import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pedido } from '../../../clases/Pedido';
import { ProductoService } from '../../../services/producto-service';
import { Producto } from '../../../clases/Producto';

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-alta',
  templateUrl: 'pages-pedidos-alta.html',
})
export class PagesPedidosAltaPage {

  pedido: Pedido;
  productos: Array<Producto>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public productoService: ProductoService) {
      this.pedido = new Pedido();
      this.pedido.mesa = navParams.get("mesa");
      this.pedido.cliente = navParams.get("cliente");
      this.productoService.traerProductos().subscribe(productos => {
        this.productos = productos;
        console.log(this.productos);
      })
  }

}
