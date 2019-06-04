import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pages-encuestas-usuarios',
  templateUrl: 'pages-encuestas-usuarios.html',
})
export class PagesEncuestasUsuariosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesEncuestasUsuariosPage');
  }

}
