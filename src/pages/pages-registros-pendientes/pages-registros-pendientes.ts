import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../clases/usuario';

/**
 * Generated class for the PagesRegistrosPendientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-registros-pendientes',
  templateUrl: 'pages-registros-pendientes.html',
})
export class PagesRegistrosPendientesPage {

  listaPendientes:Array<Usuario>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private usrSer: UsuarioService) {
    this.listaPendientes= new Array<Usuario>();
    this.TraerPendientes();
  }

 async TraerPendientes()
  {
    this.usrSer.traerUsuarios().subscribe((usrs)=>{
      
      this.listaPendientes = usrs.filter(usr=>{return usr.estado=="Pendiente"});

    })
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesRegistrosPendientesPage');
  }

}
