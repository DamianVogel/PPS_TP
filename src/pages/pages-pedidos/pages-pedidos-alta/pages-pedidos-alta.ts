import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ModalController } from 'ionic-angular';
import { Pedido } from '../../../clases/Pedido';
import { ProductoService } from '../../../services/producto-service';
import { Producto } from '../../../clases/Producto';
import { getImageURL, SPINNER_IMG, showAlert } from '../../../environments/environment';
import { PagesPedidosListaPage } from '../pages-pedidos-lista/pages-pedidos-lista';
import { PedidoService } from '../../../services/pedidos-service';

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-alta',
  templateUrl: 'pages-pedidos-alta.html',
})
export class PagesPedidosAltaPage {

  prodABuscar: string;
  botonHabilitado:boolean = true;

  pedido: Pedido;
  productos: Array<Producto>;
  productosFiltrados: Array<Producto>;

  propiedadesFotos: Array<string> = ["foto1", "foto2", "foto3"];
  detallesProductos: Array<any>;

  pedidoService: PedidoService;

  constructor(public modalController: ModalController,
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService) {
    this.pedido = new Pedido();
    this.productos = new Array<Producto>();
    this.productosFiltrados = new Array<Producto>();
    this.detallesProductos = new Array<any>();
    this.pedido.mesa = navParams.get("mesa");
    this.pedido.cliente = navParams.get("cliente");
    let usuario = JSON.parse(sessionStorage.getItem('usuario')); 
    if(usuario.tipo==="cliente"){
      this.pedido.estado = "Solicitado";
    } else if(usuario.tipo==="mozo"){
      this.pedido.estado = "Pendiente";
    }
    this.inicializarProductos();
  }

  inicializarProductos() {
    this.productoService.traerProductos().subscribe(productos => {
      productos.forEach((producto, index) => {
        this.productosFiltrados.push(new Producto(producto.id, producto.nombre, producto.descripcion, producto.tiempo, producto.precio, producto.tipo));
        this.productos.push(new Producto(producto.id, producto.nombre, producto.descripcion, producto.tiempo, producto.precio, producto.tipo));
        this.detallesProductos[producto.nombre] = false;
        this.propiedadesFotos.forEach(propString => {
          if (producto[propString] !== "") {
            this.productosFiltrados[index][propString] = SPINNER_IMG;
            this.productos[index][propString] = SPINNER_IMG;
            getImageURL(producto[propString]).then(data => {
              this.productosFiltrados[index][propString] = data;
              this.productos[index][propString] = data;
            })
          }
        })
      });
      console.log(this.productos);
    })
  }

  miPedido(myEvent) {
    let popover = this.popoverCtrl.create(PagesPedidosListaPage, {"pedido": this.pedido});
    popover.present({
      ev: myEvent
    });
  }

  search() {
    this.productosFiltrados = this.productos.filter(producto => {
      return producto.nombre.toLowerCase().indexOf(this.prodABuscar.toLowerCase()) > -1;
    });
  }

  mostrarDetalles(nombre: string) {
    (this.detallesProductos[nombre]) ? this.detallesProductos[nombre] = false : this.detallesProductos[nombre] = true;
  }

  cargar(nombre: string) {
    let alert = this.alertController.create({
      title: 'Seleccione cantidad',
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: data => {
            if (Number(data.cantidad) <= 0) {
              showAlert(this.alertController, "Error", "La cantidad debe ser mayor a 0");
            } else {
              if (this.pedido.productos.filter((producto) => { return producto.nombre === nombre; }).length === 1) {
                this.pedido.productos.forEach((producto, index) => {
                  if (producto.nombre === nombre) {
                    this.pedido.productos[index].cantidad += Number(data.cantidad);
                  }
                })
              } else {
                this.pedido.productos.push({
                  "nombre": nombre,
                  "cantidad": Number(data.cantidad),
                  "estado": "en proceso"
                });
              }
              showAlert(this.alertController, "Exito", "Producto agregado al pedido");
            }
            console.log(this.pedido);
          }
        }
      ]
    });
    alert.present();
  }

}
