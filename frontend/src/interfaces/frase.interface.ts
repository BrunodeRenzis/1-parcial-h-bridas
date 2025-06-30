import type { Personaje } from './personaje.interface';

export interface Frase {
  _id: string;
  frase: string;
  autor: Personaje | string;
  season: number[];
  __v: number;
}