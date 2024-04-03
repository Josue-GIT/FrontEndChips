import { Usuario } from "./usuario";

export interface Mascota {
    idmascota: number;
    edad: number;
    nombre: string;
    sexo: string;
    img: string;
    especie: Especie;
  }

export interface Especie{
    idespecie: number;
    descripcion: string;
    nombre: string;
}