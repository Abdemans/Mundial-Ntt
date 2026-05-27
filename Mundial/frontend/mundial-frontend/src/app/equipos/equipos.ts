import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import type { Equipo, Jugador } from '../models';
import { MainNav } from '../shared/main-nav/main-nav';

@Component({
  selector: 'app-equipos',
  imports: [FormsModule, MainNav],
  templateUrl: './equipos.html',
  styleUrl: './equipos.css',
})
export class Equipos {
  private readonly route = inject(ActivatedRoute);

  protected readonly mostrarFormulario = signal(false);
  protected readonly mostrarFormularioEliminar = signal(false);
  protected readonly equipoSeleccionado = signal<Equipo | null>(null);
  protected nuevoEquipo = {
    equipo: '',
    pais: '',
    seleccionador: '',
  };
  protected equipoAEliminar = '';

  protected readonly equipos = signal<Equipo[]>([
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
      equipo: 'ESPAÑA',
      pais: 'España',
      seleccionador: 'Luis de la Fuente',
    },
  ]);

  protected readonly jugadores = signal<Jugador[]>([
    {
      nombre: 'LIONEL MESSI',
      direccion: 'Rosario',
      puestoHab: 'Delantero',
      fechaNac: '1987-06-24T00:00:00',
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
      fechaNac: '1998-12-20T00:00:00',
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
      fechaNac: '1996-06-22T00:00:00',
      equipoJugador: {
        equipo: 'ESPAÑA',
        pais: 'España',
        seleccionador: 'Luis de la Fuente',
      },
    },
  ]);

  constructor() {
    const equipo = this.route.snapshot.paramMap.get('equipo');

    if (equipo) {
      this.seleccionarEquipoPorNombre(equipo);
    }
  }

  protected alternarFormulario(): void {
    this.mostrarFormulario.update((visible) => !visible);
  }

  protected alternarFormularioEliminar(): void {
    this.mostrarFormularioEliminar.update((visible) => !visible);
  }

  protected anadirEquipo(): void {
    const equipo: Equipo = {
      equipo: this.nuevoEquipo.equipo.trim().toUpperCase(),
      pais: this.nuevoEquipo.pais.trim(),
      seleccionador: this.nuevoEquipo.seleccionador.trim(),
    };

    this.equipos.update((equipos) => [...equipos, equipo]);
    this.nuevoEquipo = {
      equipo: '',
      pais: '',
      seleccionador: '',
    };
    this.mostrarFormulario.set(false);
  }

  protected eliminarEquipo(): void {
    const equipo = this.equipoAEliminar.trim().toUpperCase();

    this.equipos.update((equipos) =>
      equipos.filter((registro) => registro.equipo !== equipo),
    );
    if (this.equipoSeleccionado()?.equipo === equipo) {
      this.equipoSeleccionado.set(null);
    }
    this.equipoAEliminar = '';
    this.mostrarFormularioEliminar.set(false);
  }

  protected seleccionarEquipo(equipo: Equipo): void {
    this.equipoSeleccionado.update((seleccionado) =>
      seleccionado?.equipo === equipo.equipo ? null : equipo,
    );
  }

  protected jugadoresVinculados(equipo: Equipo): Jugador[] {
    return this.jugadores().filter(
      (jugador) => jugador.equipoJugador.equipo === equipo.equipo,
    );
  }

  private seleccionarEquipoPorNombre(nombre: string): void {
    const equipo = this.equipos().find(
      (registro) => registro.equipo === nombre.trim().toUpperCase(),
    );

    this.equipoSeleccionado.set(equipo ?? null);
  }
}
