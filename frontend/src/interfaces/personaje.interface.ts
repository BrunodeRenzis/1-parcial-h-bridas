import type { Frase } from './frase.interface';

export interface Personaje {
  _id: string;
  nombre: string;
  edad: number;
  tipo: 'principal' | 'secundario';
  imageUrl: string;
  frases: Frase[];
  __v: number;
}