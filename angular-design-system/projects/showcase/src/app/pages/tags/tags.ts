import { Component, signal } from '@angular/core';
import { GhTagComponent, type GhTagSize, type GhTagVariant } from 'gh-design-system';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';

interface TagVariantExample {
  readonly label: string;
  readonly variant: GhTagVariant;
}

@Component({
  selector: 'showcase-tags-page',
  standalone: true,
  imports: [CodePreview, DocumentationSection, GhTagComponent],
  templateUrl: './tags.html',
  styleUrl: './tags.scss',
})
export class TagsPage {
  protected readonly angularSelected = signal(true);
  protected readonly leadershipSelected = signal(false);
  protected readonly removableFilters = signal(['Angular', 'AI', 'Leadership']);
  protected readonly variants = [
    { label: 'Neutral', variant: 'neutral' },
    { label: 'Accent', variant: 'accent' },
    { label: 'Info', variant: 'info' },
  ] as const satisfies readonly TagVariantExample[];
  protected readonly sizes = ['sm', 'md'] as const satisfies readonly GhTagSize[];

  protected readonly staticExample = `<gh-tag>
  Angular
</gh-tag>`;
  protected readonly selectableExample = `<gh-tag
  mode="selectable"
  [selected]="selected()"
  (selectedChange)="selected.set($event)"
>
  Leadership
</gh-tag>`;
  protected readonly removableExample = `<gh-tag
  mode="removable"
  ariaLabel="Remove AI filter"
  (removed)="removeFilter()"
>
  AI
</gh-tag>`;

  protected removeFilter(filter: string): void {
    this.removableFilters.update((filters) => filters.filter((item) => item !== filter));
  }
}
