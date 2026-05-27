import type { Equipo } from './equipo';

export interface Jugador {
  nombre: string;
  direccion: string;
  puestoHab: string;
  fechaNac: string;
  equipoJugador: Equipo;
}
