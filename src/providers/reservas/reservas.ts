import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Reserva } from '../../clases/Reserva';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ReservasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReservasProvider {

  private listaReservasFirebase: AngularFirestoreCollection<Reserva>;
  private listaReservasObservable: Observable<Reserva[]>;
  public reservas:Array<Reserva>
  
  constructor(
    public http: HttpClient,  
    private objFirebase: AngularFirestore,
    public toastCtrl: ToastController) {
   
    this.TraerReservas();
  }

  TraerReservas()
  {
    this.reservas = new Array<any>();
    this.listaReservasFirebase = this.objFirebase.collection<Reserva>("SP_reservas", ref => ref.orderBy('fecha_hora', 'desc') );
    this.listaReservasObservable = this.listaReservasFirebase.valueChanges();
    this.listaReservasObservable.subscribe(arr => {

      arr.forEach((x: Reserva) => {
        this.reservas.push(x);
       
      });
    });

  }

  GuardarReserva(reserva:Reserva)
  {
    this.objFirebase
   .collection("SP_reservas")
   .add({
     'fecha_hora': reserva.fecha_hora,
     'cliente': JSON.parse(sessionStorage.getItem("usuario")), 
     'mesas': reserva.mesas
   })
   .then(res => {

     console.log(res);
     let toast = this.toastCtrl.create({
       message: "Reservaste la mesa: " + reserva.mesas + " para el dia " + reserva.fecha_hora ,
       duration: 3000,
       position: 'middle' //middle || top
     });
     toast.present();
     


   }, err => console.log(err));
  }
}