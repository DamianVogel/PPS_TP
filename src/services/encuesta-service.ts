import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Encuesta_supervisor } from '../clases/encuesta_supervisor';
import { Encuesta_empleado } from '../clases/Encuesta_empleado'

@Injectable()
export class EncuestaService {

    private listaEncuestasFirebase: AngularFirestoreCollection<Encuesta_supervisor>;
    private listaEncuestasObservable: Observable<Encuesta_supervisor[]>;
    
    private listaEncuestasIngresoEmpleadoFirebase: AngularFirestoreCollection<Encuesta_empleado>;
    private listaEncuestasIngresoEmpleadoObservable: Observable<Encuesta_empleado[]>;
    //Encuesta_empleado

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

    traerEncuestasEmpleados(){
      this.listaEncuestasIngresoEmpleadoFirebase = this.objFirebase.collection<Encuesta_empleado>("SP_encuestas_ingreso_empleado");
      this.listaEncuestasIngresoEmpleadoObservable = this.listaEncuestasIngresoEmpleadoFirebase.valueChanges();
      return this.listaEncuestasIngresoEmpleadoObservable;
    }

    cargarEncuestaEmpleado(encuestaAGuardarJSON: any){
      return this.objFirebase.collection<Encuesta_empleado>("SP_encuestas_ingreso_empleado").add(encuestaAGuardarJSON);
    }

}