import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import type { Equipo, Jugador } from '../models';
import { EquipoService, JugadorService } from '../services';
import { MainNav } from '../shared/main-nav/main-nav';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [FormsModule, MainNav],
  templateUrl: './equipos.html',
  styleUrl: './equipos.css',
})
export class Equipos {
  private readonly route = inject(ActivatedRoute);
  private readonly equipoService = inject(EquipoService);
  private readonly jugadorService = inject(JugadorService);

  protected readonly mostrarFormulario = signal(false);
  protected readonly mostrarFormularioEliminar = signal(false);
  protected readonly mostrarFormularioActualizar = signal(false);
  protected readonly equipoSeleccionado = signal<Equipo | null>(null);
  protected readonly errorEquipo = signal('');
  protected readonly equipos = toSignal(this.equipoService.equipos$, {
    initialValue: [],
  });
  protected readonly jugadores = toSignal(this.jugadorService.jugadores$, {
    initialValue: [],
  });

  protected nuevoEquipo = {
    equipo: '',
    pais: '',
    seleccionador: '',
  };
  protected equipoAEliminar = '';
  protected equipoActualizado = {
    equipoActual: '',
    equipo: '',
    pais: '',
    seleccionador: '',
  };

  constructor() {
    const equipo = this.route.snapshot.paramMap.get('equipo');

    if (equipo) {
      this.seleccionarEquipoPorNombre(equipo);
    }
  }

  protected alternarFormulario(): void {
    this.mostrarFormulario.update((visible) => !visible);
    this.errorEquipo.set('');
  }

  protected alternarFormularioEliminar(): void {
    this.mostrarFormularioEliminar.update((visible) => !visible);
  }

  protected alternarFormularioActualizar(): void {
    this.mostrarFormularioActualizar.update((visible) => {
      const nuevoEstado = !visible;

      if (nuevoEstado) {
        this.precargarEquipoActualizado();
      }

      return nuevoEstado;
    });
  }

  protected anadirEquipo(): void {
    const equipoNombre = this.nuevoEquipo.equipo.trim().toUpperCase();

    if (this.equipoService.buscarEquipo(equipoNombre)) {
      this.errorEquipo.set(`El equipo ${equipoNombre} ya existe.`);
      return;
    }

    const equipo: Equipo = {
      equipo: equipoNombre,
      pais: this.nuevoEquipo.pais.trim(),
      seleccionador: this.nuevoEquipo.seleccionador.trim(),
    };

    this.equipoService.anadirEquipo(equipo);
    this.errorEquipo.set('');
    this.nuevoEquipo = {
      equipo: '',
      pais: '',
      seleccionador: '',
    };
    this.mostrarFormulario.set(false);
  }

  protected eliminarEquipo(): void {
    const equipo = this.equipoAEliminar.trim().toUpperCase();

    this.equipoService.eliminarEquipo(equipo);
    if (this.equipoSeleccionado()?.equipo === equipo) {
      this.equipoSeleccionado.set(null);
    }
    this.equipoAEliminar = '';
    this.mostrarFormularioEliminar.set(false);
  }

  protected actualizarEquipo(): void {
    const equipoActual = this.equipoActualizado.equipoActual.trim().toUpperCase();
    const equipo: Equipo = {
      equipo: this.equipoActualizado.equipo.trim().toUpperCase(),
      pais: this.equipoActualizado.pais.trim(),
      seleccionador: this.equipoActualizado.seleccionador.trim(),
    };

    this.equipoService.actualizarEquipo(equipoActual, equipo);
    this.jugadorService.actualizarEquipoDeJugadores(equipoActual, equipo);
    if (this.equipoSeleccionado()?.equipo === equipoActual) {
      this.equipoSeleccionado.set(equipo);
    }
    this.equipoActualizado = {
      equipoActual: '',
      equipo: '',
      pais: '',
      seleccionador: '',
    };
    this.mostrarFormularioActualizar.set(false);
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

  private precargarEquipoActualizado(): void {
    const equipo = this.equipoSeleccionado();

    if (!equipo) {
      return;
    }

    this.equipoActualizado = {
      equipoActual: equipo.equipo,
      equipo: equipo.equipo,
      pais: equipo.pais,
      seleccionador: equipo.seleccionador,
    };
  }
}
