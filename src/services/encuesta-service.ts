import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Encuesta_supervisor } from '../clases/encuesta_supervisor';

@Injectable()
export class EncuestaService {

    private listaEncuestasFirebase: AngularFirestoreCollection<Encuesta_supervisor>;
    private listaEncuestasObservable: Observable<Encuesta_supervisor[]>;
    
      constructor(
        public alertCtrl: AlertController,
        private objFirebase: AngularFirestore,
        public modalCtrl: ModalController
      ) {
  
      }
  
    traerEncuestas() {
      this.listaEncuestasFirebase = this.objFirebase.collection<Encuesta_supervisor>("SP_encuestas_supervisor");
      this.listaEncuestasObservable = this.listaEncuestasFirebase.valueChanges();
      return this.listaEncuestasObservable;
    }
  
    cargarEncuesta(encuestaAGuardarJSON: any){
      return this.objFirebase.collection<Encuesta_supervisor>("SP_encuestas_supervisor").add(encuestaAGuardarJSON);
    }

}