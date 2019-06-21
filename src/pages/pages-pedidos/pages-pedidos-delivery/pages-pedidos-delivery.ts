import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Pedido } from '../../../clases/Pedido';
import { of } from 'rxjs/observable/of';
import { round } from '../../../environments/environment';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-delivery',
  templateUrl: 'pages-pedidos-delivery.html',
})
export class PagesPedidosDeliveryPage {

  pedido: Pedido;

  localizacionBase: any;

  @ViewChild('map') mapRef: ElementRef;
  direccionValida: boolean;

  map: any;
  searchBox: any;
  directionsService: any;
  directionsDisplay: any;

  duracion: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastController: ToastController) {
    this.pedido = this.navParams.get("pedido");
    this.localizacionBase = new google.maps.LatLng(-34.662544, -58.364732);
    this.direccionValida = false;
    this.duracion = 0;
  }

  ionViewDidLoad() {
    this.cargarMapa();
    this.cargarSearchBox();
  }

  cargar() {
    if (this.pedido.direccion === "" || this.pedido.direccion === undefined) {
      this.toastController.create({
        message: "Debe cargar una direccion primero!",
        duration: 2000,
        position: 'bottom'
      }).present();

      return;
    }
    if (!this.direccionValida) {
      this.toastController.create({
        message: "Debe cargar una direccion valida",
        duration: 2000,
        position: 'bottom'
      }).present();

      return;
    } else {
      this.viewCtrl.dismiss(this.pedido);
    }

  }

  cargarMapa() {
    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      center: this.localizacionBase,
      zoom: 14,
      disableDefaultUI: true,
      mapTypeId: 'roadmap'
    });

    this.addMarker(this.localizacionBase, this.map);
  }

  cargarSearchBox() {
    this.searchBox = new google.maps.places.SearchBox(
      document.getElementById('pac-input').getElementsByTagName('input')[0]
    );

    var superScope = this;

    if (this.pedido.direccion !== "") {
      superScope.direccionValida = true;
      superScope.cargarDirecciones();
    } else {
      superScope.direccionValida = false;
    }

    this.searchBox.addListener('places_changed', function () {
      var places = superScope.searchBox.getPlaces();

      if (places[0].types[0] === "street_address") {
        superScope.direccionValida = true;
        superScope.pedido.direccion = places[0].formatted_address;

        superScope.cargarDirecciones();

      } else {
        superScope.direccionValida = false;
      }

      if (places.length == 0) {
        return;
      }

    });

  }

  cargarDirecciones() {
    if (this.directionsService === undefined) {
      this.directionsService = new google.maps.DirectionsService();
    }
    if (this.directionsDisplay === undefined) {
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.map);
    }
    var superScope = this;
    var request = {
      origin: this.localizacionBase,
      destination: this.pedido.direccion,
      travelMode: 'DRIVING'
    };
    this.directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        superScope.duracion = round((result.routes[0].legs[0].duration.value / 100), 0);
        superScope.pedido.costo_envio = round(result.routes[0].legs[0].distance.value / 100, 0);
        superScope.directionsDisplay.setDirections(result);
      }
    });
  }

  addMarker(position, map) {
    return new google.maps.Marker({
      position, map
    });
  }

  validarDireccion() {
    var geocoder = new google.maps.Geocoder();
    var superScope = this;
    geocoder.geocode({ 'address': this.pedido.direccion }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK &&
        results[0].types.filter(a => {
          return a === "street_address"
        }).length === 1) {
        superScope.direccionValida = true;
      } else {
        superScope.direccionValida = false;
      }
    });
  }

}
