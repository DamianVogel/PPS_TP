import { Component, Input } from '@angular/core';
import { Producto } from '../../clases/Producto';
import { PedidoService  } from '../../services/pedidos-service';
import { Pedido  } from '../../clases/Pedido';
import { LoadingController } from 'ionic-angular'

/**
 * Generated class for the ProductosEnPedidoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'productos-en-pedido',
  templateUrl: 'productos-en-pedido.html'
})
export class ProductosEnPedidoComponent {

  
  // @Input() idPedido: string;
  // @Input() arrayProductos: Array<Producto>;
  @Input() pedido: Pedido;
  

  constructor(
    private pedidoService: PedidoService,
    public loadingController: LoadingController

  ) {
    
  }

  CambiarEstado(index: number, estado: string){

    
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
    

    this.pedido.productos[index].estado = estado;

      this.pedidoService.actualizarUnPedido(this.pedido.id).update(this.pedido).then (() => {                        
          loading.dismiss();  
          console.log('Documento editado exitósamente');
      })
       
  }

}
