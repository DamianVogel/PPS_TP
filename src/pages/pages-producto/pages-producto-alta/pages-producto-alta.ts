import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Producto } from '../../../clases/Producto';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { showAlert, spin, wait, uploadImage, round } from '../../../environments/environment';
 
@IonicPage()
@Component({
  selector: 'page-alta',
  templateUrl: 'pages-producto-alta.html',
})
export class ProductoAltaPage {

  producto: Producto;
  private spinner;
  photoData: Array<any>;

  foto1Disabled = false;
  foto2Disabled = false;
  foto3Disabled = false;

  private listaProductosFirebase: AngularFirestoreCollection<Producto>;
  private listaProductosObservable: Observable<Producto[]>;

  productos: Array<any>;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    private camera: Camera,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private objFirebase: AngularFirestore,
    private barcodeScanner: BarcodeScanner) {
      this.producto = new Producto();
      this.photoData = new Array<any>();
      this.traerProductos();
  }

  traerProductos() {
    this.listaProductosFirebase = this.objFirebase.collection<Producto>("SP_productos", ref => ref.orderBy('nombre', 'desc') );
    this.listaProductosObservable = this.listaProductosFirebase.valueChanges();
    this.listaProductosObservable.subscribe(arr => {
      console.info("Conexión correcta con Firebase: productos", arr);
      this.productos = new Array<any>();
      arr.forEach((x: Producto) => {
        this.productos.push(x);
      });
    });
  }

  cargar() {

    if(this.validarCampos()){

      let productoAGuardar = new Producto();
      productoAGuardar.nombre = this.producto.nombre;
      productoAGuardar.descripcion = this.producto.descripcion;
      productoAGuardar.tiempo = round(this.producto.tiempo,0);
      productoAGuardar.precio = round(this.producto.precio,2);
      productoAGuardar.tipo = this.producto.tipo;
      if(this.producto.foto1 !== "") productoAGuardar.setFoto1();
      if(this.producto.foto2 !== "") productoAGuardar.setFoto2();
      if(this.producto.foto3 !== "") productoAGuardar.setFoto3();

      let productoAGuardarJSON = productoAGuardar.dameJSON();
      
      spin(this.modalCtrl, this.spinner, true);

      this.objFirebase.collection<Producto>("SP_productos").add(productoAGuardarJSON)
      .then(ret => {
        if(this.photoData.length !== 0){
          this.photoData.forEach((photo:any) => {
            //TODO Probar subir fotos
            if(photo.foto === "foto1"){
              uploadImage(photo.imageData, productoAGuardar.foto1);
            }
            if(photo.foto === "foto2"){
              uploadImage(photo.imageData, productoAGuardar.foto2);
            }
            if(photo.foto === "foto3"){
              uploadImage(photo.imageData, productoAGuardar.foto3);
            }
            wait(5000);
          });
        }
        showAlert(this.alertCtrl,"Exito","Producto dado de alta exitosamente");
        this.navCtrl.pop();
        spin(this.modalCtrl, this.spinner, false);
      })
      .catch( error => {
        console.log(error);
        spin(this.modalCtrl, this.spinner, false);
      });

    }
  }

  cargarConQR() {
    this.barcodeScanner.scan().then(barcodeData => {
        try{
          this.producto = JSON.parse(barcodeData.text);
        } catch(err) {
          showAlert(this.alertCtrl, "Error", "QR invalido");
        }
      }).catch(err => {
         console.log('Error', err);
     });
  }

  sacarFoto(foto: string){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false
    }
    
    this.camera.getPicture(options).then((imageData) => {

      this.photoData.push({
        "foto": foto,
        "imageData": imageData
      });
      if(foto==="foto1") {this.producto.foto1 = "Cargada"; this.foto1Disabled = true;}
      if(foto==="foto2") {this.producto.foto2 = "Cargada"; this.foto2Disabled = true;}
      if(foto==="foto3") {this.producto.foto3 = "Cargada"; this.foto3Disabled = true;}

    }, (err) => {
      showAlert(this.alertCtrl,"Error",err);
    }).catch((erro) => { 
      showAlert(this.alertCtrl,"Error",erro);
    });

  }

  validarCampos(){
    //Validacion de form
    let mensaje: string = "Debe completar los campos:";
    if(this.producto.nombre === undefined || this.producto.nombre === "" ) mensaje = mensaje + " nombre";
    if(this.producto.descripcion === undefined || this.producto.descripcion === "" ) mensaje = mensaje + " descripcion";
    if(this.producto.tiempo === undefined) mensaje = mensaje + " tiempo";
    if(this.producto.precio === undefined) mensaje = mensaje + " precio";
    if(this.producto.tipo === undefined || this.producto.tipo === "" ) mensaje = mensaje + " tipo";
    if(mensaje !== "Debe completar los campos:") {
      showAlert(this.alertCtrl,"Error",mensaje);
      return false;
    }
    //Validacion de nombre existente
    let parentScope: any = this;
    let productosFiltrados: any = this.productos.filter(function(el) {
      return el.nombre === parentScope.producto.nombre;
    });

    if(productosFiltrados.length === 1) {
      showAlert(this.alertCtrl,"Error","Un producto con ese nombre ya existe");
      return false;
    }

    return true;
  }

}
