import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <-- Importante
import { BehaviorSubject } from 'rxjs';
import type { Equipo, Jugador } from '../models';

@Injectable({
  providedIn: 'root',
})
export class JugadorService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/jugadores';

  private readonly jugadoresSubject = new BehaviorSubject<Jugador[]>([]);
  readonly jugadores$ = this.jugadoresSubject.asObservable();

  constructor() {
    this.cargarJugadores(); // Carga inicial
  }

  cargarJugadores(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (backendData) => {
        // Mapeamos lo que devuelve Spring Boot al formato que espera vuestro Angular
        const frontendData: Jugador[] = backendData.map(j => ({
          nombre: j.nombre,
          direccion: j.direccion,
          puestoHab: j.puesto_hab,
          fechaNac: j.fecha_nac,
          equipoJugador: j.equipo
        }));
        this.jugadoresSubject.next(frontendData);
      },
      error: (err) => console.error('Error cargando jugadores:', err)
    });
  }

  anadirJugador(jugador: Jugador): void {
    // Convertimos al formato que la entidad de Java espera recibir en el JSON
    const bodyBackend = {
      nombre: jugador.nombre,
      direccion: jugador.direccion,
      puesto_hab: jugador.puestoHab,
      fecha_nac: jugador.fechaNac.includes(' ') ? jugador.fechaNac : `${jugador.fechaNac} 00:00:00`,
      equipo: jugador.equipoJugador
    };

    this.http.post<any>(this.apiUrl, bodyBackend).subscribe({
      next: () => this.cargarJugadores(),
      error: (err) => console.error('Error al añadir jugador:', err)
    });
  }

  eliminarJugador(nombre: string): void {
    this.http.delete(`${this.apiUrl}/${nombre}`).subscribe({
      next: () => this.cargarJugadores(),
      error: (err) => console.error('Error al eliminar jugador:', err)
    });
  }

  actualizarJugador(nombreActual: string, jugadorActualizado: Jugador): void {
    const bodyBackend = {
      nombre: jugadorActualizado.nombre,
      direccion: jugadorActualizado.direccion,
      puesto_hab: jugadorActualizado.puestoHab,
      fecha_nac: jugadorActualizado.fechaNac,
      equipo: jugadorActualizado.equipoJugador
    };

    this.http.put<any>(`${this.apiUrl}/${nombreActual}`, bodyBackend).subscribe({
      next: () => this.cargarJugadores(),
      error: (err) => console.error('Error al actualizar jugador:', err)
    });
  }

  buscarJugador(nombre: string): Jugador | undefined {
    const jugador = nombre.trim().toUpperCase();
    return this.jugadoresSubject.value.find((registro) => registro.nombre === jugador);
  }

  actualizarEquipoDeJugadores(nombreActualEquipo: string, equipoActualizado: Equipo): void {
    // Al estar conectados al backend, refrescar la lista es suficiente
    this.cargarJugadores();
  }
}
