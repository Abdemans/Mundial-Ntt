import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Equipo, Jugador } from '../models';

const JUGADORES_INICIALES: Jugador[] = [
  {
    nombre: 'LIONEL MESSI',
    direccion: 'Rosario',
    puestoHab: 'Delantero',
    fechaNac: '1987-06-24',
    equipoJugador: {
      equipo: 'ARGENTINA',
      pais: 'Argentina',
      seleccionador: 'Lionel Scaloni',
    },
  },
  {
    nombre: 'KYLIAN MBAPPE',
    direccion: 'Paris',
    puestoHab: 'Delantero',
    fechaNac: '1998-12-20',
    equipoJugador: {
      equipo: 'FRANCIA',
      pais: 'Francia',
      seleccionador: 'Didier Deschamps',
    },
  },
  {
    nombre: 'RODRI',
    direccion: 'Madrid',
    puestoHab: 'Centrocampista',
    fechaNac: '1996-06-22',
    equipoJugador: {
      equipo: 'ESPANA',
      pais: 'Espana',
      seleccionador: 'Luis de la Fuente',
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class JugadorService {
  private readonly jugadoresSubject = new BehaviorSubject<Jugador[]>(JUGADORES_INICIALES);
  readonly jugadores$ = this.jugadoresSubject.asObservable();

  anadirJugador(jugador: Jugador): void {
    this.jugadoresSubject.next([...this.jugadoresSubject.value, jugador]);
  }

  eliminarJugador(nombre: string): void {
    const jugador = nombre.trim().toUpperCase();

    this.jugadoresSubject.next(
      this.jugadoresSubject.value.filter((registro) => registro.nombre !== jugador),
    );
  }

  buscarJugador(nombre: string): Jugador | undefined {
    const jugador = nombre.trim().toUpperCase();

    return this.jugadoresSubject.value.find((registro) => registro.nombre === jugador);
  }

  actualizarJugador(nombreActual: string, jugadorActualizado: Jugador): void {
    const jugador = nombreActual.trim().toUpperCase();

    this.jugadoresSubject.next(
      this.jugadoresSubject.value.map((registro) =>
        registro.nombre === jugador ? jugadorActualizado : registro,
      ),
    );
  }

  actualizarEquipoDeJugadores(nombreActualEquipo: string, equipoActualizado: Equipo): void {
    const equipo = nombreActualEquipo.trim().toUpperCase();

    this.jugadoresSubject.next(
      this.jugadoresSubject.value.map((jugador) =>
        jugador.equipoJugador.equipo === equipo
          ? { ...jugador, equipoJugador: equipoActualizado }
          : jugador,
      ),
    );
  }
}
