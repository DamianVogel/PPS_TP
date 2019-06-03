import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PagesReservaPage } from '../../pages-reserva/pages-reserva';

@IonicPage()
@Component({
  selector: 'pages-cliente-menu',
  templateUrl: 'pages-cliente-menu.html',
})
export class PagesClienteMenuPage {

  reservaPage = PagesReservaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  reserva()
  {
    this.navCtrl.push(this.reservaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesClientePage');
  }

}
