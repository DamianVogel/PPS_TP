export class Producto {
    id:string;
    nombre: string;
    descripcion: string;
    tiempo: number;
    precio: number;
    tipo: string;
    foto1: string;
    foto2: string;
    foto3: string;

    constructor(id?:string, nombre?: string, descripcion?: string, tipo?: string, tiempo?: number, precio?: number) {

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tiempo = tiempo;
        this.precio = precio;
        this.tipo = tipo;

        this.foto1 = "";
        this.foto2 = "";
        this.foto3 = "";
    
    }

    setFoto1(){
        this.foto1 = 'productos/'+this.nombre.toString()+'/foto1.jpg'
    }

    setFoto2(){
        this.foto2 = 'productos/'+this.nombre.toString()+'/foto2.jpg'
    }

    setFoto3(){
        this.foto3 = 'productos/'+this.nombre.toString()+'/foto3.jpg'
    }

    dameJSON() {
        return JSON.parse( JSON.stringify(this));
    }
}
