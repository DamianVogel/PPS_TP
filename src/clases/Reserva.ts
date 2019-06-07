import { Usuario } from "./usuario";


export class Reserva {
  
    //MODELO USUARIO DE COMANDA
    id: string;              // id - key de FireBase
    mesas: number    // lista de las mesas reservadas	
    cliente: Usuario;      // cliente 
    fecha_hora: string;   // fecha y hora de la reserva ingresada por el usuario
    estado: string;      // Valores = ["reservada","pendiente"]

    
    
    constructor(){
      
    }
  
    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }
  }
  