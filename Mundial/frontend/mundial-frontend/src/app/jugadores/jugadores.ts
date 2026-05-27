import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import type { Equipo, Jugador } from '../models';
import { EquipoService, JugadorService } from '../services';
import { MainNav } from '../shared/main-nav/main-nav';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [FormsModule, MainNav, RouterLink],
  templateUrl: './jugadores.html',
  styleUrl: './jugadores.css',
})
export class Jugadores {
  private readonly equipoService = inject(EquipoService);
  private readonly jugadorService = inject(JugadorService);

  protected readonly mostrarFormulario = signal(false);
  protected readonly mostrarFormularioEliminar = signal(false);
  protected readonly jugadorSeleccionado = signal<Jugador | null>(null);
  protected readonly errorJugador = signal('');
  protected readonly errorEquipo = signal('');
  protected readonly jugadores = toSignal(this.jugadorService.jugadores$, {
    initialValue: [],
  });

  protected nuevoJugador = {
    nombre: '',
    direccion: '',
    puestoHab: '',
    fechaNac: '',
    equipo: '',
  };
  protected jugadorAEliminar = '';

  protected alternarFormulario(): void {
    this.mostrarFormulario.update((visible) => !visible);
    this.errorJugador.set('');
    this.errorEquipo.set('');
  }

  protected alternarFormularioEliminar(): void {
    this.mostrarFormularioEliminar.update((visible) => !visible);
  }

  protected anadirJugador(): void {
    const jugadorNombre = this.nuevoJugador.nombre.trim().toUpperCase();
    const equipoNombre = this.nuevoJugador.equipo.trim().toUpperCase();
    const equipo: Equipo | undefined = this.equipoService.buscarEquipo(equipoNombre);

    if (this.jugadorService.buscarJugador(jugadorNombre)) {
      this.errorJugador.set(`El jugador ${jugadorNombre} ya existe.`);
      return;
    }

    if (!equipo) {
      this.errorEquipo.set(`El equipo ${equipoNombre} no existe.`);
      return;
    }

    const jugador: Jugador = {
      nombre: this.nuevoJugador.nombre.trim().toUpperCase(),
      direccion: this.nuevoJugador.direccion.trim(),
      puestoHab: this.nuevoJugador.puestoHab.trim(),
      fechaNac: this.nuevoJugador.fechaNac,
      equipoJugador: equipo,
    };

    this.jugadorService.anadirJugador(jugador);
    this.errorJugador.set('');
    this.errorEquipo.set('');
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

    this.jugadorService.eliminarJugador(nombre);
    if (this.jugadorSeleccionado()?.nombre === nombre) {
      this.jugadorSeleccionado.set(null);
    }
    this.jugadorAEliminar = '';
    this.mostrarFormularioEliminar.set(false);
  }

  protected seleccionarJugador(jugador: Jugador): void {
    this.jugadorSeleccionado.update((seleccionado) =>
      seleccionado?.nombre === jugador.nombre ? null : jugador,
    );
  }
}
