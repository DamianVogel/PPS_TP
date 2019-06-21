import { Component, Input } from '@angular/core';
import { PedidoService } from '../../services/pedidos-service';
import { Pedido } from '../../clases/Pedido';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the ListapedidosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'listapedidos',
  templateUrl: 'listapedidos.html'
})
export class ListapedidosComponent {

  filtroDelivery: boolean;

  @Input() pedidos: Array<Pedido>;

  constructor(
    private pedidoService: PedidoService,
    private loadingController: LoadingController
  ) {
       
      this.filtroDelivery = false;
      
      let usuario =  JSON.parse(sessionStorage.getItem('usuario'));

      if(usuario.tipo == 'delivery'){
        this.filtroDelivery = true;
      } 
    
  }

  //FUNCIONES DELIVERY

  RetirarEntrega(pedido: Pedido){
   
    let loading = this.loadingController.create({
      spinner: 'hide',
      content: `
        <ion-content padding>
          <img id="spinner" src="assets/img/spinner.gif"> 
        </ion-content>`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    
    loading.present();
    
    this.pedidoService.actualizarUnPedido(pedido.id).update({
    
      'estado': 'en_camino'
    
    }).then(() => {
      loading.dismiss();
      console.log('Documento editado exitósamente');
    
    }).catch(err =>{
      loading.dismiss();
      let loadingError = this.loadingController.create({
        spinner: 'hide',
        content: 'Ocurrio un error, por favor intentalo de nuevo',
        duration: 5000
      });

      loadingError.present();

      
    });

  }

  Entregar(pedido: Pedido){
    let loading = this.loadingController.create({
      spinner: 'hide',
      content: `
        <ion-content padding>
          <img id="spinner" src="assets/img/spinner.gif"> 
        </ion-content>`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    
    loading.present();
    
    this.pedidoService.actualizarUnPedido(pedido.id).update({
    
      'estado': 'entregado'
    
    }).then(() => {
      loading.dismiss();
      console.log('Documento editado exitósamente');
    
    }).catch(err =>{
      loading.dismiss();
      let loadingError = this.loadingController.create({
        spinner: 'hide',
        content: 'Ocurrio un error, por favor intentalo de nuevo',
        duration: 5000
      });

      loadingError.present();

      
    });

  }


}
