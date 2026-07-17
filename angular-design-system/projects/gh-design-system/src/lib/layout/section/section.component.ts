import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import type { GhSectionSpacing, GhSectionSurface } from './section.types';

@Component({
  selector: 'gh-section',
  standalone: true,
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gh-section-host',
  },
})
export class GhSectionComponent {
  readonly spacing = input<GhSectionSpacing>('md');
  readonly surface = input<GhSectionSurface>('transparent');
  readonly fullHeight = input(false, { transform: booleanAttribute });

  protected readonly sectionClasses = computed(() => {
    const classes = [
      'gh-section',
      `gh-section--spacing-${this.spacing()}`,
      `gh-section--surface-${this.surface()}`,
    ];

    if (this.fullHeight()) {
      classes.push('gh-section--full-height');
    }

    return classes.join(' ');
  });
}
