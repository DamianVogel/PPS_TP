import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ProductoAltaPage } from '../../pages-producto/pages-producto-alta/pages-producto-alta';
import { PedidoService } from '../../../services/pedidos-service';
import { Pedido } from '../../../clases/Pedido';


@IonicPage()
@Component({
  selector: 'bartender-page-menu',
  templateUrl: 'pages-bartender-menu.html',
})
export class BartenderMenuPage {

  pedidos: Array<Pedido>;



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public actionSheetController: ActionSheetController,
    public pedidosService: PedidoService
    ) {
      //this.CargarPedidosPendientes();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BartenderMenuPage');
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


  CargarPedidosPendientes(){
    
    this.pedidosService.traerPedidos().subscribe( pedidos => {
      var array = new Array<Pedido>();
      pedidos.forEach(pedido => {
        array.push(pedido);      
      });
    
      this.pedidos = array;
      this.pedidos = this.pedidos.filter( pedido => pedido.estado == 'pendiente' );
      console.log(this.pedidos);
    })

    
  }

  

}
