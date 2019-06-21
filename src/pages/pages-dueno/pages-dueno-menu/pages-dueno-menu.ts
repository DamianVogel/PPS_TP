import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ActionSheetController, AlertController, Navbar } from 'ionic-angular';
import { AltaMesaComponent } from '../../../components/alta-mesa/alta-mesa';
import { AltaDuenoComponent } from '../../../components/alta-dueno/alta-dueno';
import { AltaEmpleadoComponent } from '../../../components/alta-empleado/alta-empleado';
import { MesasProvider } from '../../../providers/mesas/mesas';
import { PagesReservasPage } from '../../pages-reservas/pages-reservas';
import { PagesRegistrosPendientesPage } from '../../pages-registros-pendientes/pages-registros-pendientes';
import { SoundsService } from '../../../services/sounds-service';


@IonicPage()
@Component({
  selector: 'page-pages-dueno-menu',
  templateUrl: 'pages-dueno-menu.html',
})
export class PagesDuenoMenuPage {

  @ViewChild(Navbar) navBar: Navbar;

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

  reservasPage= PagesReservasPage;
  registrosPendiente= PagesRegistrosPendientesPage;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalVotacion: ModalController,
    private mesasProvider: MesasProvider,
    public actionSheetController: ActionSheetController,
    private soundsService: SoundsService
  ) {

  }

  ionViewDidLoad(){
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.soundsService.sound('logout');
      this.navCtrl.pop();
     }
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

  
  
  Reservas()
  {
    this.navCtrl.push(this.reservasPage);
  }

  RegistrosUsuarios()
  {
    this.navCtrl.push(this.registrosPendiente);
  }


}





