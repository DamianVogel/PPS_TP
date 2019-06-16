import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ProductoAltaPage } from '../../pages-producto/pages-producto-alta/pages-producto-alta';
import { PedidoService } from '../../../services/pedidos-service';
import { Pedido } from '../../../clases/Pedido';



@IonicPage()
@Component({
  selector: 'cocinero-page-menu',
  templateUrl: 'pages-cocinero-menu.html',
})
export class CocineroMenuPage {

  pedidos: Array<Pedido>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public actionSheetController: ActionSheetController,
    public pedidosService: PedidoService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CocineroMenuPage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetController.create({
      buttons: [{
        text: 'Crear',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(ProductoAltaPage);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

  CargarPedidosPendientes(filtro: string){
    
    this.pedidosService.traerPedidos().subscribe( pedidos => {
      var array = new Array<Pedido>();
      pedidos.forEach(pedido => {
        array.push(pedido);      
      });
    
      
      
      this.pedidos = array.filter( pedido => pedido.estado == filtro );
      
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
