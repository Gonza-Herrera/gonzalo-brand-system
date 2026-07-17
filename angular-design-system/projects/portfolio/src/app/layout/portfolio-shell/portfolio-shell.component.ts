import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GhContainerComponent } from 'gh-design-system';

@Component({
  selector: 'app-portfolio-shell',
  standalone: true,
  imports: [GhContainerComponent, RouterOutlet],
  templateUrl: './portfolio-shell.component.html',
  styleUrl: './portfolio-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioShellComponent {}
