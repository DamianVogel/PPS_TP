import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pedido } from '../../../clases/Pedido';
import { ProductoService } from '../../../services/producto-service';
import { Producto } from '../../../clases/Producto';
import { getImageURL } from '../../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-alta',
  templateUrl: 'pages-pedidos-alta.html',
})
export class PagesPedidosAltaPage {

  pedido: Pedido;
  productos: Array<Producto>;

  propiedadesFotos: Array<string> = ["foto1", "foto2", "foto3"];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService) {
    this.pedido = new Pedido();
    this.productos = new Array<Producto>();
    this.pedido.mesa = navParams.get("mesa");
    this.pedido.cliente = navParams.get("cliente");
    this.inicializarProductos();
    //TODO Seguir logica
  }

  inicializarProductos() {
    this.productoService.traerProductos().subscribe(productos => {
      productos.forEach((producto, index) => {
        this.productos.push(new Producto(producto.nombre, producto.descripcion, producto.tipo, producto.tiempo, producto.precio));
        this.propiedadesFotos.forEach(propString => {
          if (producto[propString] !== "") {
            this.productos[index][propString] = "assets/img/spinner.gif";
            getImageURL(producto[propString]).then(data => {
              this.productos[index][propString] = data;
            })
          }
        })
      });
    })
  }

}
