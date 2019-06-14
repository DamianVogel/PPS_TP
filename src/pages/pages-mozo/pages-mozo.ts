import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { ListaDeEsperaMenuPage } from '../pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu';
import { MesasProvider } from '../../providers/mesas/mesas';
import { PagesPedidosAltaPage } from '../pages-pedidos/pages-pedidos-alta/pages-pedidos-alta';
import { PagesMesaPage } from '../pages-mesa/pages-mesa';

/**
 * Generated class for the PagesMozoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-mozo',
  templateUrl: 'pages-mozo.html',
})
export class PagesMozoPage {

  listaEspera= ListaDeEsperaMenuPage;
listaMesas;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private mesasProv: MesasProvider) {
      this.TraerMesas();
  }

  ListaEspera()
  {
    this.navCtrl.push(this.listaEspera);
  }

  TraerMesas()
  {
    this.listaMesas=this.mesasProv.mesas;
    console.log(this.listaMesas);
  }


  Opciones(mesa) {

  if(mesa.estado=="ocupada")
  {
    this.navCtrl.push(PagesMesaPage,{"mesa": mesa});
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesMozoPage');
  }

}
