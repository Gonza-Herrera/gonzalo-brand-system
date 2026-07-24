import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhSectionHeadingComponent } from './section-heading.component';
import type { GhSectionHeadingLevel } from './section-heading.types';

@Component({
  standalone: true,
  imports: [GhSectionHeadingComponent],
  template: `
    <gh-section-heading
      eyebrow="Selected work"
      title="Projects"
      description="A focused selection."
      alignment="center"
      [headingLevel]="level()"
    >
      <a ghSectionHeadingAction href="/projects">View projects</a>
    </gh-section-heading>
  `,
})
class SectionHeadingTestHost {
  readonly level = signal<GhSectionHeadingLevel>(3);
}

describe('GhSectionHeadingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SectionHeadingTestHost] }).compileComponents();
  });

  it('renders content, alignment and a projected action at the requested level', () => {
    const fixture = TestBed.createComponent(SectionHeadingTestHost);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h3')?.textContent).toContain('Projects');
    expect(element.textContent).toContain('Selected work');
    expect(element.textContent).toContain('A focused selection.');
    expect(element.querySelector('gh-section-heading')?.classList).toContain(
      'gh-section-heading--center',
    );
    expect(element.querySelector('a[href="/projects"]')).not.toBeNull();

    fixture.componentInstance.level.set(4);
    fixture.detectChanges();
    expect(element.querySelector('h4')?.textContent).toContain('Projects');
    expect(element.querySelector('h3')).toBeNull();
  });
});
