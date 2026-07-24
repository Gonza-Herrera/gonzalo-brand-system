import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhSectionComponent } from './section.component';
import type { GhSectionSpacing, GhSectionSurface } from './section.types';

@Component({
  standalone: true,
  imports: [GhSectionComponent],
  template: `
    <gh-section [spacing]="spacing()" [surface]="surface()" [fullHeight]="fullHeight()">
      <h2>Projected section heading</h2>
    </gh-section>
  `,
})
class SectionTestHost {
  readonly spacing = signal<GhSectionSpacing>('md');
  readonly surface = signal<GhSectionSurface>('transparent');
  readonly fullHeight = signal(false);
}

describe('GhSectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SectionTestHost] }).compileComponents();
  });

  it('renders a semantic section with projected content and defaults', () => {
    const fixture = TestBed.createComponent(SectionTestHost);
    fixture.detectChanges();

    const section = (fixture.nativeElement as HTMLElement).querySelector('section.gh-section');

    expect(section?.classList).toContain('gh-section--spacing-md');
    expect(section?.classList).toContain('gh-section--surface-transparent');
    expect(section?.textContent).toContain('Projected section heading');
  });

  it('applies surface, spacing and full-height options', () => {
    const fixture = TestBed.createComponent(SectionTestHost);
    fixture.componentInstance.spacing.set('lg');
    fixture.componentInstance.surface.set('accent');
    fixture.componentInstance.fullHeight.set(true);
    fixture.detectChanges();

    const section = (fixture.nativeElement as HTMLElement).querySelector('section.gh-section');

    expect(section?.classList).toContain('gh-section--spacing-lg');
    expect(section?.classList).toContain('gh-section--surface-accent');
    expect(section?.classList).toContain('gh-section--full-height');
  });
});
