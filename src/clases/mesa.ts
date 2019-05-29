export class Mesa {
  
  numero: number;         
  cantidadComensales: number;     
  tipoMesa: string;       
  codigoQr: string;      
         
  constructor(){
    
  }

  dameJSON() {
    return JSON.parse( JSON.stringify(this));
  }
}
