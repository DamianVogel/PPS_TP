import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { AltaMesaComponent } from '../../../components/alta-mesa/alta-mesa';
import { AltaDuenoComponent } from '../../../components/alta-dueno/alta-dueno';
import { AltaEmpleadoComponent } from '../../../components/alta-empleado/alta-empleado';
import { MesasProvider } from '../../../providers/mesas/mesas';
import { QRService } from '../../../services/QR-service';
import { showAlert } from '../../../environments/environment';
import { PagesEncuestasUsuariosPage } from '../../pages-encuestas/pages-encuestas-usuarios/pages-encuestas-usuarios';

@IonicPage()
@Component({
  selector: 'page-pages-dueno-menu',
  templateUrl: 'pages-dueno-menu.html',
})
export class PagesDuenoMenuPage {

  validation_messages = {
    'dni': [
      { type: 'minlength', message: 'El dni debe ser minimo de 7 caracteres.' },
      { type: 'maxlength', message: 'El dni debe ser maximo de 8 caracteres.' },
    ],
    'cuil': [
      { type: 'minlength', message: 'El CUIL debe ser minimo de 10 caracteres.' },
      { type: 'maxlength', message: 'El CUIL debe ser maximo de 11 caracteres.' },
    ],

  }

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalVotacion: ModalController,
    private mesasProvider: MesasProvider,
    private qrService: QRService,
    public actionSheetController: ActionSheetController
  ) {

  }

  presentActionSheet() {
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
          this.navCtrl.push(PagesEncuestasUsuariosPage);
        }
      } catch (err) {
        showAlert(this.alertCtrl, "Error", "QR invalido");
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  ChequearMesa() {
    this.mesasProvider.EstadoMesa();
  }

  OcuparMesa(){
    this.mesasProvider.CambiarEstadoMesaOcupada();
  }

  RelacionMesaUsuario(){
    this.mesasProvider.RelacionMesaUsuario(4);
  }


}





