import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AltaMesaComponent } from '../../components/alta-mesa/alta-mesa';
import { AltaDuenoComponent } from '../../components/alta-dueno/alta-dueno';
import { AltaEmpleadoComponent } from '../../components/alta-empleado/alta-empleado';
import { MesasProvider } from '../../providers/mesas/mesas';



/**
 * Generated class for the PagesDuenoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-dueno',
  templateUrl: 'pages-dueno.html',
})
export class PagesDuenoPage {


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
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalVotacion: ModalController,
    private mesasProvider: MesasProvider
    ) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesDuenoPage');
  }


  AltaMesa(){
    this.navCtrl.push(AltaMesaComponent);
  }

  AltaDueno(){
    this.navCtrl.push(AltaDuenoComponent);
  }

  AltaEmpleado(){
    this.navCtrl.push(AltaEmpleadoComponent);
  }

  ChequearMesa(){
    this.mesasProvider.ActualizarMesa();
  }






  





}





