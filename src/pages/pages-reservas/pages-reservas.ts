import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservasProvider } from '../../providers/reservas/reservas';
import { Reserva } from '../../clases/Reserva';


/**
 * Generated class for the PagesReservasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-reservas',
  templateUrl: 'pages-reservas.html',
})
export class PagesReservasPage {

  lista_de_reservas: Reserva[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private reservasProv:ReservasProvider ) {
    //this.lista_de_reservas= this.reservasProv.reservas;
    this.reservasProv.TraerReservas();
    this.lista_de_reservas= this.reservasProv.reservas;
    console.log(this.lista_de_reservas);
  }

  async AutorizarReserva(reserva)
  {
     this.reservasProv.AutorizarReseva(reserva);

    this.reservasProv.EnviarNotificacion(reserva.cliente.id, reserva.estado).then((data)=>{
      console.log(data);
    });
  }

  async CancelarReserva(reserva)
  {
     this.reservasProv.CancelarReserva(reserva);
     this.reservasProv.EnviarNotificacion(reserva.cliente.id, reserva.estado).then((data)=>{
      console.log(data);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesReservasPage');
  }

}
