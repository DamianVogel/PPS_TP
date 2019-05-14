export class Usuario {
  // id: number;         // id, del 1 al 5 para los 5 personajes
  // nombre: string;     // email segun la consigna...
  // clave: string;      // contraseña
  // perfil: string;     // puede ser: admin || usuario || tester || invitado
  // sexo: string;       // puede ser Female || Male

  //MODELO USUARIO DE COMANDA
  id: number;         // id - key de FireBase
  perfil: string;     // Valores = ["supervisor","empleado","cliente","dueño"]	
  tipo: string;       // Valores = ["mozo","cocinero","bar tender","registrado","anónimo",""]	
  email: string;      
  nombre: string;      
  clave: string;      
  apellido: string;
  dni: number;
  cuil: number;
  foto: string;       // ruta de la foto
  
  
  constructor(){
    
  }

  dameJSON() {
    return JSON.parse( JSON.stringify(this));
  }
}
