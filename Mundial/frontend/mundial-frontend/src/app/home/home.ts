import { Component, signal } from '@angular/core';
import { MainNav } from '../shared/main-nav/main-nav';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainNav],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('Panel del Mundial');
}
