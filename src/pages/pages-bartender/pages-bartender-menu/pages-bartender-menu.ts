import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ProductoAltaPage } from '../../pages-producto/pages-producto-alta/pages-producto-alta';

@IonicPage()
@Component({
  selector: 'bartender-page-menu',
  templateUrl: 'pages-bartender-menu.html',
})
export class BartenderMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetController: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BartenderMenuPage');
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
