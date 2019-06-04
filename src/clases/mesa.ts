export class Mesa {
  docId: string;
  numero: number;         
  cantidadComensales: number;     
  tipoMesa: string;       
  codigoQr: string;  
  estado: string;   //Estados: {"disponible", "ocupada", "reservada" } 
         
  constructor(){
    
  }

  dameJSON() {
    return JSON.parse( JSON.stringify(this));
  }
}
