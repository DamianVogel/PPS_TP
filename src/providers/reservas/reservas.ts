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
      this.reservas = new Array<any>();
    //this.TraerReservas();
  }

   async TraerReservas()
  {
    
    this.listaReservasFirebase = this.objFirebase.collection<any>("SP_reservas", ref => ref.orderBy('fecha', 'desc') );

    this.listaReservasFirebase.snapshotChanges().subscribe( (arr)=>{
      
      arr.forEach((res: any) => {
        this.reservas.push(res.payload.doc.data());
      })
      console.log(this.reservas);
      
    })


  }

  GuardarReserva(reserva:Reserva)
  {
    let usuario= JSON.parse(sessionStorage.getItem("usuario"));

       //nuevaMesa.codigoQr = encodedData;
       var idReserva = this.objFirebase.createId();
          

       this.objFirebase.collection("SP_reservas").doc(idReserva)
       .set({
        'id': idReserva,
        'fecha': reserva.fecha,
        'hora': reserva.hora,
        'cliente': usuario, 
        'mesas': reserva.mesas,
        'estado': reserva.estado
               
       }).then(res => {

               console.log(res);
               let toast = this.toastCtrl.create({
                 message: "Reservaste la mesa: " + reserva.mesas + " para el dia " + reserva.fecha + "a las "+ reserva.hora ,
                 duration: 3000,
                 position: 'middle' //middle || top
               });
               toast.present();

              // this.altaReservaForm.reset();

             }, err => console.log(err));
  }

 AutorizarReseva(reserva: Reserva)
  {
    reserva.estado="Autorizada";
    this.reservas = [];
    this.objFirebase.collection("SP_reservas").doc(reserva.id).set(reserva).then(() => {
            
      

    this.TraerReservas();
    
      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }


  CancelarReserva(reserva: Reserva)
  {
    reserva.estado="Cancelada";
    this.reservas = [];
    this.objFirebase.collection("SP_reservas").doc(reserva.id).set(reserva).then(() => {
     
      
      console.log('Documento editado exitósamente');
      
   
    this.TraerReservas();

    }, (error) => {
      console.log(error);
    });

  }

  
}
