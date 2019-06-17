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
            if(id == null || id == undefined) this.id = ""; else this.id = id;
            if(productos == null || productos == undefined) this.productos = new Array<any>(); else this.productos = productos;
            if(mesa == null || mesa == undefined) this.mesa = ""; else this.mesa = mesa;
            if(cliente == null || cliente == undefined) this.cliente = ""; else this.cliente = cliente;
            if(estado == null || estado == undefined) this.estado = ""; else this.estado = estado;
            if(costo == null || costo == undefined) this.costo = 0; else this.costo = costo;
            if(descuento_10 == null || descuento_10 == undefined) this.descuento_10 = false; else this.descuento_10 = descuento_10;
            if(descuento_bebida == null || descuento_bebida == undefined) this.descuento_bebida = false; else this.descuento_bebida = descuento_bebida;
            if(descuento_postre == null || descuento_postre == undefined) this.descuento_postre = false; else this.descuento_postre = descuento_postre;
            if(propina == null || propina == undefined) this.propina = 0; else this.propina = propina;
            if(tiempo_espera == null || tiempo_espera == undefined) this.tiempo_espera = 0; else this.tiempo_espera = tiempo_espera;
    }

    dameJSON() {
        return JSON.parse(JSON.stringify(this));
    }
}
