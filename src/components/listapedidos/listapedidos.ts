import { Component, Input } from '@angular/core';
import { PedidoService } from '../../services/pedidos-service';
import { Pedido } from '../../clases/Pedido';


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

  @Input() pedidos: Array<Pedido>;

  constructor() {
       
  }

  VerProductos(){}
  
  ComenzarPedido(){}


}
