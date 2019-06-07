import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DescuentoJuego } from '../../../clases/DescuentoJuego';
import { showAlert, round } from '../../../environments/environment';

@IonicPage()
@Component({
  selector: 'pages-juegos-menu',
  templateUrl: 'pages-juegos-menu.html',
})
export class PagesJuegosMenuPage {

  id_pedido: string;

  //Juego descuento
  juegoDescuendoMostrado: boolean = false;
  descuentoJugado: boolean = false;
  descuentoJuego: DescuentoJuego;
  resultado: Number;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.id_pedido = navParams.get("pedido");
    this.descuentoJuego = new DescuentoJuego();
  }

  juegoDescuento(){
    this.juegoDescuendoMostrado = true;
    this.resultado = 0;
    this.descuentoJuego.inicializarValores();
  }

  verificarResultado(){
    if(this.resultado === undefined || this.resultado.toString() === ""){
      showAlert(this.alertController,"Error","Debe ingresar un valor en el resultado primero!")
    } else {
      if(round(Number(this.resultado),0) === this.descuentoJuego.resultado){
        showAlert(this.alertController,"Felicidades","Gano un descuento!")
        //TODO Si gana alguno de los juegos, se deberia poner el flag de pedido en true, y no dejar que juegue denuevo para este pedido
        this.juegoDescuendoMostrado = false;
      } else {
        showAlert(this.alertController,"Lastima","Vuelva a intentarlo")
      }
    }
  }

  bebida(){

  }

  postre(){

  }

}
