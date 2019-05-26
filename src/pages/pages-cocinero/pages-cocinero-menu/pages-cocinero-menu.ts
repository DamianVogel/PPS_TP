import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ProductoAltaPage } from '../../pages-producto/pages-producto-alta/pages-producto-alta';

@IonicPage()
@Component({
  selector: 'cocinero-page-menu',
  templateUrl: 'pages-cocinero-menu.html',
})
export class CocineroMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetController: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CocineroMenuPage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetController.create({
      buttons: [{
        text: 'Crear',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(ProductoAltaPage);
        }
      }, {
        text: 'Modificar',
        icon: 'build',
        handler: () => {
          //console.log('Share clicked');
        }
      }, {
        text: 'Borrar',
        icon: 'trash',
        handler: () => {
          //console.log('Play clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

}
