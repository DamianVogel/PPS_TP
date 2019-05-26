import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-alta',
  templateUrl: 'pages-producto-alta.html',
})
export class ProductoAltaPage {

  producto = {}

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  cargar() {
    console.log(this.producto)
  }

}
