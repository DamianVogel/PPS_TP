import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Reserva } from '../../clases/Reserva';
import { Usuario } from '../../clases/usuario';
import { Observable } from 'rxjs/Observable';
import { MesasProvider } from '../../providers/mesas/mesas';
import { Mesa } from '../../clases/mesa';
import { ReservasProvider } from '../../providers/reservas/reservas';

/**
 * Generated class for the PagesReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-reserva',
  templateUrl: 'pages-reserva.html',
})
export class PagesReservaPage {


  private listaReservasFirebase: AngularFirestoreCollection<Reserva>;
  private listaReservasObservable: Observable<Reserva[]>;
  reservas: Array<Reserva>;
  usuario:Usuario;
  mesas;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private builder: FormBuilder,
    public toastCtrl: ToastController,
    private objFirebase: AngularFirestore,
    private mesasProv: MesasProvider,
    private reservaProv: ReservasProvider) 
    {

    this.usuario=JSON.parse(sessionStorage.getItem("usuario")); 
    this.mesas= this.mesasProv.mesas;
    this.reservas= this.reservaProv.reservas;
    console.log(this.mesas);
    console.log(this.reservas);
    

  }


fecha = new FormControl('', [
  Validators.required
]);
hora = new FormControl('', [
  Validators.required
]);

cant_comensales = new FormControl('', [
  Validators.required,
]);

vip = new FormControl('', [
  
]);


registroForm: FormGroup = this.builder.group({
  fecha: this.fecha,
  hora: this.hora,
  cant_comensales: this.cant_comensales,
  vip: this.vip,

  
});

Registrar()
{

  let reserva= new Reserva();

  reserva.fecha= this.registroForm.get('fecha').value;
  reserva.hora= this.registroForm.get('hora').value;
  reserva.cliente= this.usuario;
  let cant_comensales= this.registroForm.get('cant_comensales').value;
  let tipo;
  this.registroForm.get('vip').value ? tipo ="discapacitados" : tipo = "vip";


  this.BuscarMesaReserva(reserva.fecha,reserva.hora , cant_comensales,tipo);

}


BuscarMesaReserva(fecha,hora, cant_comensales, tipo)
{
  let laReserva: Reserva;
  let disponible: boolean= true;
  let ok:boolean= true;

  this.mesas.forEach(mesa => {
    if(ok)
    {

      if(mesa.cantidadComensales >= cant_comensales && mesa.tipo == tipo )
      { 
        this.reservas.forEach(reserva =>{
          if( reserva.mesas == mesa.numero && reserva.fecha == fecha && reserva.hora == hora)
          {

            disponible= false;
            
          }
        })
      }
      if(disponible)
      {
        laReserva = new Reserva();
        laReserva.mesas=mesa.numero;
        laReserva.fecha=fecha;
        laReserva.hora=hora;
        laReserva.cliente=this.usuario;
        laReserva.estado="pendiente";
        ok=false;
       
        this.reservaProv.GuardarReserva(laReserva);
        
      }


    }
this.registroForm.reset();
    
  });
 


}



  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesReservaPage');
  }

}
