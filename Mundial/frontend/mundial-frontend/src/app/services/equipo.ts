import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Equipo } from '../models';

const EQUIPOS_INICIALES: Equipo[] = [
  {
    equipo: 'ARGENTINA',
    pais: 'Argentina',
    seleccionador: 'Lionel Scaloni',
  },
  {
    equipo: 'FRANCIA',
    pais: 'Francia',
    seleccionador: 'Didier Deschamps',
  },
  {
    equipo: 'ESPANA',
    pais: 'Espana',
    seleccionador: 'Luis de la Fuente',
  },
];

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  private readonly equiposSubject = new BehaviorSubject<Equipo[]>(EQUIPOS_INICIALES);
  readonly equipos$ = this.equiposSubject.asObservable();

  anadirEquipo(equipo: Equipo): void {
    this.equiposSubject.next([...this.equiposSubject.value, equipo]);
  }

  eliminarEquipo(nombre: string): void {
    const equipo = nombre.trim().toUpperCase();

    this.equiposSubject.next(
      this.equiposSubject.value.filter((registro) => registro.equipo !== equipo),
    );
  }

  actualizarEquipo(nombreActual: string, equipoActualizado: Equipo): void {
    const equipo = nombreActual.trim().toUpperCase();

    this.equiposSubject.next(
      this.equiposSubject.value.map((registro) =>
        registro.equipo === equipo ? equipoActualizado : registro,
      ),
    );
  }

  buscarEquipo(nombre: string): Equipo | undefined {
    const equipo = nombre.trim().toUpperCase();

    return this.equiposSubject.value.find((registro) => registro.equipo === equipo);
  }
}
