import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PagesReservaPage } from '../pages-reserva/pages-reserva';

/**
 * Generated class for the PagesClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-cliente',
  templateUrl: 'pages-cliente.html',
})
export class PagesClientePage {

  reservaPage = PagesReservaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  IrA()
  {
    this.navCtrl.push(this.reservaPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesClientePage');
  }

}
