import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Usuario } from '../../../../clases/usuario';
import { EncuestaService } from '../../../../services/encuesta-service';
import { Encuesta_supervisor } from '../../../../clases/encuesta_supervisor';
import { showAlert, spin, getRandomColor, round } from '../../../../environments/environment';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-pages-encuesta-usuario',
  templateUrl: 'pages-encuesta-usuario.html',
})
export class PagesEncuestaUsuarioPage {

  usuario: Usuario;
  encuestas: Encuesta_supervisor[];

  encuestaACargar: Encuesta_supervisor;

  encuestaCargadaUsuarioSupervisor: boolean = false;
  encuestasCargadasUsuario: boolean = false;
  encuestaMostrada: boolean = false;

  graficoMostrado: boolean = false;

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public encuestaService: EncuestaService,
    public modalController: ModalController
  ) {
    this.usuario = JSON.parse(navParams.get("usuario"));
    this.inicializarEncuesta();
    this.cargarEncuestas();
  }

  inicializarEncuesta() {
    this.encuestaACargar = new Encuesta_supervisor();
    this.encuestaACargar.coordialidad = 1;
  }

  cargarEncuestas() {
    this.encuestaService.traerEncuestas().subscribe(encuestas => {
      this.encuestas = encuestas;
      this.validarEncuestaCargada();
    })
  }

  validarEncuestaCargada() {
    let encuestasFiltradaEmpleado: Encuesta_supervisor[] = new Array<Encuesta_supervisor>();
    let encuestasFiltradaCliente: Encuesta_supervisor[] = new Array<Encuesta_supervisor>();

    if (this.usuario.perfil === "empleado") {

      //Filtro las encuestas, y solo me quedo con las del empleado actual
      encuestasFiltradaEmpleado = this.encuestas.filter(encuesta => {
        return encuesta.empleado === this.usuario.nombre;
      })

      //Valido si hay al menos una encuesta cargada con el usuario actual, para activar o no el boton del grafico
      if (encuestasFiltradaEmpleado.length > 0) {
        this.encuestasCargadasUsuario = true;
      };

      //Valido que haya una encuesta cargada con el nombre del supervisor actual, y el nombre del usuario/empleado actual, para activar o no el boton de la encuesta
      if (encuestasFiltradaEmpleado.filter(encuesta => {
        return encuesta.supervisor === JSON.parse(sessionStorage.getItem("usuario")).nombre;
      }).length === 1) {
        this.encuestaCargadaUsuarioSupervisor = true;
      };

    } else if (this.usuario.perfil === "cliente") {

      //Filtro las encuestas, y solo me quedo con las del cliente actual
      encuestasFiltradaCliente = this.encuestas.filter(encuesta => {
        return encuesta.cliente === this.usuario.nombre;
      })

      //Valido si hay al menos una encuesta cargada con el usuario actual, para activar o no el boton del grafico
      if (encuestasFiltradaCliente.length > 0) {
        this.encuestasCargadasUsuario = true;
      };

      //Valido que haya una encuesta cargada con el nombre del supervisor actual, y el nombre del usuario/empleado actual, para activar o no el boton de la encuesta
      if (encuestasFiltradaCliente.filter(encuesta => {
        return encuesta.supervisor === JSON.parse(sessionStorage.getItem("usuario")).nombre;
      }).length === 1) {
        this.encuestaCargadaUsuarioSupervisor = true;
      };

    }

  }

  cargarGrafico() {

    let encuestasAGraficar: Array<Encuesta_supervisor>;

    if (this.usuario.perfil === "empleado") {
      encuestasAGraficar = this.encuestas.filter(encuesta => {
        return encuesta.empleado === this.usuario.nombre;
      });
    } else if (this.usuario.perfil === "cliente") {
      encuestasAGraficar = this.encuestas.filter(encuesta => {
        return encuesta.cliente === this.usuario.nombre;
      });
    }

    //encuestasAGraficar = this.cargarMockData(encuestasAGraficar); //Comentar para testear

    var graphLabels = ["coordialidad", "puntualidad", "responsabilidad", "conversacion", "limpieza"];
    var data = [];
    var colors = [];

    //Por cada atributo, saco los numeros de todas las encuestas, y de la suma de todos esos numeros, saco el promedio
    if (encuestasAGraficar.length !== 0) {
      graphLabels.forEach(function (label) {
        data.push(
          round((encuestasAGraficar.map(encuesta => { return encuesta[label] }).reduce(function (total, sum) { return total + sum })) / encuestasAGraficar.length, 2)
        )
        colors.push(getRandomColor());
      });
    }

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: graphLabels,
        datasets: [{
          label: '# promedio de calificacion',
          data: data,
          backgroundColor: colors
        }]
      },
      options: {
        legend: {
          display: false
        }
      }

    });

  }

  mostrarEncuesta() {
    if (this.encuestaMostrada)
      this.encuestaMostrada = false;
    else
      this.encuestaMostrada = true;
  }

  cargar() {
    if (this.usuario.perfil === "empleado") {
      this.encuestaACargar.empleado = this.usuario.nombre;
      this.encuestaACargar.cliente = null;
    } else if (this.usuario.perfil === "cliente") {
      this.encuestaACargar.cliente = this.usuario.nombre;
      this.encuestaACargar.empleado = null;
    }
    this.encuestaACargar.supervisor = JSON.parse(sessionStorage.getItem("usuario")).nombre;
    if (this.validarCampos()) {
      this.parsearCampos();
      spin(this.modalController, true);
      this.encuestaService.cargarEncuesta(this.encuestaACargar.dameJSON()).then(() => {
        spin(this.modalController, false);
        showAlert(this.alertController, "Exito", "Encuesta dada de alta exitosamente");
        this.navCtrl.pop();
      })
        .catch(error => {
          console.log(error);
          spin(this.modalController, false);
        });
    }

  }

  mostrarGrafico() {
    if (this.graficoMostrado) {
      this.graficoMostrado = false;
      document.getElementById('grafico').style.display = 'none';
    } else {
      this.graficoMostrado = true;
      document.getElementById('grafico').style.display = 'block';
      this.cargarGrafico();
    }
  }

  validarCampos() {
    if (this.encuestaACargar.puntualidad === undefined || this.encuestaACargar.puntualidad < 1 || this.encuestaACargar.puntualidad > 5) {
      showAlert(this.alertController, "Error", "El campo puntualidad debe tener un valor entre 1 y 5 inclusive");
      return false;
    }
    if (this.encuestaACargar.responsabilidad === undefined) {
      showAlert(this.alertController, "Error", "El campo responsabilidad es obligatorio");
      return false;
    }
    if (this.encuestaACargar.conversacion === undefined) {
      showAlert(this.alertController, "Error", "El campo conversacion es obligatorio");
      return false;
    }
    if (this.encuestaACargar.limpieza === undefined) {
      showAlert(this.alertController, "Error", "El campo limpieza es obligatorio");
      return false;
    }

    return true;
  }

  parsearCampos() {
    this.encuestaACargar.conversacion = parseInt(this.encuestaACargar.conversacion.toString());
    this.encuestaACargar.limpieza = parseInt(this.encuestaACargar.limpieza.toString());
    this.encuestaACargar.puntualidad = parseInt(this.encuestaACargar.puntualidad.toString());
    this.encuestaACargar.responsabilidad = parseInt(this.encuestaACargar.responsabilidad.toString());
  }

  validarCheckboxes(e) {
    e = e || event;
    var cb = e.srcElement || e.target;
    if (cb.type !== 'checkbox') { return true; }
    var cbxs = document.getElementById('radiocb').getElementsByTagName('input'), i = cbxs.length;
    this.encuestaACargar.limpieza = cb.value; //Borrar esto en caso de querer reutilizar la funcion
    while (i--) {
      if (cbxs[i].type && cbxs[i].type == 'checkbox' && cbxs[i].id !== cb.id) {
        cbxs[i].checked = false;
      }
    }
  }

  cargarMockData(encuestasAGraficar: Array<Encuesta_supervisor>) {
    let a: any = new Object();
    a.supervisor = "nombreSupervisor";
    a.cliente = null;
    a.empleado = "nombreMozo";
    a.coordialidad = 3;
    a.puntualidad = 5;
    a.responsabilidad = 2;
    a.conversacion = 5;
    a.limpieza = 4;

    let b: any = new Object();
    b.supervisor = "nombreSupervisor";
    b.cliente = null;
    b.empleado = "nombreMozo";
    b.coordialidad = 5;
    b.puntualidad = 4;
    b.responsabilidad = 3;
    b.conversacion = 3;
    b.limpieza = 2;

    encuestasAGraficar.push(a, b);
    return encuestasAGraficar;
  }

}
