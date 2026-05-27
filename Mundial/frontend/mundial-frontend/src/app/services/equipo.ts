import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <-- Importante
import { BehaviorSubject } from 'rxjs';
import type { Equipo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/equipos';

  private readonly equiposSubject = new BehaviorSubject<Equipo[]>([]);
  readonly equipos$ = this.equiposSubject.asObservable();

  constructor() {
    this.cargarEquipos(); // Carga inicial al arrancar el servicio
  }

  cargarEquipos(): void {
    this.http.get<Equipo[]>(this.apiUrl).subscribe({
      next: (data) => this.equiposSubject.next(data),
      error: (err) => console.error('Error cargando equipos:', err)
    });
  }

  anadirEquipo(equipo: Equipo): void {
    this.http.post<Equipo>(this.apiUrl, equipo).subscribe({
      next: () => this.cargarEquipos(), // Recarga la lista desde el backend
      error: (err) => console.error('Error al añadir equipo:', err)
    });
  }

  eliminarEquipo(nombre: string): void {
    this.http.delete(`${this.apiUrl}/${nombre}`).subscribe({
      next: () => this.cargarEquipos(),
      error: (err) => console.error('Error al eliminar equipo:', err)
    });
  }

  actualizarEquipo(nombreActual: string, equipoActualizado: Equipo): void {
    this.http.put<Equipo>(`${this.apiUrl}/${nombreActual}`, equipoActualizado).subscribe({
      next: () => this.cargarEquipos(),
      error: (err) => console.error('Error al actualizar equipo:', err)
    });
  }

  buscarEquipo(nombre: string): Equipo | undefined {
    const equipo = nombre.trim().toUpperCase();
    return this.equiposSubject.value.find((registro) => registro.equipo === equipo);
  }
}
