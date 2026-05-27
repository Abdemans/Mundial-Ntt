import type { Jugador } from './jugador';

export interface Equipo {
  equipo: string;
  pais: string;
  seleccionador: string;
  jugadores?: Jugador[];
}
