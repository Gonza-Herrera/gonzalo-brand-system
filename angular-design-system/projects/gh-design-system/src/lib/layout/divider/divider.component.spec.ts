import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhDividerComponent } from './divider.component';
import type { GhDividerOrientation, GhDividerStyle, GhDividerTone } from './divider.types';

@Component({
  standalone: true,
  imports: [GhDividerComponent],
  template: `
    <gh-divider
      [orientation]="orientation()"
      [style]="style()"
      [tone]="tone()"
      [decorative]="decorative()"
    />
  `,
})
class DividerTestHost {
  readonly orientation = signal<GhDividerOrientation>('horizontal');
  readonly style = signal<GhDividerStyle>('solid');
  readonly tone = signal<GhDividerTone>('subtle');
  readonly decorative = signal(true);
}

describe('GhDividerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DividerTestHost] }).compileComponents();
  });

  it('renders a hidden decorative horizontal divider by default', () => {
    const fixture = TestBed.createComponent(DividerTestHost);
    fixture.detectChanges();

    const divider = (fixture.nativeElement as HTMLElement).querySelector('.gh-divider');

    expect(divider?.tagName).toBe('DIV');
    expect(divider?.getAttribute('aria-hidden')).toBe('true');
    expect(divider?.classList).toContain('gh-divider--horizontal');
    expect(divider?.classList).toContain('gh-divider--solid');
    expect(divider?.classList).toContain('gh-divider--subtle');
  });

  it('uses a native horizontal rule for semantic horizontal separation', () => {
    const fixture = TestBed.createComponent(DividerTestHost);
    fixture.componentInstance.decorative.set(false);
    fixture.detectChanges();

    const divider = (fixture.nativeElement as HTMLElement).querySelector('.gh-divider');

    expect(divider?.tagName).toBe('HR');
    expect(divider?.hasAttribute('aria-hidden')).toBe(false);
  });

  it('uses separator semantics and orientation for a semantic vertical divider', () => {
    const fixture = TestBed.createComponent(DividerTestHost);
    fixture.componentInstance.orientation.set('vertical');
    fixture.componentInstance.style.set('dashed');
    fixture.componentInstance.tone.set('strong');
    fixture.componentInstance.decorative.set(false);
    fixture.detectChanges();

    const divider = (fixture.nativeElement as HTMLElement).querySelector('.gh-divider');

    expect(divider?.tagName).toBe('DIV');
    expect(divider?.getAttribute('role')).toBe('separator');
    expect(divider?.getAttribute('aria-orientation')).toBe('vertical');
    expect(divider?.classList).toContain('gh-divider--dashed');
    expect(divider?.classList).toContain('gh-divider--strong');
  });
});
