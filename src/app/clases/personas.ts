import { Controles } from "./controles";

export class Personas {
    id_persona: number;
    nombre: string;
    apellido: string;
    fecha_nac: Date;
    altura: number;
    controles: Controles[] = [];
}
