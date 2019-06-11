import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../clases/usuario';
import { showAlert } from '../environments/environment';

@Injectable()
export class UsuarioService {

  private listaUsuariosFirebase: AngularFirestoreCollection<Usuario>;
  private listaUsuariosObservable: Observable<Usuario[]>;

  private listaEsperaFirebase: AngularFirestoreCollection<string>;
  private listaEsperaObservable: Observable<string[]>;
  
	constructor(
      public alertController: AlertController,
      public alertCtrl: AlertController,
      private objFirebase: AngularFirestore,
      public modalCtrl: ModalController
    ) {

	}

  traerUsuarios() {
    this.listaUsuariosFirebase = this.objFirebase.collection<Usuario>("SP_usuarios", ref => ref.orderBy('nombre', 'desc') );
    this.listaUsuariosObservable = this.listaUsuariosFirebase.valueChanges();
    return this.listaUsuariosObservable;
  }

  cargarUsuario(usuarioAGuardarJSON: any){
    
    let id = this.objFirebase.createId();
    
    usuarioAGuardarJSON.id = id;

    return this.objFirebase.collection<Usuario>("SP_usuarios").doc(id).set(usuarioAGuardarJSON);
  }

  validarUsuarioExiste(usuarios: Usuario[], nombre: string){
    if(usuarios.filter(function(user){
      return user.nombre === nombre
    }).length >= 1){
      //
      showAlert(this.alertController, "Error", "Ya existe un usuario con ese nombre registrado");
      return true;
    }
    return false;
  }

  traerListaDeEspera(){
    this.listaEsperaFirebase = this.objFirebase.collection<any>("SP_listaEspera", ref => ref.orderBy('fecha', 'asc') );
    this.listaEsperaObservable = this.listaEsperaFirebase.valueChanges();
    return this.listaEsperaObservable;
  }

  cargarRegistroListaDeEspera(registroAGuardarJSON: any){
    return this.objFirebase.collection<any>("SP_listaEspera").add(registroAGuardarJSON);
  }

  EliminarUsuario(id)
  {
    return this.objFirebase.collection("SP_usuarios").doc(id).delete();
  }

}