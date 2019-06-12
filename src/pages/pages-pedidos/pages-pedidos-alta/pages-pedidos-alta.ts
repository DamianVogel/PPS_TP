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
        this.productos.push(new Producto(producto.id,producto.nombre, producto.descripcion,  producto.tiempo, producto.precio, producto.tipo));
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
    
    pedido.cliente = 'TEST 20190612';
    pedido.estado = 'pendiente';
    pedido.productos = Array<Producto>();
    
    let producto1 = new Producto();
    let producto2 = new Producto();
    let producto3 = new Producto();
    
    producto1.nombre = 'nombretest1';
    producto1.estado = 'pendiente';
    producto1.tipo = 'bebida';

    producto2.nombre = 'nombretest2';
    producto2.estado = 'pendiente';
    producto2.tipo = 'bebida';
    
    producto3.nombre = 'nombretest3';
    producto3.estado = 'pendiente';
    producto3.tipo = 'comida';

    pedido.productos.push(producto1);
    pedido.productos.push(producto2);
    pedido.productos.push(producto3);


    pedido.mesa = '2';
    pedido.tiempo_espera = 30;

    

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
