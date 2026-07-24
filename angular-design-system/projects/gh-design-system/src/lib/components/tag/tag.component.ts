import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

import type { GhTagMode, GhTagSize, GhTagVariant } from './tag.types';

const DEFAULT_REMOVE_ARIA_LABEL = 'Remove tag';

@Component({
  selector: 'gh-tag',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhTagComponent {
  readonly mode = input<GhTagMode>('static');
  readonly variant = input<GhTagVariant>('neutral');
  readonly size = input<GhTagSize>('md');
  readonly selected = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined);

  readonly selectedChange = output<boolean>();
  readonly removed = output<void>();

  protected readonly removeAriaLabel = computed(
    () => this.ariaLabel()?.trim() || DEFAULT_REMOVE_ARIA_LABEL,
  );
  protected readonly tagClasses = computed(() => {
    const classes = [
      'gh-tag',
      `gh-tag--${this.mode()}`,
      `gh-tag--${this.variant()}`,
      `gh-tag--${this.size()}`,
    ];

    if (this.selected() && this.mode() === 'selectable') {
      classes.push('gh-tag--selected');
    }

    if (this.disabled() && this.mode() !== 'static') {
      classes.push('gh-tag--disabled');
    }

    return classes.join(' ');
  });

  protected toggleSelected(): void {
    if (this.mode() !== 'selectable' || this.disabled()) {
      return;
    }

    this.selectedChange.emit(!this.selected());
  }

  protected remove(event: MouseEvent): void {
    event.stopPropagation();

    if (this.mode() !== 'removable' || this.disabled()) {
      return;
    }

    this.removed.emit();
  }
}
