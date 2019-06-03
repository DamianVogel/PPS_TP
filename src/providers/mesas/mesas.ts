import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
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
    private qrService: QRService   
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
    /*
    const opciones: BarcodeScannerOptions = {
      preferFrontCamera : false, // iOS and Android
      showFlipCameraButton : true, // iOS and Android
      showTorchButton : true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      //saveHistory: true, // Android, save scan history (default false)
      prompt : "Scanee el DNI", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats : "PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations : true, // iOS
      disableSuccessBeep: false // iOS and Android
    }
    */
    
    this.qrService.readQR().then(QRdata => {
      //console.log('Barcode data', barcodeData);
      console.log(QRdata.text);
    
      }).catch(err => {
         console.log('Error', err);
    });


  }

  MesasDisponibles(){
    let mesasFiltradas = [];
    mesasFiltradas = this.mesas.filter(mesas => mesas.estado == 'disponible');
    return mesasFiltradas;
  }

  Prueba(){
    console.log("entro");
    //const racesCollection: AngularFirestoreCollection<Mesa>;
    this.listaMesasFirebase = this.objFirebase.collection<any>("SP_mesas");
    
    this.listaMesasObservable =  this.listaMesasFirebase.snapshotChanges().map(actions => {       
       return actions.map(a => {
        const mesa = a.payload.doc.data() as Mesa;
        mesa.docId = a.payload.doc.id;
        //console.log(mesa);
        return mesa;
      });
    });

    console.log(this.listaMesasObservable);

    // this.listaMesasObservable.subscribe(arr => {
    //   // console.info("Conexión correcta con Firebase: mesas", arr);
    //    //this.mesas = new Array<any>();
    //    console.log(arr);
       
    //    arr.forEach((x: Mesa) => {
         
    //      this.mesas.push(x);
        
    //    });
    // });

    // console.log(this.mesas);


  }



}
