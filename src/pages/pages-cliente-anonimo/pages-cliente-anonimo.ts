import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Usuario } from '../../clases/usuario';
import { PagesClienteAnonimoMenuPage } from './pages-cliente-anonimo-menu/pages-cliente-anonimo-menu';
import { showAlert, spin } from '../../environments/environment';
import { UsuarioService } from '../../services/usuario-service';

@IonicPage()
@Component({
  selector: 'pages-cliente-anonimo',
  templateUrl: 'pages-cliente-anonimo.html',
})
export class PagesClienteAnonimoPage {

  botonHabilitado:boolean = true;

  usuario: Usuario;
  usuarios: Usuario[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertController: AlertController, 
    public usuarioService: UsuarioService,
    public modalCtrl: ModalController,
    
    
    ) {
    this.usuario = new Usuario;
    this.usuarioService.traerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });;
  }

  acceder() {    
    
    
    if(this.usuario.nombre === undefined || this.usuario.nombre === ""){
      showAlert(this.alertController,"Error","Debe ingresar un nombre");
    } else if(this.usuarioService.validarUsuarioExiste(this.usuarios, this.usuario.nombre)){
      showAlert(this.alertController,"Error","Ya existe un usuario con ese nombre en el sistema");
    } else {
      
      spin(this.modalCtrl, true);
      this.botonHabilitado = false;      
      let usuarioAnonimo =  new Usuario();
     

      usuarioAnonimo.nombre = this.usuario.nombre;
      usuarioAnonimo.perfil = 'anonimo';
      this.usuarioService.cargarUsuario(usuarioAnonimo.dameJSON()).then( alta => {
        this.botonHabilitado = true;
        spin(this.modalCtrl, false);
        
        sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
        this.navCtrl.push(PagesClienteAnonimoMenuPage);
      }).catch( error =>{
        
        console.log(error);
        this.botonHabilitado = true;
        spin(this.modalCtrl, false);
      })
       
    }
  }

}
