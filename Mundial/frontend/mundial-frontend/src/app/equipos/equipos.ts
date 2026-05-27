import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Equipo } from '../models';
import { MainNav } from '../shared/main-nav/main-nav';

@Component({
  selector: 'app-equipos',
  imports: [FormsModule, MainNav],
  templateUrl: './equipos.html',
  styleUrl: './equipos.css',
})
export class Equipos {
  protected readonly mostrarFormulario = signal(false);
  protected readonly mostrarFormularioEliminar = signal(false);
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
      equipo: 'ESPANA',
      pais: 'Espana',
      seleccionador: 'Luis de la Fuente',
    },
  ]);

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
    this.equipoAEliminar = '';
    this.mostrarFormularioEliminar.set(false);
  }
}
