import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductoAltaPage } from '../pages-producto-alta/pages-producto-alta';
//import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'producto-page-menu',
  templateUrl: 'pages-producto-menu.html',
})
export class ProductoMenuPage {

  alta = ProductoAltaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoMenuPage');
  }

}