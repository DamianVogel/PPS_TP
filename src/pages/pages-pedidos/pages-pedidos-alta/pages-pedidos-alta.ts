import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Pedido } from '../../../clases/Pedido';
import { ProductoService } from '../../../services/producto-service';
import { Producto } from '../../../clases/Producto';
import { PedidoService } from '../../../services/pedidos-service';
import { showAlert, spin} from '../../../environments/environment';
import { getImageURL } from '../../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-alta',
  templateUrl: 'pages-pedidos-alta.html',
})
export class PagesPedidosAltaPage {

  botonHabilitado:boolean = true;

  pedido: Pedido;
  productos: Array<Producto>;

  propiedadesFotos: Array<string> = ["foto1", "foto2", "foto3"];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService,
    public pedidoService: PedidoService,
    public modalCtrl: ModalController,    
    ) {
      this.pedido = new Pedido();
      this.pedido.mesa = navParams.get("mesa");
      this.pedido.cliente = navParams.get("cliente");
      this.productoService.traerProductos().subscribe(productos => {
        this.productos = productos;
      })
      this.inicializarProductos();

    }

  inicializarProductos() {
    this.productoService.traerProductos().subscribe(productos => {
      productos.forEach((producto, index) => {
        this.productos.push(new Producto(producto.id,producto.nombre, producto.descripcion, producto.tipo, producto.tiempo, producto.precio));
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


  //FUNCION DE TEST
  AltaPedido(){
    
    spin(this.modalCtrl, true);
    this.botonHabilitado = false;
    let pedido = new Pedido();
    
    pedido.cliente = 'prueba';
    pedido.estado = 'pendiente';
    pedido.productos = Array<Producto>();
    pedido.mesa = '1';
    pedido.tiempo_espera = 10;

    

    this.pedidoService.cargarPedido(pedido.dameJSON()).then(alta =>{
      
      spin(this.modalCtrl, false);
      console.log("el pedido fue cargado satisfactoriamente.");
      alert("el pedido fue cargado satisfactoriamente.");
      this.botonHabilitado = true;
    }).catch( error =>{
      console.log("error: ",error);
    });

  }




}
