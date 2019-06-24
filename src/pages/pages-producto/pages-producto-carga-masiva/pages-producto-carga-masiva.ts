import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { ProductoService } from '../../../services/producto-service';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { showAlert, spin } from '../../../environments/environment';
import { SoundsService } from '../../../services/sounds-service';
import { Producto } from '../../../clases/Producto';

declare var require: any;
let converter = require('json-2-csv');

@IonicPage()
@Component({
  selector: 'page-pages-producto-carga-masiva',
  templateUrl: 'pages-producto-carga-masiva.html',
})
export class PagesProductoCargaMasivaPage {

  type: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService,
    public fileChooser: FileChooser,
    public file: File,
    public alertCtrl: AlertController,
    public soundsService: SoundsService,
    public modalController: ModalController) {

  }

  cargaJSON() {
    var superScope = this;
    spin(this.modalController, true);
    this.file.readAsText(this.file.externalRootDirectory, "test_alta.json").then(text => {
      let productos: Array<Producto> = JSON.parse(text);
      productos.forEach((producto, index) => {
        superScope.productoService.cargarProducto(JSON.parse(JSON.stringify(producto))).then(() => {
          if (index === productos.length - 1) {
            spin(superScope.modalController, false);
            showAlert(superScope.alertCtrl, "Exito", "Productos dado de alta con exito!", superScope.soundsService, 'success');
          }
        }).catch(error => {
          spin(superScope.modalController, false);
          showAlert(superScope.alertCtrl, "Error", error, superScope.soundsService, 'error');
        });
      });
    }).catch(error => {
      spin(superScope.modalController, false);
      showAlert(superScope.alertCtrl, "Error", error, superScope.soundsService, 'error');
    });
  }

  descargaJSON() {
    this.productoService.traerProductos().subscribe(productos => {
      spin(this.modalController, true);
      this.file.writeFile(this.file.externalRootDirectory, "productos.json", JSON.stringify(productos), {
        "replace": true
      }).then(response => {
        spin(this.modalController, false);
        showAlert(this.alertCtrl, "Exito", "Archivo creado con exito en: " + response.fullPath, this.soundsService, 'success');
      }).catch(error => {
        spin(this.modalController, false);
        showAlert(this.alertCtrl, "Error", error, this.soundsService, 'error');
      });
    });
  }

  cargaCSV() {
    var superScope = this;
    spin(this.modalController, true);
    this.file.readAsText(this.file.externalRootDirectory, "test_alta.csv").then(text => {
      converter.csv2json(text, function (err, productos) {
        if (err) throw err;
        productos.forEach((producto, index) => {
          superScope.productoService.cargarProducto(JSON.parse(JSON.stringify(producto))).then(() => {
            if (index === productos.length - 1) {
              spin(superScope.modalController, false);
              showAlert(superScope.alertCtrl, "Exito", "Productos dado de alta con exito!", superScope.soundsService, 'success');
            }
          }).catch(error => {
            spin(superScope.modalController, false);
            showAlert(superScope.alertCtrl, "Error", error, superScope.soundsService, 'error');
          });
        });
      });
    }).catch(error => {
      spin(superScope.modalController, false);
      showAlert(superScope.alertCtrl, "Error", error, superScope.soundsService, 'error');
    });
  }

  descargaCSV() {
    var superScope = this;
    this.productoService.traerProductos().subscribe(productos => {
      spin(this.modalController, true);
      converter.json2csv(productos, function (err, csv) {
        if (err) throw err;
        superScope.file.writeFile(superScope.file.externalRootDirectory, "productos.csv", csv, {
          "replace": true
        }).then(response => {
          spin(superScope.modalController, false);
          showAlert(superScope.alertCtrl, "Exito", "Archivo creado con exito en: " + response.fullPath, superScope.soundsService, 'success');
        }).catch(error => {
          spin(superScope.modalController, false);
          showAlert(superScope.alertCtrl, "Error", error, superScope.soundsService, 'error');
        });
      }, {
          emptyFieldValue: ""
        });
    });
  }

}
