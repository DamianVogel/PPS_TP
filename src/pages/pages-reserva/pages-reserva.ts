import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PagesReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-reserva',
  templateUrl: 'pages-reserva.html',
})
export class PagesReservaPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

fecha:string;
hora:string;
cant_comensales:number;

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesReservaPage');
  }

}
