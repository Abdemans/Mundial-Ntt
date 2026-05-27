import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly navItems = signal<NavItem[]>([
    { label: 'Inicio', path: '/' },
    { label: 'Equipos', path: '/equipos' },
    { label: 'Jugadores', path: '/jugadores' },
  ]);
}
