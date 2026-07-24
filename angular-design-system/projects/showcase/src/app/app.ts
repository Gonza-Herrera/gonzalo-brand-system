import { Component } from '@angular/core';

import { ShowcaseShell } from './layout/showcase-shell/showcase-shell';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShowcaseShell],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
