import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Producto } from '../../../clases/Producto';

@IonicPage()
@Component({
  selector: 'page-alta',
  templateUrl: 'pages-producto-alta.html',
})
export class ProductoAltaPage {

  producto: Producto;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.producto = new Producto();
  }

  cargar() {
    console.log(this.producto)
  }

}
