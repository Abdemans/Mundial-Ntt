import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-main-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-nav.html',
  styleUrl: './main-nav.css',
})
export class MainNav {
  protected readonly navItems = signal<NavItem[]>([
    { label: 'Inicio', path: '/' },
    { label: 'Equipos', path: '/equipos' },
    { label: 'Jugadores', path: '/jugadores' },
  ]);
}
