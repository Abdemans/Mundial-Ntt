import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Jugador } from '../models';
import { MainNav } from '../shared/main-nav/main-nav';

@Component({
  selector: 'app-jugadores',
  imports: [FormsModule, MainNav],
  templateUrl: './jugadores.html',
  styleUrl: './jugadores.css',
})
export class Jugadores {
  protected readonly mostrarFormulario = signal(false);
  protected readonly mostrarFormularioEliminar = signal(false);
  protected nuevoJugador = {
    nombre: '',
    direccion: '',
    puestoHab: '',
    fechaNac: '',
    equipo: '',
  };
  protected jugadorAEliminar = '';

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
        equipo: 'ESPANA',
        pais: 'Espana',
        seleccionador: 'Luis de la Fuente',
      },
    },
  ]);

  protected alternarFormulario(): void {
    this.mostrarFormulario.update((visible) => !visible);
  }

  protected alternarFormularioEliminar(): void {
    this.mostrarFormularioEliminar.update((visible) => !visible);
  }

  protected anadirJugador(): void {
    const jugador: Jugador = {
      nombre: this.nuevoJugador.nombre.trim().toUpperCase(),
      direccion: this.nuevoJugador.direccion.trim(),
      puestoHab: this.nuevoJugador.puestoHab.trim(),
      fechaNac: this.nuevoJugador.fechaNac,
      equipoJugador: {
        equipo: this.nuevoJugador.equipo.trim().toUpperCase(),
        pais: '',
        seleccionador: '',
      },
    };

    this.jugadores.update((jugadores) => [...jugadores, jugador]);
    this.nuevoJugador = {
      nombre: '',
      direccion: '',
      puestoHab: '',
      fechaNac: '',
      equipo: '',
    };
    this.mostrarFormulario.set(false);
  }

  protected eliminarJugador(): void {
    const nombre = this.jugadorAEliminar.trim().toUpperCase();

    this.jugadores.update((jugadores) =>
      jugadores.filter((jugador) => jugador.nombre !== nombre),
    );
    this.jugadorAEliminar = '';
    this.mostrarFormularioEliminar.set(false);
  }
}
