export class Pedido {

    id: number;
    productos: Array<any>;
    mesa: string;
    cliente: string;
    estado: number;
    costo: number;
    descuento_10: boolean;
    descuento_bebida: boolean;
    descuento_postre: boolean;
    propina: number;
    tiempo_espera: number;

    constructor(
        id?:number,
        productos?:Array<any>,
        mesa?: string,
        cliente?: string,
        estado?: number,
        costo?: number,
        descuento_10?: boolean,
        descuento_bebida?: boolean,
        descuento_postre?: boolean,
        propina?: number,
        tiempo_espera?: number){
            this.id = id;
            this.productos = productos;
            this.mesa = mesa;
            this.cliente = cliente;
            this.estado = estado;
            this.costo = costo;
            this.descuento_10 = descuento_10;
            this.descuento_bebida = descuento_bebida;
            this.descuento_postre = descuento_postre;
            this.propina = propina;
            this.tiempo_espera = tiempo_espera;
    }

    dameJSON() {
        return JSON.parse(JSON.stringify(this));
    }
}
