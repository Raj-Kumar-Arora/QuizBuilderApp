import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,           // <-- REQUIRED for standalone apps
  imports: [RouterOutlet],    // <-- RouterOutlet must be imported here
  templateUrl: './app.html',
  styleUrls: ['./app.css']    // <-- use plural (recommended)
})
export class AppComponent{
  title = signal('UI');       // signal works correctly now
}

