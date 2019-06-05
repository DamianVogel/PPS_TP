import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Mesa } from '../../clases/mesa';



//servicios
import { QRService } from '../../services/QR-service';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';


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
  public mesasId:Array<any>;
  //public mesasDisponibles: Array<Mesa>;
  
  constructor(
    public http: HttpClient,  
    private objFirebase: AngularFirestore,
    private qrService: QRService,
    public toastCtrl: ToastController,   
    ) {  
    //this.TraerMesas();
    //this.MesasDisponibles();
    this.TraerMesasConId();
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
    this.mesasId = new Array<any>();
    
    this.listaMesasFirebase = this.objFirebase.collection<any>("SP_mesas");
    
    this.listaMesasFirebase.snapshotChanges().subscribe( (mesas)=>{
      //var mesasArray = [];
      console.log(mesas);
      
      mesas.forEach((mesaObservable: any) => {
        this.mesasId.push({
          id: mesaObservable.payload.doc.id,
          data: mesaObservable.payload.doc.data()
        });
      })
      console.log(this.mesasId);
    })

  }

  RelacionMesaUsuario(numeroMesa){

    this.mesasId.forEach( mesa => {
      
      if(mesa.data.numero == numeroMesa){
      
        let mesaAbuscar = this.objFirebase.collection("SP_mesas").doc(mesa.id).collection("ocupadaPor");

        mesaAbuscar.snapshotChanges().subscribe( usuario => {
          usuario.forEach(usuario =>{
            console.log(usuario.payload.doc.data())
          })          
        })
      } 

    });




  }



  
  
  CambiarEstadoMesaOcupada(){
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));



    this.qrService.readQR().then(QRdata => {
      
      let flag = false;
      this.mesasId.forEach((mesa) =>{  

        if(mesa.data.numero == parseInt(QRdata.text)){          
          flag = true;

          let mesaUpdate =  new Mesa();

          mesaUpdate = mesa.data;

          mesaUpdate.estado = 'ocupada';
          
          
          this.objFirebase.collection("SP_mesas").doc(mesa.id).set(mesaUpdate).then(() => {
            
            //const usuarioOcupaMesa = this.objFirebase.collection("SP_mesas/"+mesa.id+"/");
            const usuarioOcupaMesa = this.objFirebase.collection("SP_mesas").doc(mesa.id).collection("ocupadaPor");
            
            usuarioOcupaMesa.add({ usuario: usuario, timestamp: Date() });


            console.log('Documento editado exitósamente');
          }, (error) => {
            console.log(error);
          });
                   
          let toast = this.toastCtrl.create({            
            message: "La mesa nro: "+mesa.data.numero +" fue ocupada por usuario",
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

}
