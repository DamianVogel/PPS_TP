export class Encuesta_supervisor {

    supervisor: string;
    cliente: string;
    empleado: string;

    coordialidad: number;
    puntualidad: number;
    responsabilidad: number;
    conversacion: number;
    limpieza: number;

    constructor(
        supervisor?:string,
        cliente?:string,
        empleado?:string,

        coordialidad?:number,
        puntualidad?:number,
        responsabilidad?:number,
        conversacion?:number,
        limpieza?:number){
            this.supervisor = supervisor;
            this.cliente = cliente;
            this.empleado = empleado;

            this.coordialidad = coordialidad;
            this.puntualidad = puntualidad;
            this.responsabilidad = responsabilidad;
            this.conversacion = conversacion;
            this.limpieza = limpieza;
    }

    dameJSON() {
        return JSON.parse(JSON.stringify(this));
    }
}
