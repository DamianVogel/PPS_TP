export class Pedido {

    id: string; //<-- Damian: id debe ser string.
    productos: Array<any>;
    mesa: string;
    cliente: string;
    estado: string; //<-- Damian: Estado debe ser string{"solicitado","en proceso","terminado","entregado","recibido","pagado"}
    costo: number;
    descuento_10: boolean;
    descuento_bebida: boolean;
    descuento_postre: boolean;
    propina: number;
    tiempo_espera: number;

    constructor(
        id?:string,
        productos?:Array<any>,
        mesa?: string,
        cliente?: string,
        estado?: string,
        costo?: number,
        descuento_10?: boolean,
        descuento_bebida?: boolean,
        descuento_postre?: boolean,
        propina?: number,
        tiempo_espera?: number){
            this.id = id;
            if(productos == null || productos == undefined) this.productos = new Array<any>(); else this.productos = productos;
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
