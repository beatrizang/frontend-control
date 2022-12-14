import { Personas } from "./personas";

export class Controles {
    id_control:number;
    fecha: Date;
    peso: number;
    grasa: number;
    imc: number;
    musculo: number;
    calorias: number;
    edad_metabolica: number;
    visceral: number;
    descripcion: string;
    persona: Personas;
}
