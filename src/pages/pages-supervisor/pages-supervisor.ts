import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { AltaMesaComponent } from '../../components/alta-mesa/alta-mesa';
import { AltaDuenoComponent } from '../../components/alta-dueno/alta-dueno';
import { AltaEmpleadoComponent } from '../../components/alta-empleado/alta-empleado';
import { PagesEncuestasUsuariosPage } from '../pages-encuestas/pages-encuestas-usuarios/pages-encuestas-usuarios';
import { QRService } from '../../services/QR-service';
import { showAlert } from '../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-pages-supervisor',
  templateUrl: 'pages-supervisor.html',
})
export class PagesSupervisorPage {

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalVotacion: ModalController,
    public actionSheetController: ActionSheetController,
    private qrService: QRService
  ) {

  }

  altas() {
    let actionSheet = this.actionSheetController.create({
      buttons: [{
        text: 'Mesa',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(AltaMesaComponent);
        }
      }, {
        text: 'Dueño',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(AltaDuenoComponent);
        }
      }, {
        text: 'Empleado',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(AltaEmpleadoComponent);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    actionSheet.present();
  }

  encuestaUsuarios() {
    this.qrService.readQR().then(barcodeData => {
      try {
        var data = JSON.parse(barcodeData.text);
        if (
          typeof (data.encuestaUsuarios) !== 'undefined' &&
          data.encuestaUsuarios === true
        ) {
          this.mostrarEncuestas(); //Comentar todo menos esto cuando se quiera probar sin lectura de QR
        }
      } catch (err) {
        showAlert(this.alertController, "Error", "QR invalido");
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  mostrarEncuestas() {

    let actionSheet = this.actionSheetController.create({
      buttons: [{
        text: 'Empleado',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(PagesEncuestasUsuariosPage, { "perfil": "empleado" });
        }
      }, {
        text: 'Cliente',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(PagesEncuestasUsuariosPage, { "perfil": "cliente" });
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    actionSheet.present();
  }

}
