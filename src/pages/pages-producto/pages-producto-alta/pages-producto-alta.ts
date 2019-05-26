import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Producto } from '../../../clases/Producto';

@IonicPage()
@Component({
  selector: 'page-alta',
  templateUrl: 'pages-producto-alta.html',
})
export class ProductoAltaPage {

  producto: Producto;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.producto = new Producto();
  }

  cargar() {
    this.validarCampos();
    //TODO Seguir aca
  }

  validarCampos(){
    let mensaje: string = "Debe completar los campos:";
    if(this.producto.nombre === undefined || this.producto.nombre === "" ) mensaje = mensaje + " nombre"
    if(this.producto.descripcion === undefined || this.producto.descripcion === "" ) mensaje = mensaje + " descripcion"
    if(this.producto.tiempo === undefined) mensaje = mensaje + " tiempo"
    if(this.producto.precio === undefined) mensaje = mensaje + " precio"
    if(this.producto.foto1 === undefined || this.producto.foto1 === "" ) mensaje = mensaje + " foto1"
    if(this.producto.foto2 === undefined || this.producto.foto2 === "" ) mensaje = mensaje + " foto2"
    if(this.producto.foto3 === undefined || this.producto.foto3 === "" ) mensaje = mensaje + " foto3"
    if(mensaje !== "Debe completar los campos:") this.showAlert("Error",mensaje)
  }
  
  showAlert(title: string, message: string, cssClass?: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      cssClass: (cssClass === undefined) ? 'alertConfirm': cssClass,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

}
