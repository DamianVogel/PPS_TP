import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { PagesReservaPage } from '../../pages-reserva/pages-reserva';
import { ListaDeEsperaMenuPage } from '../../pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu';
import { PagesJuegosMenuPage } from '../../pages-juegos/pages-juegos-menu/pages-juegos-menu';
import { PagesPedidosAltaPage } from '../../pages-pedidos/pages-pedidos-alta/pages-pedidos-alta';
import { Mesa } from '../../../clases/mesa';
import { Usuario } from '../../../clases/usuario';
import { Pedido } from '../../../clases/Pedido'; 
import { UsuarioService } from '../../../services/usuario-service';
import { PedidoService } from '../../../services/pedidos-service'
import { QRService } from '../../../services/QR-service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { MesasProvider } from '../../../providers/mesas/mesas';


@IonicPage()
@Component({
  selector: 'pages-cliente-menu',
  templateUrl: 'pages-cliente-menu.html',
})
export class PagesClienteMenuPage {

  reservaPage = PagesReservaPage;

  mesa: Mesa;
  usuario: Usuario;
  ocupaMesa: boolean;
  pedido : Pedido;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public actionSheetController: ActionSheetController,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    public toastCtrl: ToastController,
    private qrService: QRService,
    private objFirebase: AngularFirestore,
    private mesasProvider: MesasProvider
    ) {
    //this.mesa = JSON.parse(sessionStorage.getItem("mesaOcupada"));
    this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
  }

  ionViewWillEnter(){
    this.ocupaMesa = this.usuarioService.RelacionUsuarioMesa();
    this.estadoPedido();
  }


  reserva(){
    this.navCtrl.push(this.reservaPage);
  }

  listaDeEspera(){
    this.navCtrl.push(ListaDeEsperaMenuPage);
  }

  juegos(){
    this.navCtrl.push(PagesJuegosMenuPage, {"pedido": this.pedido}); //TODO Aca deberia enviarsele el id del pedido al cual se le aplicara el descuento
  }                                                                     //18/06: Se agrega el id de pedido, validar funcionamiento

  hacerPedido(){
    this.mesa = JSON.parse(sessionStorage.getItem("mesaOcupada"));
    
    this.navCtrl.push(PagesPedidosAltaPage, {
      "mesa": this.mesa,
      "cliente": this.usuario,
      "tipo": "restaurant"
    });
  }

  pedirDelivery(){
    this.navCtrl.push(PagesPedidosAltaPage, {
      "cliente": this.usuario,
      "tipo": "delivery"
    });
  }

  estadoPedido(){
    console.log(this.mesa);
    
    if(this.mesa !== undefined ){      
      this.pedidoService.traerPedidos().subscribe( pedidos=> {
        pedidos.forEach(pedido => {
          if(pedido.mesaId == JSON.parse(sessionStorage.getItem("mesaOcupada")).id && 
            pedido.cliente.id == JSON.parse(sessionStorage.getItem("usuario")).id){
            this.pedido = pedido; 
          }
        });
      })
    }  
  }

  OcuparMesa(){
    //this.mesasProvider.CambiarEstadoMesaOcupada();
    //this.HabilitarBotones();
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));

    this.qrService.readQR().then(QRdata => {
      
      let flag = false;
      this.mesasProvider.mesas.forEach((mesa) =>{  

        if(mesa.numero == parseInt(QRdata.text)){          
          flag = true;
          
          if(mesa.estado == 'ocupada' && mesa.usuario.id == JSON.parse(sessionStorage.getItem('usuario')).id){
            this.estadoPedido();
          } 
          
          
          
          if(mesa.estado == 'disponible'){
            
            let mesaUpdate =  new Mesa();
            mesaUpdate = mesa;
            mesaUpdate.estado = 'ocupada';
            mesaUpdate.usuario = usuario;
                    
            this.objFirebase.collection("SP_mesas").doc(mesa.id).set(mesaUpdate).then(() => {
              
            
            console.log('Documento editado exitósamente');
            
            this.ocupaMesa = true;

            sessionStorage.setItem("mesaOcupada", JSON.stringify(mesa));  

            }, (error) => {
              console.log(error);
            });
          
            

            let toast = this.toastCtrl.create({            
              message: "La mesa nro: "+mesa.numero +" fue ocupada por "+ usuario.nombre,
              duration: 3000,
              position: 'middle' //middle || top
            });
            toast.present();
            
          }else{
            let toast = this.toastCtrl.create({            
              message: "No se puede asignar la mesa nro: "+mesa.numero +" porque se encuentra ocupada",
              duration: 3000,
              position: 'middle' //middle || top
            });
            toast.present();
          }
        }

      });

      if(!flag){
        let toast = this.toastCtrl.create({            
          message: "Codigo QR incorrecto",
          duration: 3000,
          position: 'middle' //middle || top
        });
        toast.present();
      }

    }).catch(err => {
        console.log('Error', err);
    });
  
  }

}
