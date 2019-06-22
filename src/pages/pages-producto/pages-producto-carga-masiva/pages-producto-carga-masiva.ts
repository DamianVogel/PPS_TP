import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pages-producto-carga-masiva',
  templateUrl: 'pages-producto-carga-masiva.html',
})
export class PagesProductoCargaMasivaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesProductoCargaMasivaPage');
  }

}
