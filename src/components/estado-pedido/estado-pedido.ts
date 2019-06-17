import { Component, Input } from '@angular/core';
import { Pedido } from '../../clases/Pedido';

/**
 * Generated class for the EstadoPedidoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'estado-pedido',
  templateUrl: 'estado-pedido.html'
})
export class EstadoPedidoComponent {
  @Input() pedido: Pedido;
  
 

  constructor() {
    console.log('Hello EstadoPedidoComponent Component');
   
  }

}
