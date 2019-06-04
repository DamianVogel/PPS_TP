import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Mesa } from '../../clases/mesa';



//servicios
import { QRService } from '../../services/QR-service';


/*
  Generated class for the MesasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MesasProvider {

  private listaMesasFirebase: AngularFirestoreCollection<Mesa>;
  private listaMesasObservable: Observable<Mesa[]>;
  public mesas:Array<Mesa>;
  //public mesasDisponibles: Array<Mesa>;
  
  constructor(
    public http: HttpClient,  
    private objFirebase: AngularFirestore,
    private qrService: QRService,
    public toastCtrl: ToastController,   
    ) {  
    //this.TraerMesas();
    //this.MesasDisponibles();
  }

  TraerMesas()
  {this.mesas = new Array<any>();
    this.listaMesasFirebase = this.objFirebase.collection<Mesa>("SP_mesas", ref => ref.orderBy('numero', 'desc') );
    this.listaMesasObservable = this.listaMesasFirebase.valueChanges();
    this.listaMesasObservable.subscribe(arr => {
     // console.info("Conexión correcta con Firebase: mesas", arr);
      //this.mesas = new Array<any>();
      //console.log(arr);
      
      arr.forEach((x: Mesa) => {
        
        this.mesas.push(x);
       
      });
    });

  }

  EstadoMesa(){
    this.TraerMesas();

    this.qrService.readQR().then(QRdata => {
      
      console.log(QRdata.text);
      let flag = false;
      this.mesas.forEach((mesa:Mesa) =>{
        

        if(mesa.numero == parseInt(QRdata.text)){
          flag = true;
          let toast = this.toastCtrl.create({            
            message: "La mesa nro: "+QRdata.text +" se encuentra "+ mesa.estado+".",
            duration: 3000,
            position: 'middle' //middle || top
          });
          toast.present();
          
        }

      });

      if(!flag){
        let toast = this.toastCtrl.create({            
          message: "Codigo QR incorrecto",
          duration: 3000,
          position: 'middle' //middle || top
        });
        toast.present();
      }

      }).catch(err => {
         console.log('Error', err);
    });


  }

  MesasDisponibles(){
    let mesasFiltradas = [];
    mesasFiltradas = this.mesas.filter(mesas => mesas.estado == 'disponible');
    return mesasFiltradas;
  }

  TraerMesasConId(){
    this.listaMesasFirebase = this.objFirebase.collection<any>("SP_mesas");
    
    this.listaMesasFirebase.snapshotChanges().subscribe( (mesas)=>{
      var mesasArray = [];
      mesas.forEach((mesaObservable: any) => {
        mesasArray.push({
          id: mesaObservable.payload.doc.id,
          data: mesaObservable.payload.doc.data()
        });
      })
      console.log(mesasArray);
    })

  }

  ActualizarMesa(){
    
    this.objFirebase.collection("SP_mesas").doc('PbRaBSRdPBB8HHWhWdEc').set({tipoMesa:'actualizado'}).then(() => {
     
      console.log('Documento editado exitósamente');
    }, (error) => {
      console.log(error);
    });
  }

}
