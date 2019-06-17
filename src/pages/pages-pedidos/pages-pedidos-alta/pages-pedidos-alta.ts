import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ModalController, ToastController } from 'ionic-angular';
import { Pedido } from '../../../clases/Pedido';
import { ProductoService } from '../../../services/producto-service';
import { Producto } from '../../../clases/Producto';
import { getImageURL, SPINNER_IMG, showAlert, round, spin } from '../../../environments/environment';
import { PagesPedidosListaPage } from '../pages-pedidos-lista/pages-pedidos-lista';
import { PedidoService } from '../../../services/pedidos-service';

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-alta',
  templateUrl: 'pages-pedidos-alta.html',
})
export class PagesPedidosAltaPage {

  prodABuscar: string;
  botonHabilitado: boolean = true;

  pedido: Pedido;
  productos: Array<Producto>;
  productosFiltrados: Array<Producto>;

  propiedadesFotos: Array<string> = ["foto1", "foto2", "foto3"];
  detallesProductos: Array<any>;
  productosCargados: Array<any>;

  pedidoExistia: boolean = false;

  constructor(public toastController: ToastController,
    public modalController: ModalController,
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService,
    public pedidoService: PedidoService) {
    this.pedido = new Pedido();
    this.productos = new Array<Producto>();
    this.productosFiltrados = new Array<Producto>();
    this.detallesProductos = new Array<any>();
    this.productosCargados = new Array<any>();
    this.pedido.mesa = navParams.get("mesa");
    this.pedido.cliente = navParams.get("cliente");
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuario.tipo === "cliente") {
      this.pedido.estado = "solicitado";
    } else if (usuario.tipo === "mozo") {
      this.pedido.estado = "pendiente";
    }
    this.inicializarProductos();
    this.validarPedidoExistente();
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
    })
  }

  validarPedidoExistente() {
    this.pedidoService.traerPedidos().subscribe(pedidos => {
      let pedidoExistente: Array<Pedido> = pedidos.filter(pedido => {
        return pedido.cliente === this.pedido.cliente && pedido.mesa === this.pedido.mesa && pedido.estado !== 'pagado'
      });
      if (pedidoExistente.length === 1) {
        this.pedidoExistia = true;
        this.pedido = pedidoExistente[0];
        this.pedido.productos.forEach(producto => {
          this.productosCargados[producto.nombre] = true;
        });
      }
    })
  }

  miPedido() {
    if (this.pedido.productos.length === 0) {
      this.toastController.create({
        message: "Debe cargar un producto al menos!",
        duration: 3000,
        position: 'bottom'
      }).present();
    } else {
      let popover = this.popoverCtrl.create(PagesPedidosListaPage, { "pedido": this.pedido, "productos": this.productos });
      popover.present();
    }
  }

  search() {
    this.productosFiltrados = this.productos.filter(producto => {
      return producto.nombre.toLowerCase().indexOf(this.prodABuscar.toLowerCase()) > -1;
    });
  }

  mostrarDetalles(nombre: string) {
    (this.detallesProductos[nombre]) ? this.detallesProductos[nombre] = false : this.detallesProductos[nombre] = true;
  }

  cargar(nombre: string, tipo: string) {
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
                  "tipo": tipo,
                  "cantidad": Number(data.cantidad),
                  "estado": "pendiente"
                });
              }
              this.productosCargados[nombre] = true;
              this.calcularCostoYTiempo();
              this.toastController.create({
                message: "Producto agregado al pedido!",
                duration: 3000,
                position: 'bottom'
              }).present();
            }
          }
        }
      ]
    });
    alert.present();
  }

  sacar(nombre: string) {
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
          text: 'Sacar',
          handler: data => {
            if (Number(data.cantidad) <= 0) {
              showAlert(this.alertController, "Error", "La cantidad debe ser mayor a 0");
            } else {
              this.pedido.productos.forEach((producto, index) => {
                if (producto.nombre === nombre) {
                  if ((this.pedido.productos[index].cantidad - Number(data.cantidad)) <= 0) {
                    this.pedido.productos.splice(index, 1);
                    this.productosCargados[nombre] = false;
                  } else {
                    this.pedido.productos[index].cantidad -= Number(data.cantidad);
                  }
                }
              })
              this.calcularCostoYTiempo();
              this.toastController.create({
                message: "Producto removido del pedido!",
                duration: 3000,
                position: 'bottom'
              }).present();
            }
          }
        }
      ]
    });
    alert.present();
  }

  pedir() {
    if (this.pedido.productos.length === 0) {
      this.toastController.create({
        message: "Debe cargar un producto al menos!",
        duration: 3000,
        position: 'bottom'
      }).present();
    } else {
      spin(this.modalController, true);
      if (this.pedidoExistia) {
        this.pedidoService.actualizarUnPedido(this.pedido.id).update(this.pedido).then(() => {
          spin(this.modalController, false);
          showAlert(this.alertController, "Exito", "Pedido actualizado exitosamente");
          this.navCtrl.pop();
        })
      } else {
        this.pedidoService.cargarPedido(this.pedido.dameJSON()).then(() => {
          spin(this.modalController, false);
          showAlert(this.alertController, "Exito", "Pedido dado de alta exitosamente");
          this.navCtrl.pop();
        })
      }
    }
  }

  calcularCostoYTiempo() {
    this.pedido.costo = 0;
    this.pedido.tiempo_espera = 0;
    this.productos.forEach((producto) => {
      this.pedido.productos.forEach((productoEnPedido) => {
        if (producto.nombre === productoEnPedido.nombre) {
          this.pedido.costo += producto.precio * productoEnPedido.cantidad;
          this.pedido.tiempo_espera += producto.tiempo;
        }
      })
    })
    this.pedido.costo = round(this.pedido.costo, 2);
  }

}
