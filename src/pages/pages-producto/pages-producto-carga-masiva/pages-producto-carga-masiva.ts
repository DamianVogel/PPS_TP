import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { ProductoService } from '../../../services/producto-service';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { showAlert, spin } from '../../../environments/environment';
import { SoundsService } from '../../../services/sounds-service';

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
