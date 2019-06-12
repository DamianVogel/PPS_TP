import { Component, Input } from '@angular/core';
import { Producto } from '../../clases/Producto';
import { PedidoService  } from '../../services/pedidos-service';
import { Pedido  } from '../../clases/Pedido';

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

  
  @Input() idPedido: string;
  @Input() arrayProductos: Array<Producto>;
  //text: string;

  constructor(
    private pedidoService: PedidoService
  ) {
    
  }

  CambiarEstado(producto: Producto, index: number, estado: string){
    this.pedidoService.traerUnPedido(this.idPedido).subscribe( (pedido:Pedido) =>{      
      pedido.productos[index].estado = estado;       
      
      /*Actualizacion de pedido */                    
      this.pedidoService.actualizarUnPedido(this.idPedido).set(pedido).then (() => {                        
            console.log('Documento editado exitósamente');
      })
    })    
  }
}
