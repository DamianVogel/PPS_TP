export class Producto {
    nombre: string;
    descripcion: string;
    tiempo: number;
    precio: number;
    foto1: string;
    foto2: string;
    foto3: string;

    constructor(nombre?: string, descripcion?: string, tiempo?: number, precio?: number, foto1?: string, foto2?: string, foto3?: string) {

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tiempo = tiempo;
        this.precio = precio;

        (foto1 !== undefined) ? this.foto1 = foto1+'/'+nombre.toString()+'/foto1.jpg' : this.foto1 = "";
        (foto2 !== undefined) ? this.foto2 = foto2+'/'+nombre.toString()+'/foto2.jpg' : this.foto2 = "";
        (foto3 !== undefined) ? this.foto3 = foto3+'/'+nombre.toString()+'/foto3.jpg' : this.foto3 = "";
    
    }

    dameJSON() {
        return JSON.parse( JSON.stringify(this));
    }
}