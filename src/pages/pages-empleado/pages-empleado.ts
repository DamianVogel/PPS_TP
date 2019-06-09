import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FcmProvider } from '../../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
/**
 * Generated class for the PagesEmpleadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-empleado',
  templateUrl: 'pages-empleado.html',
})
export class PagesEmpleadoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public fcm: FcmProvider,
    public toastCtrl: ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesEmpleadoPage');
    if(this.platform.is('cordova')){
          
      // Get a FCM token
      //fcm.getToken()

      // Listen to incoming messages
      this.fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          
          const toast = this.toastCtrl.create({
            message: msg.body,
            //duration: 5000,
            closeButtonText: 'OK',
            showCloseButton: true,
            position: 'middle',
            cssClass: 'toastPedido'
          });
          toast.present();
        })
      )
      .subscribe()
    }    
  
  
  }

}
